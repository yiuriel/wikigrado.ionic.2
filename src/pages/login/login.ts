import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PretestPage } from '../pretest/pretest';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: {email:string, password: string}

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = {email: "", password: ""}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  goToHomePage() {
    this.navCtrl.setRoot(PretestPage);
  }

  goBack() {
    this.navCtrl.pop();
  }

}
