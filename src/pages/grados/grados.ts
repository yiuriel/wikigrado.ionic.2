import { Component, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GradoPage } from '../grado/grado';

@Component({
  selector: 'page-grados',
  templateUrl: 'grados.html',
})
export class GradosPage {

  videos: Array<{videoUrl: string, hasVideo: boolean, career: string}>
  dimensions: {width: number, height: number}

  constructor(public navCtrl: NavController, public navParams: NavParams, private domElem: ElementRef) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GradosPage');
  }

  ionViewDidEnter() {
    let width = this.domElem.nativeElement.offsetWidth - 32;
    this.dimensions = {
      width: width,
      height: (width * 9) / 16,
    }

    this.videos = [
      {
        videoUrl: 'https://player.vimeo.com/video/250951635?autoplay=1',
        hasVideo: true,
        career: "Grado en ingenieria de software",
      },
      {
        videoUrl: 'https://player.vimeo.com/video/252883728?autoplay=1',
        hasVideo: true,
        career: "Grado en filosofia",
      },
      {
        videoUrl: 'https://player.vimeo.com/video/251032750?autoplay=1',
        hasVideo: true,
        career: "Grado en diseño de videojuegos y Productos Interactivos",
      },
      {
        videoUrl: 'https://player.vimeo.com/video/250951635?autoplay=1',
        hasVideo: true,
        career: "Grado en ingenieria de software",
      },
      {
        videoUrl: 'https://player.vimeo.com/video/252883728?autoplay=1',
        hasVideo: true,
        career: "Grado en filosofia",
      },
      {
        videoUrl: 'https://player.vimeo.com/video/251032750?autoplay=1',
        hasVideo: true,
        career: "Grado en diseño de videojuegos y Productos Interactivos",
      },
      {
        videoUrl: null,
        hasVideo: false,
        career: "Grado en diseño de videojuegos y Productos Interactivos",
      },
      {
        videoUrl: null,
        hasVideo: false,
        career: "Grado en diseño de videojuegos y Productos Interactivos",
      },
      {
        videoUrl: null,
        hasVideo: false,
        career: "Grado en diseño de videojuegos y Productos Interactivos",
      }
    ];
  }

  goToGrade(video) {
    if (video.hasVideo) {
      this.navCtrl.push(GradoPage, {videoData: video, dimensionData: this.dimensions});
    }
  }

}
