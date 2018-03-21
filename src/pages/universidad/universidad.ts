import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-universidad',
  templateUrl: 'universidad.html',
})
export class UniversidadPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UniversidadPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
