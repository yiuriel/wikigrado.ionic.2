import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { PretestPage } from '../pretest/pretest';
import { RegisterPictureStepPage } from '../register-picture-step/register-picture-step';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  @ViewChild('registeremail') input: {[key: string]: any};
  ages: Array<number>
  toast: any;
  user: {[key: string]: any};

  constructor(public navCtrl: NavController, public tracker: AnalyticsProvider, public navParams: NavParams, public userService: UserProvider, public toastCtrl: ToastController ) {
    this.ages = Array.from(Array(100).keys());
    this.user = {};
  }

  goToHomePage() {
    this.userService.register(this.user).subscribe(data => {
      // success
      if (data.hasOwnProperty("insertId")) {
        this.userService.setUserData({...this.user, id: data.insertId});
        this.navCtrl.setRoot(PretestPage);
      } else {
        if (data.hasOwnProperty("available") && !data.available) {
          this.emailTakenToast();
        } else {
          this.retryToast();
        }
      }
    });
  }

  checkEmail() {
    if (this.user.email && this.input.valid) {
      this.userService.checkEmail(this.user.email).subscribe(data => {
        if (data.hasOwnProperty("available") && !data.available) {
          this.emailTakenToast();
        }
      });
    }
  }

  retryToast() {
    this.toast = this.toastCtrl.create({
      message: 'Hubo un error, vuelve a intentarlo porfavor',
      duration: 5000,
      position: 'bottom',
      showCloseButton: true
    });
    this.toast.present();
    this.toast.onDidDismiss(() => {
      this.toast = null;
    });
  }

  emailTakenToast() {
    this.toast = this.toastCtrl.create({
      message: 'Ya existe un usuario con este email',
      duration: 5000,
      position: 'bottom',
      showCloseButton: true
    });
    this.toast.present();
    this.toast.onDidDismiss(() => {
      this.toast = null;
    });
  }

  goToPicturePage() {
    this.userService.setUserData(this.user);
    this.navCtrl.push(RegisterPictureStepPage);
  }

  goBack() {
    this.navCtrl.pop();
  }

  onAgeChange(age) {
    // console.warn(age);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    // this.tracker.trackView('vista de registro')
  }

}
