import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PretestPage } from '../pretest/pretest';
import { UserProvider } from '../../providers/user/user';
import { TestStorageProvider } from '../../providers/test-storage/test-storage';
import { LoaderProvider } from '../../providers/loader/loader';
import { ToasterProvider } from '../../providers/toaster/toaster';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: {email:string, password: string}
  showVolver: any;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(public navCtrl: NavController, public userService: UserProvider, public navParams: NavParams, public toasterService: ToasterProvider, public loaderService: LoaderProvider, public testStorageService: TestStorageProvider) {
    this.user = {email: "", password: ""}
    this.showVolver = this.navParams.data.hasOwnProperty("showVolver") || false;
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.loaderService.showLoader({content:'conectando...'});
    this.userService.login(this.user, (data, error) => {
      this.loaderService.hideLoader();
      if (error) {
        switch(error.error) {
          case 'wrongLoginToast':
            return this.toasterService.showToast({message: 'Hubo un error, vuelve a intentarlo más tarde.'});
          case 'error':
            return this.toasterService.showToast({message: 'Puede que los datos sean incorrectos, asegurate de haberlos escrito bien.'});
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

  goBack() {
    this.navCtrl.pop();
  }

}
