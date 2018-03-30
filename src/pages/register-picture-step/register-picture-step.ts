import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { PretestPage } from '../pretest/pretest';

@Component({
  selector: 'page-register-picture-step',
  templateUrl: 'register-picture-step.html',
})
export class RegisterPictureStepPage {

  fileName: string

  constructor(public navCtrl: NavController, public tracker: AnalyticsProvider, public navParams: NavParams, public userService: UserProvider ) {
    console.warn(userService.getData())
  }

  pictureUpload($event, picture) {
    if ($event.target.files[0]) {
      this.fileName = $event.target.files[0].name
    }
  }

  goToHomePage() {
    this.navCtrl.setRoot(PretestPage);
  }

  goToRegisterPage() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPictureStepPage');
    this.tracker.trackView('vista de registro (foto)');
  }

}
