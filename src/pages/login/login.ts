import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { PretestPage } from '../pretest/pretest';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: {email:string, password: string}
  toast: any;

  constructor(public navCtrl: NavController, public userService: UserProvider, public navParams: NavParams, public toastCtrl: ToastController) {
    this.user = {email: "", password: ""}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.userService.login(this.user).subscribe(data => {
      if (data.length) {
        this.userService.setUserDataAsync(data[0]).then(success => {
          this.userService.verifySession();
          this.navCtrl.setRoot(PretestPage);
        }, error => {
          // console.error(error);
        })
      }
    }, errorData => {
      if (errorData.error && errorData.error.hasOwnProperty("user_not_found") && errorData.error.user_not_found) {
        this.wrongLoginToast();
      }
    })
  }

  wrongLoginToast() {
    this.toast = this.toastCtrl.create({
      message: 'Los datos son incorrectos, asegurate de haber escrito bien tu email y/o password',
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
