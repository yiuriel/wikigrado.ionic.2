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
        url: 'https://player.vimeo.com/video/250976505'
      },
      {
        orientation: 'tecnologia',
        url: 'https://player.vimeo.com/video/250969615'
      },
      {
        orientation: 'humanidades',
        url: 'https://player.vimeo.com/video/250955010'
      }
    ];
  }

  getVideosBasedOnOrientations(orientations) {
    return this.videos.filter(video => {
      return orientations.indexOf(video.orientation) > -1;
    });
  }

}
