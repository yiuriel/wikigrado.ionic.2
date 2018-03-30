import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AnalyticsProvider } from '../../providers/analytics/analytics';

@Component({
  selector: 'page-universidad',
  templateUrl: 'universidad.html',
})
export class UniversidadPage {

  constructor(public navCtrl: NavController, public tracker: AnalyticsProvider, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UniversidadPage');
    this.tracker.trackView('vista de universidad');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
