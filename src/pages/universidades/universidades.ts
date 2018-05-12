import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { AllAppDataProvider } from '../../providers/all-app-data/all-app-data';
import { GradoPage } from '../grado/grado';
import { AnalyticsProvider } from '../../providers/analytics/analytics';

@Component({
  selector: 'page-universidades',
  templateUrl: 'universidades.html',
})
export class UniversidadesPage {

  universidades: Array<{[key: string]: any}>
  universidadesCached: Array<{[key: string]: any}>

  constructor(public navCtrl: NavController, public tracker: AnalyticsProvider, public navParams: NavParams, public modalCtrl: ModalController, public allAppDataService: AllAppDataProvider, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UniversidadesPage');

    this.getUniversidadesFromService();
  }

  getUniversidadesFromService() {
    this.universidades = this.allAppDataService.get('universities');
    this.universidadesCached = [].concat(this.universidades);
  }

  getUniversidades($event) {
    const value = $event.value;
    if (value) {
      this.universidades = this.universidadesCached.filter(cache => {
        return cache.university.indexOf(value) > -1
      });
    } else {
      this.universidades = [].concat(this.universidadesCached);
    }
  }

  goToUniversidad(universidad) {
    if (universidad) {
      let univWithGrades = this.allAppDataService.getUniversityWithGrades(universidad);
      let modal = this.modalCtrl.create(GradoPage, {data: {...univWithGrades, type: 'universidad', index: univWithGrades.id}});
      modal.onDidDismiss(() => {
        modal = null;
      })
      modal.present();
    }
  }

}
