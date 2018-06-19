import { Component, Input, ViewChild } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
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
  @ViewChild('wrapper') wrapper: any;

  active: boolean;
  trueWidth: number;
  trueHeight: number;
  actualUrl: SafeUrl;

  constructor(public loadingCtrl: LoadingController, public tracker: AnalyticsProvider, private sanitizer: DomSanitizer) {
    this.active = false;

    setTimeout(() => {
      this.switchActive();
    }, 100);
  }

  switchActive() {
    this.actualUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url)
    this.active = true;
    setTimeout(() => {
      if (this.url.indexOf("vimeo") > -1) {
        let player = new Player(this.videoFrame.nativeElement);
        player.on('play', () => {
          this.tracker.trackEvent('video', 'vimeo', this.name);
        });
      } else {
        this.tracker.trackEvent('video', 'youtube', this.name);
      }
    }, 250);
  }

}
