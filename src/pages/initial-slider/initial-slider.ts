import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';

import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-initial-slider',
  templateUrl: 'initial-slider.html',
})
export class InitialSliderPage {

  @ViewChild(Slides) slides: Slides;
  slidesData: Array<any>

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.slidesData = [
      {
        title: "Guia 1",
        description: "Esta es la pagina 1 de guia, la podras volver a ver luego",
      },
      {
        title: "Guia 2",
        description: "Esta es la 2da pagina de la guia y tambien la podras volver a ver luego",
      },
      {
        title: "Guia 3",
        description: "Esta es la ultima pagina de la guia, luego viene el registro",
      }
    ];
  }

  goToRegisterPage() {
    this.navCtrl.push(RegisterPage)
  }

  goToSlide(index) {
    this.slides.slideTo(index, 250);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InitialSliderPage');
  }

}
