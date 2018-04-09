import { LoadingController } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class LoaderProvider {

  loader: any;

  constructor(public loadingCtrl: LoadingController) {}

  showLoader(config) {
    const loaderConf = {spinner: 'crescent', ...config};
    this.loader = this.loadingCtrl.create(loaderConf);

    this.loader.present();
  }

  hideLoader() {
    this.loader.dismiss();
  }

}
