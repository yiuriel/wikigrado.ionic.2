import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvProvider } from '../env/env';

@Injectable()
export class OrientationVideosProvider {

  videos: Array<{[key: string]: any}>
  BASEURL: string;
  authHeaders: any;

  constructor(public http: HttpClient, private env: EnvProvider) {
    this.BASEURL = this.env.getEnvironmentUrl('production') + "/data/orientation_videos";

    const authStr = 'Qzmea0rxbgO7ts3deYeUME wikigrado SSY0UFT2q9LInWF3lW44AfXYz7dIXN';
    const authStrKey = authStr.substr(Math.round(Math.random() * authStr.length / 2), Math.round(Math.random() * authStr.length / 2) + 10);
    this.authHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': authStr,
        'Authorization-Key': authStrKey
      })
    };

    this.getOrientationVideos((videos, error) => {
      if (!error) {
        this.videos = videos;
      }
    });
  }

  getOrientationVideos(callback) {
    if (this.videos) {
      callback(this.videos, null);
    } else {
      this.http.get(this.BASEURL, this.authHeaders).subscribe(videos => {
        callback(videos, null);
      }, error => {
        callback(null, error);
      });
    }
  }

  getVideosBasedOnOrientations(orientations, callback) {
    this.getOrientationVideos((videos, error) => {
      const filtered = videos.filter(video => {
        return orientations.indexOf(video.orientation) > -1;
      });
      callback(filtered);
    })
  }

}
