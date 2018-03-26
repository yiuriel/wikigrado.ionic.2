import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { TestPage } from '../test/test'

@Component({
  selector: 'page-pretest',
  templateUrl: 'pretest.html',
})
export class PretestPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PretestPage');
    // setTimeout(() => {
    //   this.geolocation.getCurrentPosition().then((resp) => {
    //     console.log(JSON.stringify(resp));
    //     alert(resp.coords.latitude)
    //     alert(resp.coords.longitude)
    //   }, (err) => {
    //     console.log('Error getting location ssss', JSON.stringify(err));
    //   }).catch((error) => {
    //     console.log('Error getting location', JSON.stringify(error));
    //   });
    // }, 2500);
  }

  goToTestPage() {
    this.navCtrl.setRoot(TestPage, {}, {animate: true})
  }

}
