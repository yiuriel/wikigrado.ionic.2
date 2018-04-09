import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TestPage } from '../test/test';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { UserProvider } from '../../providers/user/user';
import { TestStorageProvider } from '../../providers/test-storage/test-storage';

@Component({
  selector: 'page-pretest',
  templateUrl: 'pretest.html',
})
export class PretestPage {
  test_done: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public tracker: AnalyticsProvider, public userService: UserProvider, public testStorageService: TestStorageProvider) {
  }

  ionViewDidLoad() {
    this.testStorageService.getTestDone((data, error) => {
      if (!error) {
        this.test_done = data;
      }
    });
  }

  goToTestPage() {
    this.tracker.trackEvent('pre test page', this.tracker.CLICK_ACTION, 'ir al test', this.tracker.BUTTON_IN_VIEW);
    this.navCtrl.setRoot(TestPage, {}, {animate: true})
  }

}
