import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { UniversidadesProvider } from '../../providers/universidades/universidades';
import { UniversidadPage } from '../universidad/universidad';
import { AnalyticsProvider } from '../../providers/analytics/analytics';

@Component({
  selector: 'page-universidades',
  templateUrl: 'universidades.html',
})
export class UniversidadesPage {

  universidades: Array<string>
  universidadesCached: Array<string>

  constructor(public navCtrl: NavController, public tracker: AnalyticsProvider, public navParams: NavParams, public modalCtrl: ModalController, public universidadesService: UniversidadesProvider, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UniversidadesPage');
    this.tracker.trackView('vista de universidades');

    let loading = this.loadingCtrl.create({
      spinner: 'crescent'
    });
    loading.present();

    this.getUniversidadesFromService(loading);
  }

  getUniversidadesFromService(loading) {
    this.universidadesService.getUniversidades().then((universidades) => {
      this.universidades = universidades;
      this.universidadesCached = [].concat(this.universidades);
      loading.dismiss();
    });
  }

  getUniversidades($event) {
    const value = $event.value;
    if (!value) {
      this.universidadesService.getUniversidades().then((universidades) => {
        this.universidades = universidades;
      });
    } else {
      this.universidades = this.universidadesCached.filter(univ => univ.toLowerCase().indexOf(value.toLowerCase()) > -1);
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
