import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { CanvasProvider } from '../../providers/canvas/canvas';
import { PretestPage } from '../pretest/pretest';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LoaderProvider } from '../../providers/loader/loader';
import { ToasterProvider } from '../../providers/toaster/toaster';

@Component({
  selector: 'page-register-picture-step',
  templateUrl: 'register-picture-step.html',
})
export class RegisterPictureStepPage {

  fileName: string;
  image: string;

  constructor(public navCtrl: NavController, public tracker: AnalyticsProvider, public canvasService: CanvasProvider, public navParams: NavParams, public userService: UserProvider, private camera: Camera, public toasterService: ToasterProvider, public loaderService: LoaderProvider ) {
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

  goToHomePage() {
    this.loaderService.showLoader({content:'finalizando registrando...'});
    this.userService.getUserData((data, error) => {
      this.userService.register(data, (success, error) => {
        this.loaderService.hideLoader();
        if (error) {
          switch (error.error) {
            case 'retryToast':
            case 'error':
            case 1:
              return this.loaderService.showLoader({content: 'Hubo un error, vuelve a intentarlo más tarde.'});
          }
        } else {
          return this.navCtrl.setRoot(PretestPage);
        }
      });
    })
  }

  goToRegisterPage() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPictureStepPage');
  }

}
