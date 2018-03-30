import { Component, ElementRef } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { GradoPage } from '../grado/grado';
import { ColegiosMayoresProvider } from '../../providers/colegios-mayores/colegios-mayores';
import { AnalyticsProvider } from '../../providers/analytics/analytics';

@Component({
  selector: 'page-colegios-mayores',
  templateUrl: 'colegios-mayores.html',
})
export class ColegiosMayoresPage {

  videos: Array<{videoUrl: string, description: string, location: {any}, career: string}>
  videosCached: Array<{videoUrl: string, description: string, location: {any}, career: string}>
  dimensions: {width: number, height: number}

  constructor(public navCtrl: NavController, public tracker: AnalyticsProvider, public navParams: NavParams, private domElem: ElementRef, public modalCtrl: ModalController, public colegiosMayoresService: ColegiosMayoresProvider, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ColegiosMayoresPage');
    this.tracker.trackView('vista de colegios mayores');
    let width = this.domElem.nativeElement.offsetWidth - 32;
    this.dimensions = {
      width: width,
      height: (width * 9) / 16,
    }

    let loading = this.loadingCtrl.create({
      spinner: 'crescent'
    });
    loading.present();

    this.getColegiosMayoresFromService(loading);
  }

  getColegiosMayoresFromService(loading) {
    this.colegiosMayoresService.getVideos().then((videos) => {
      this.videos = videos;
      this.videosCached = [].concat(this.videos);
      loading.dismiss();
    });
  }

  getColegiosMayores($event) {
    const value = $event.value;
    this.videos = this.videosCached.filter(video => video.career.toLowerCase().indexOf(value.toLowerCase()) > -1)
  }

  goToColegioMayor(universidad) {
    if (universidad) {
      let modal = this.modalCtrl.create(GradoPage, {videoData: universidad, dimensionData: this.dimensions, isColegioMayor: true});
      modal.onDidDismiss(() => {
        modal = null;
      })
      modal.present();
    }
  }

}
