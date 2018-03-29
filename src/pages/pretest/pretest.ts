import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { TestPage } from '../test/test'

@Component({
  selector: 'page-pretest',
  templateUrl: 'pretest.html',
})
export class PretestPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PretestPage');
  }

  goToTestPage() {
    this.navCtrl.setRoot(TestPage, {}, {animate: true})
  }

}
