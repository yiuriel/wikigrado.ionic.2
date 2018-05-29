import { Component, Input, ViewChild } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
// import { ScreenOrientation } from '@ionic-native/screen-orientation';
import Player from '@vimeo/player';

@Component({
  selector: 'image-switch-iframe',
  templateUrl: 'image-switch-iframe.html'
})

export class ImageSwitchIframeComponent {
  @Input('width') width: number;
  @Input('height') height: number;
  @Input('url') url: string;
  @Input('career') career: string;
  @Input('name') name: string;

  @ViewChild('videoFrame') videoFrame: any;

  active: boolean;
  trueWidth: number;
  trueHeight: number;
  actualUrl: SafeUrl;
  // private screenOrientation: ScreenOrientation
  constructor(public loadingCtrl: LoadingController, public tracker: AnalyticsProvider, private sanitizer: DomSanitizer) {
    this.active = false;
    const INSET = 32;
    const INSETRATIO = (INSET * 9) / 16;

    setTimeout(() => {
      this.trueWidth = Math.round(this.width - INSET);
      this.trueHeight = Math.round(this.height - INSETRATIO);
      this.switchActive();
    }, 100)
  }

  switchActive() {
    this.actualUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url)
    this.active = true;
    setTimeout(() => {
      if (this.url.indexOf("vimeo") > -1) {
        let player = new Player(this.videoFrame.nativeElement);
        player.on('play', () => {
          this.tracker.trackEvent('video', 'ver video vimeo', this.name, 1);
        });
      } else {
        this.tracker.trackEvent('video', 'ver video youtube', this.name, 1);
      }
    //   player.on('ended', () => {
    //     this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    //   });
    //   player.on('error', () => {
    //     this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    //   });
    //   player.on('pause', () => {
    //     this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    //   });
    }, 50);
  }

}
