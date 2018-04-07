import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { CanvasProvider } from '../../providers/canvas/canvas';
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

  constructor(public navCtrl: NavController, public tracker: AnalyticsProvider, public canvasService: CanvasProvider, public navParams: NavParams, public userService: UserProvider, private camera: Camera, public toastCtrl: ToastController, public loadingCtrl: LoadingController ) {
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 35,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 150,
      targetHeight: 150,
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64image = 'data:image/jpeg;base64,' + imageData;
      this.canvasService.generateFromImage(base64image, 300, 300, .75, data => {
        this.image = data;
        this.userService.getUserData((data, error) => {
          if (!error) {
            this.userService.setUserData({...data, image: this.image}, (success, error) => {
              if (!error) {
                console.log("set data success")
              }
            });
          }
        })
      });
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
    this.showLoader('registrando . . .');
    this.userService.getUserData((data, error) => {
      this.userService.register(data, (success, error) => {
        this.hideLoader();
        if (error) {
          switch (error.error) {
            case 'retryToast':
            case 'error':
            case 1:
              return this.retryToast();
          }
        } else {
          return this.navCtrl.setRoot(PretestPage);
        }
      });
    })
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
