import { Component, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-grados',
  templateUrl: 'grados.html',
})
export class GradosPage {

  videos: Array<{url: string, career: string}>
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
        url: 'https://player.vimeo.com/video/250951635?autoplay=1',
        career: "Grado en ingenieria de software",
      },
      {
        url: 'https://player.vimeo.com/video/252883728?autoplay=1',
        career: "Grado en filosofia",
      },
      {
        url: 'https://player.vimeo.com/video/251032750?autoplay=1',
        career: "Grado en diseño de videojuegos y Productos Interactivos",
      },
      {
        url: 'https://player.vimeo.com/video/250951635?autoplay=1',
        career: "Grado en ingenieria de software",
      },
      {
        url: 'https://player.vimeo.com/video/252883728?autoplay=1',
        career: "Grado en filosofia",
      },
      {
        url: 'https://player.vimeo.com/video/251032750?autoplay=1',
        career: "Grado en diseño de videojuegos y Productos Interactivos",
      }
    ];
  }

}
