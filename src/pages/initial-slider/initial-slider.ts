import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { AnalyticsProvider } from '../../providers/analytics/analytics';

import { RegisterPage } from '../register/register';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-initial-slider',
  templateUrl: 'initial-slider.html',
})
export class InitialSliderPage {

  @ViewChild(Slides) slides: Slides;
  slidesData: Array<any>

  constructor(public navCtrl: NavController, public navParams: NavParams, public tracker: AnalyticsProvider) {
    this.slidesData = [
      {
        title: "Guia 1",
        description: "La App Wikigrado está pensada para que, a través de vídeos, conozcas  qué vas a estudiar en cada grado universitario.<br/><br/>Y algo muy importante! Profesionales en activo te explicarán de qué vas a poder trabajar y cómo son esos trabajos",
        icons: `<div class="layer first-slide"><i class="fa-6x fas fa-university"></i></div>`
      },
      {
        title: "Guia 2",
        description: "Registrándote, tendrás tu historial, favoritos, avatar...y mas.<br/><br/>Podrás hacer una búsqueda muy precisa tanto de las universidades, como de los grados que se imparten en cada una. Bienvenido a Wikigrado.<br/><br/>Comenzamos? Hay un test de orientación, esperándote...",
        icons: `<div class="layer second-slide"><i class="fa-6x fas fa-globe"></i><i class="fa-4x fas fa-user"></i></div>`
      }
    ];
  }

  goToRegisterPage() {
    this.navCtrl.push(RegisterPage)
  }

  goToLoginPage() {
    this.navCtrl.push(LoginPage)
  }

  goToSlide(index) {
    this.slides.slideTo(index, 250);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InitialSliderPage');
  }

}
