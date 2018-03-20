import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GradoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-grado',
  templateUrl: 'grado.html',
})
export class GradoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.warn(this);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GradoPage');
  }

}
