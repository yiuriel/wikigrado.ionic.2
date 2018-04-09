import { Component, Input, ViewChild } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
// import { ScreenOrientation } from '@ionic-native/screen-orientation';
// import Player from '@vimeo/player';

@Component({
  selector: 'image-switch-iframe',
  templateUrl: 'image-switch-iframe.html'
})

export class ImageSwitchIframeComponent {
  @Input('width') width: number;
  @Input('height') height: number;
  @Input('url') url: string;
  @Input('career') career: string;

  @ViewChild('videoFrame') videoFrame: any;

  active: boolean;
  actualUrl: SafeUrl;
  // private screenOrientation: ScreenOrientation
  constructor(public loadingCtrl: LoadingController, public tracker: AnalyticsProvider, private sanitizer: DomSanitizer) {
    this.active = false;
  }

  switchActive() {
    this.actualUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url)
    this.active = true;
    this.tracker.trackEvent('video', 'ver video', this.career, 1);
    // setTimeout(() => {
    //   let player = new Player(this.videoFrame.nativeElement);
    //   player.on('play', () => {
    //     this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    //   });
    //   player.on('ended', () => {
    //     this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    //   });
    //   player.on('error', () => {
    //     this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    //   });
    //   player.on('pause', () => {
    //     this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    //   });
    // }, 1000);
  }

}
