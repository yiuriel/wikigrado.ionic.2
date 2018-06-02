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
  collaborators: Array<any>

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

    this.collaborators = [
      {
        src: 'assets/imgs/collaborators/mapfre.png',
        alt: 'Mapfre'
      },
      {
        src: 'assets/imgs/collaborators/elcorteingles.png',
        alt: 'Viajes el corte ingles'
      },
      {
        src: 'assets/imgs/collaborators/hm.png',
        alt: 'HM Hospitales'
      },
      {
        src: 'assets/imgs/collaborators/bodega.png',
        alt: 'Bodegas Marqués de Vargas'
      },
      {
        src: 'assets/imgs/collaborators/llorente.jpg',
        alt: 'Llorente y Cuenca'
      },
      {
        src: 'assets/imgs/collaborators/playstation.svg',
        alt: 'Playstation'
      },
      {
        src: 'assets/imgs/collaborators/utad.png',
        alt: 'Utad'
      },
      {
        src: 'assets/imgs/collaborators/esic.png',
        alt: 'Esic'
      },
      {
        src: 'assets/imgs/collaborators/sandamaso.png',
        alt: 'San Dámaso'
      },
      {
        src: 'assets/imgs/collaborators/udima.png',
        alt: 'Udima'
      },
      {
        src: 'assets/imgs/collaborators/lasalle.jpg',
        alt: 'Lasalle'
      },
      {
        src: 'assets/imgs/collaborators/ie.svg',
        alt: 'IE'
      },
      {
        src: 'assets/imgs/collaborators/deusto.png',
        alt: 'Deusto'
      },
      {
        src: 'assets/imgs/collaborators/schiller.png',
        alt: 'Schiller'
      },
      {
        src: 'assets/imgs/collaborators/universidad-navarra.png',
        alt: 'Navarra'
      }
    ]
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

}
