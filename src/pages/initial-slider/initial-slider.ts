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
        description: "La App de Wikigrado está pensada para que a través de los vídeos, puedas conocer toda la oferta de grados y universidades de España.",
      },
      {
        title: "Guia 2",
        description: "Con videos superdinamicos, podrás conocer en que consiste cada grado y además, verás ejemplos reales con sus salidas laborales.",
      },
      {
        title: "Guia 3",
        description: "Registrándote, tendrás tu historial, favoritos, avatar y mas...",
      },
      {
        title: "Guia 4",
        description: "Podrás hacer una búsqueda muy precisa tanto de las universidades, como de los grados que se imparten en cada una. Bienvenido a Wikigrado.<br/><br/> Comenzamos? Hay un test de orientación, esperándote...",
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
