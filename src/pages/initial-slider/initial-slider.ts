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
        description: "La App <b style='font-size: 1.1em;'>Wikigrado</b> está pensada para que, a través de <b>vídeos</b>, conozcas  qué vas a estudiar en cada <b>grado universitario.</b><br/><br/><b>Y algo muy importante!</b> Profesionales en activo te explicarán de qué vas a poder trabajar y cómo son esos trabajos",
        icons: `<div class="layer first-slide"><i class="fa-6x fas fa-university"></i></div>`
      },
      {
        title: "Guia 2",
        description: "Registrándote, tendrás tu <b>favoritos, avatar, participación en sorteos y mas...</b><br/><br/>Podrás hacer una búsqueda muy precisa tanto de las universidades, como de los grados que se imparten en cada una.<br/><br/> <b>Bienvenido a Wikigrado.</b><br/><br/>¿Comenzamos? Hay un test de orientación esperándote...",
        icons: `<div class="layer second-slide"><i class="fa-6x fas fa-globe"></i><i class="fa-6x fas fa-users"></i></div>`
      }
    ];

    this.collaborators = [
      {
        src: 'assets/imgs/collaborators/universidad-navarra.png',
        alt: 'Navarra'
      },
      {
        src: 'assets/imgs/collaborators/utad_invert.png',
        alt: 'Utad'
      },
      {
        src: 'assets/imgs/collaborators/esic.png',
        alt: 'Esic'
      },
      {
        src: 'assets/imgs/collaborators/sandamaso_invert.png',
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
        src: 'assets/imgs/collaborators/ie_invert.png',
        alt: 'IE'
      },
      {
        src: 'assets/imgs/collaborators/deusto_invert.png',
        alt: 'Deusto'
      },
      {
        src: 'assets/imgs/collaborators/schiller.png',
        alt: 'Schiller'
      },
      {
        src: 'assets/imgs/collaborators/mapfre_invert.png',
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
        src: 'assets/imgs/collaborators/bodega_invert.png',
        alt: 'Bodegas Marqués de Vargas'
      },
      {
        src: 'assets/imgs/collaborators/llorente.jpg',
        alt: 'Llorente y Cuenca'
      },
      {
        src: 'assets/imgs/collaborators/playstation_invert.png',
        alt: 'Playstation'
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
