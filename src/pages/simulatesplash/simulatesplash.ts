import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InitialSliderPage } from '../initial-slider/initial-slider';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-simulatesplash',
  templateUrl: 'simulatesplash.html',
})
export class SimulatesplashPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SimulatesplashPage');
    const redirectTimeout = setTimeout(() => {
      const user_data = this.userService.getData();
      if (user_data) {
        clearTimeout(redirectTimeout);
      } else {
        this.navCtrl.setRoot(InitialSliderPage);
      }
    }, 3000);
  }

}
