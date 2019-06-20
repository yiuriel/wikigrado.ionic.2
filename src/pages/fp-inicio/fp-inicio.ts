import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {FpGradoMedioPage} from "../fp-grado-medio/fp-grado-medio";
import {FpGradoSuperiorPage} from "../fp-grado-superior/fp-grado-superior";

/**
 * Generated class for the FpInicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-fp-inicio',
  templateUrl: 'fp-inicio.html',
})
export class FpInicioPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FpInicioPage');
  }
  goToGradoMedioPage(){
    this.navCtrl.setRoot(FpGradoMedioPage, {}, {animate: true})
  }
  goToGradoSuperiorPage(){
    this.navCtrl.setRoot(FpGradoSuperiorPage, {}, {animate: true})
  }

}
