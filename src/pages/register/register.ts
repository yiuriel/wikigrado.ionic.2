import { Component } from '@angular/core';
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

  ages: Array<number>
  toast: any;
  user: { }

  constructor(public navCtrl: NavController, public tracker: AnalyticsProvider, public navParams: NavParams, public userService: UserProvider, public toastCtrl: ToastController ) {
    this.ages = Array.from(Array(100).keys());
    this.user = {};
  }

  goToHomePage() {
    this.userService.register(this.user).subscribe(data => {
      // success
      if (data.hasOwnProperty("insertId")) {
        this.userService.setUserData({...this.user, user_id: data.insertId});
        this.navCtrl.setRoot(PretestPage);
      } else {
        if (data.hasOwnProperty("available") && !data.available) {
          this.emailTakenToast();
        }
      }
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
    this.userService.setData(this.user);
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
