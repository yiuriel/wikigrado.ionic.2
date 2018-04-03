import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { PretestPage } from '../pretest/pretest';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: {email:string, password: string}
  toast: any;
  loader: any;

  constructor(public navCtrl: NavController, public userService: UserProvider, public navParams: NavParams, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.user = {email: "", password: ""}
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
    setTimeout(() => {
      this.loader.dismiss();
    }, 50);
  }

  login() {
    this.showLoader(null);
    this.userService.login(this.user, (type) => {
      this.hideLoader();
      switch(type) {
        case 'success':
          return this.navCtrl.setRoot(PretestPage);
        case 'wrongLoginToast':
          return this.wrongLoginToast();
        case 'error':
          return this.retryToast();
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
