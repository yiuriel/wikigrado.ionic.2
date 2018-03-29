import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, ViewController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, public tracker: AnalyticsProvider) {
    this.slidesData = [
      // {
      //   title: "Guia 1",
      //   description: "Esta es la pagina 1 de guia, la podras volver a ver luego",
      // },
      // {
      //   title: "Guia 2",
      //   description: "Esta es la 2da pagina de la guia y tambien la podras volver a ver luego",
      // },
      {
        title: "Guia 3",
        description: "Esta es la ultima pagina de la guia, luego viene el registro",
      }
    ];
  }

  goToRegisterPage() {
    this.tracker.trackEvent(this.viewCtrl.name, this.tracker.CLICK_ACTION, 'ir a registro', this.tracker.BUTTON_IN_VIEW);
    this.navCtrl.push(RegisterPage)
  }

  goToLoginPage() {
    this.tracker.trackEvent(this.viewCtrl.name, this.tracker.CLICK_ACTION, 'ir a login', this.tracker.BUTTON_IN_VIEW);
    this.navCtrl.push(LoginPage)
  }

  goToSlide(index) {
    this.slides.slideTo(index, 250);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InitialSliderPage');
    this.tracker.trackView(this.viewCtrl.name)
  }

}
