import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
// import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { TestPage } from '../test/test';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-pretest',
  templateUrl: 'pretest.html',
})
export class PretestPage {
  image: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, public tracker: AnalyticsProvider, public userService: UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PretestPage');
    // this.tracker.trackView('vista previa al test');
    this.userService.getUserDataAsync().then(data => {
      this.image = data.image;
    });
  }

  goToTestPage() {
    this.tracker.trackEvent('pre test page', this.tracker.CLICK_ACTION, 'ir al test', this.tracker.BUTTON_IN_VIEW);
    this.navCtrl.setRoot(TestPage, {}, {animate: true})
  }

}
