import { ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class ToasterProvider {

  toaster: any;

  constructor(public toastCtrl: ToastController) {}

  showToast(config, callback?) {
    if (this.toaster) {
      this.toaster.dismiss();
    }
    this.toaster = this.toastCtrl.create({
      message: 'Hubo un error, vuelve a intentarlo más tarde.',
      duration: 5000,
      position: 'bottom',
      showCloseButton: true,
      ...config
    });
    this.toaster.present();
    this.toaster.onDidDismiss(() => {
      this.toaster = null;
      if (callback && typeof callback === "function") {
        callback();
      }
    });
  }

}
