import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
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
  loader: any;

  constructor(public navCtrl: NavController, public tracker: AnalyticsProvider, public navParams: NavParams, public userService: UserProvider, public toastCtrl: ToastController, public loadingCtrl: LoadingController ) {
    this.ages = Array.from(Array(100).keys());
    this.ages.shift();
    this.user = {};
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

  register() {
    this.showLoader(null);
    this.userService.register(this.user, (type) => {
      this.hideLoader();
      switch (type) {
        case 'retryToast':
        case 'error':
          return this.retryToast();
        case 'emailTakenToast':
          return this.emailTakenToast();
        case 'success':
          return this.navCtrl.setRoot(PretestPage);
      }
    });
  }

  checkEmail() {
    if (this.user.email && this.input.valid) {
      this.userService.checkEmail(this.user.email, (type) => {
        if (type === 'not-available') {
          this.emailTakenToast();
        } else if (type === 'error') {
          this.retryToast();
        }
      })
    }
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
    this.userService.setCurrentData(this.user);
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
