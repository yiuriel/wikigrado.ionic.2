import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { AllAppDataProvider } from '../../providers/all-app-data/all-app-data';
import { UniversidadPage } from '../universidad/universidad';
import { AnalyticsProvider } from '../../providers/analytics/analytics';

@Component({
  selector: 'page-universidades',
  templateUrl: 'universidades.html',
})
export class UniversidadesPage {

  universidades: Array<string>
  universidadesCached: Array<string>

  constructor(public navCtrl: NavController, public tracker: AnalyticsProvider, public navParams: NavParams, public modalCtrl: ModalController, public allAppDataService: AllAppDataProvider, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UniversidadesPage');
    // this.tracker.trackView('vista de universidades');

    this.getUniversidadesFromService();
  }

  getUniversidadesFromService() {
    this.universidades = this.allAppDataService.getDataBasedOnType('universidad');
    this.universidadesCached = [].concat(this.universidades);
  }

  getUniversidades($event) {
    const value = $event.value;
    if (!value) {
      this.universidades = this.allAppDataService.getDataBasedOnType('universidad');
    } else {
      this.universidades = this.allAppDataService.getDataBasedOnTypeAndValue('universidad', value);
    }
  }

  goToUniversidad(universidad) {
    if (universidad) {
      let modal = this.modalCtrl.create(UniversidadPage, {universidadData: universidad});
      modal.onDidDismiss(() => {
        modal = null;
      })
      modal.present();
    }
  }

}
