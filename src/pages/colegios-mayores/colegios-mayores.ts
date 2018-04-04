import { Component, ElementRef } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { GradoPage } from '../grado/grado';
import { AllAppDataProvider } from '../../providers/all-app-data/all-app-data';
import { AnalyticsProvider } from '../../providers/analytics/analytics';

@Component({
  selector: 'page-colegios-mayores',
  templateUrl: 'colegios-mayores.html',
})
export class ColegiosMayoresPage {

  videos: Array<{videoUrl: string, description: string, location: {any}, career: string}>
  videosCached: Array<{videoUrl: string, description: string, location: {any}, career: string}>
  dimensions: {width: number, height: number}

  constructor(public navCtrl: NavController, public tracker: AnalyticsProvider, public navParams: NavParams, private domElem: ElementRef, public modalCtrl: ModalController, public allAppDataService: AllAppDataProvider, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ColegiosMayoresPage');
    this.tracker.trackView('vista de colegios mayores');
    let width = this.domElem.nativeElement.offsetWidth - 32;
    this.dimensions = {
      width: width,
      height: (width * 9) / 16,
    }

    this.getColegiosMayoresFromService();
  }

  getColegiosMayoresFromService() {
    this.videos = this.allAppDataService.getDataBasedOnType('colegio_mayor');
    this.videosCached = [].concat(this.videos);
  }

  getColegiosMayores($event) {
    const value = $event.value;
    this.videos = this.allAppDataService.getDataBasedOnTypeAndValue('colegio_mayor', value);
  }

  goToColegioMayor(colegioMayor) {
    if (colegioMayor) {
      let modal = this.modalCtrl.create(GradoPage, {videoData: colegioMayor, dimensionData: this.dimensions, isColegioMayor: true});
      modal.onDidDismiss(() => {
        modal = null;
      })
      modal.present();
    }
  }

}
