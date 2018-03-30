import { Component, ElementRef } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { GradoPage } from '../grado/grado';
import { GradosVideosProvider } from '../../providers/grados-videos/grados-videos';
import { AnalyticsProvider } from '../../providers/analytics/analytics';

@Component({
  selector: 'page-grados',
  templateUrl: 'grados.html',
})
export class GradosPage {

  videos: Array<{videoUrl: string, hasVideo: boolean, career: string}>
  videosCached: Array<{videoUrl: string, hasVideo: boolean, career: string}>
  dimensions: {width: number, height: number}

  constructor(public navCtrl: NavController, public tracker: AnalyticsProvider, public navParams: NavParams, public modalCtrl: ModalController, public gradosVideosService :GradosVideosProvider, private domElem: ElementRef, public loadingCtrl: LoadingController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad GradosPage');
    this.tracker.trackView('vista de grados');
  }

  ionViewDidEnter() {
    let width = this.domElem.nativeElement.offsetWidth - 32;
    this.dimensions = {
      width: width,
      height: (width * 9) / 16,
    }

    let loading = this.loadingCtrl.create({
      spinner: 'crescent'
    });
    loading.present();

    this.getAllVideos(loading);
  }

  getAllVideos(loading) {
    this.gradosVideosService.getVideos().then(videos => {
      this.videos = videos;
      this.videosCached = [].concat(this.videos);
      loading.dismiss();
    });
  }

  filterGrades($event) {
    const value = $event.value;
    this.videos = this.videosCached.filter(video => video.career.toLowerCase().indexOf(value.toLowerCase()) > -1)
  }

  goToGrade(video) {
    if (video) {
      let modal = this.modalCtrl.create(GradoPage, {videoData: video, dimensionData: this.dimensions});
      modal.onDidDismiss(() => {
        modal = null;
      })
      modal.present();
    }
  }

}
