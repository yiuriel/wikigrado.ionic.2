import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// pages
import { TestPage } from '../test/test';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  ages: Array<number>
  user: { }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.ages = Array.from(Array(100).keys());
    this.user = {};
  }

  goToHomePage() {
    this.navCtrl.setRoot(TestPage);
  }

  onAgeChange(age) {
    console.warn(age);
    console.warn(this);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
