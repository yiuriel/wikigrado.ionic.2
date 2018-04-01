import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InitialSliderPage } from '../initial-slider/initial-slider';

@Component({
  selector: 'page-simulatesplash',
  templateUrl: 'simulatesplash.html',
})
export class SimulatesplashPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SimulatesplashPage');
    setTimeout(() => {
      this.navCtrl.setRoot(InitialSliderPage);
    }, 2500);
  }

}
