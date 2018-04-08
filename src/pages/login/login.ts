import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { PretestPage } from '../pretest/pretest';
import { UserProvider } from '../../providers/user/user';
import { TestStorageProvider } from '../../providers/test-storage/test-storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: {email:string, password: string}
  toast: any;
  loader: any;
  showVolver: any;

  constructor(public navCtrl: NavController, public userService: UserProvider, public navParams: NavParams, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public testStorageService: TestStorageProvider) {
    this.user = {email: "", password: ""}

    this.showVolver = this.navParams.data.hasOwnProperty("showVolver") || false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  showLoader(text) {
    this.loader = this.loadingCtrl.create({
      content: text,
      spinner: 'crescent',
    });

    this.loader.present();
  }

  hideLoader() {
    this.loader.dismiss();
  }

  login() {
    this.showLoader('conectando . . .');
    this.userService.login(this.user, (data, error) => {
      this.hideLoader();
      if (error) {
        switch(error.error) {
          case 'wrongLoginToast':
            return this.wrongLoginToast();
          case 'error':
            return this.retryToast();
        }
      } else {
        if (data.first_orientation) {
          this.testStorageService.setTestDone(true, (value, failed) => {
            if (!failed) {
              this.navCtrl.setRoot(PretestPage);
            }
          })
        } else {
          this.navCtrl.setRoot(PretestPage);
        }
      }
    });
  }

  retryToast() {
    this.toast = this.toastCtrl.create({
      message: 'Hubo un error, vuelve a intentarlo más tarde.',
      duration: 5000,
      position: 'bottom',
      showCloseButton: true
    });
    this.toast.present();
    this.toast.onDidDismiss(() => {
      this.toast = null;
    });
  }

  wrongLoginToast() {
    this.toast = this.toastCtrl.create({
      message: 'Puede que los datos sean incorrectos, asegurate de haberlos escrito bien.',
      duration: 5000,
      position: 'bottom',
      showCloseButton: true
    });
    this.toast.present();
    this.toast.onDidDismiss(() => {
      this.toast = null;
    });
  }

  goBack() {
    this.navCtrl.pop();
  }

}
