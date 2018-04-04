import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { PretestPage } from '../pretest/pretest';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-register-picture-step',
  templateUrl: 'register-picture-step.html',
})
export class RegisterPictureStepPage {

  fileName: string;
  image: string;
  loader: any;
  toast: any;

  constructor(public navCtrl: NavController, public tracker: AnalyticsProvider, public navParams: NavParams, public userService: UserProvider, private camera: Camera, public toastCtrl: ToastController, public loadingCtrl: LoadingController ) {
    // console.warn(userService.getData())
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 25,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.image = 'data:image/jpeg;base64,' + imageData;
      // console.warn({...this.userService.getData(), image: this.image});
      this.userService.setData({...this.userService.getData(), image: this.image});
    }, (err) => {
      // Handle error
    });
  }

  showLoader(text) {
    this.loader = this.loadingCtrl.create({
      content: text,
      spinner: 'crescent',
    });

    this.loader.present();
  }

  hideLoader() {
    this.loader.dismiss();
  }

  goToHomePage() {
    this.showLoader(null);
    this.userService.register(this.userService.getData(), (type) => {
      this.hideLoader();
      switch (type) {
        case 'retryToast':
        case 'error':
          return this.retryToast();
        case 'success':
          return this.navCtrl.setRoot(PretestPage);
      }
    });
  }

  retryToast() {
    this.toast = this.toastCtrl.create({
      message: 'Hubo un error, vuelve a intentarlo más tarde.',
      duration: 5000,
      position: 'bottom',
      showCloseButton: true
    });
    this.toast.present();
    this.toast.onDidDismiss(() => {
      this.toast = null;
    });
  }

  goToRegisterPage() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPictureStepPage');
    // this.tracker.trackView('vista de registro (foto)');
  }

}
