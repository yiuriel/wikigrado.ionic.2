import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { TestPage } from '../test/test';
import { AnalyticsProvider } from '../../providers/analytics/analytics';

@Component({
  selector: 'page-pretest',
  templateUrl: 'pretest.html',
})
export class PretestPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder, public tracker: AnalyticsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PretestPage');
    // this.tracker.trackView('vista previa al test');
  }

  goToTestPage() {
    this.tracker.trackEvent('pre test page', this.tracker.CLICK_ACTION, 'ir al test', this.tracker.BUTTON_IN_VIEW);
    this.navCtrl.setRoot(TestPage, {}, {animate: true})
  }

}
