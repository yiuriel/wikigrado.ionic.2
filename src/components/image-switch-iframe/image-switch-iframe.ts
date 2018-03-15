import { Component, Input } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'image-switch-iframe',
  templateUrl: 'image-switch-iframe.html'
})

export class ImageSwitchIframeComponent {
  @Input('width') width: number;
  @Input('height') height: number;
  @Input('url') url: string;
  @Input('career') career: string;

  active: boolean;
  actualUrl: SafeUrl;

  constructor(public loadingCtrl: LoadingController, private sanitizer: DomSanitizer) {
    console.log('Hello ImageSwitchIframeComponent Component');
    this.active = false;
  }

  switchActive() {
    this.actualUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url)
    console.warn(this.url, this.actualUrl)
    this.active = true;
  }

}
