import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the OrientationVideosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrientationVideosProvider {

  videos: Array<{[key: string]: any}>

  constructor(public http: HttpClient) {
    console.log('Hello OrientationVideosProvider Provider');
    this.videos = [
      {
        orientation: 'arte',
        career: 'Grados Artísticos',
        url: 'https://player.vimeo.com/video/250976505'
      },
      {
        orientation: 'tecnologia',
        career: 'Grados en Ingenierías',
        url: 'https://player.vimeo.com/video/250969615'
      },
      {
        orientation: 'humanidades',
        career: 'Grados en Humanidades',
        url: 'https://player.vimeo.com/video/250955010'
      },
      {
        orientation: 'sociales',
        career: 'Grados en Ciencias Sociales',
        url: 'https://player.vimeo.com/video/247694448'
      },
      {
        orientation: 'salud',
        career: 'Grados en Ciencias de la Salud',
        url: 'https://player.vimeo.com/video/247675245'
      }
    ];
  }

  getVideosBasedOnOrientations(orientations) {
    return this.videos.filter(video => {
      return orientations.indexOf(video.orientation) > -1;
    });
  }

}
