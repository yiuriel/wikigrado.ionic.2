import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { CanvasProvider } from '../../providers/canvas/canvas';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LoaderProvider } from '../../providers/loader/loader';
import { ToasterProvider } from '../../providers/toaster/toaster';

@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  user: {[key: string]: any};
  ages: Array<number>

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserProvider, private camera: Camera, public canvasService: CanvasProvider, public toasterService: ToasterProvider, public loaderService: LoaderProvider) {
    this.userService.getUserData((data, error) => {
      if (!error) {
        this.user = data;
      }
    });

    this.ages = Array.from(Array(100).keys()).slice(13, 100);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');
  }

  changePicture() {
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
      this.loaderService.showLoader({content:'cambiando imagen...'});
      this.canvasService.generateFromImage(base64image, 300, 300, .75, data => {
        this.user.image = data;
        this.userService.updateAvatar(data, (success, error) => {
          if (!error) {
            this.toasterService.showToast({
              message: 'Imagen cambiada correctamente',
              duration: 3000,
              position: 'middle'
            });
          } else {
            this.loaderService.showLoader({content: 'Hubo un error, vuelve a intentarlo más tarde.'});
          }
          this.loaderService.hideLoader();
        });
      });
    }, (err) => {
      this.loaderService.showLoader({content: 'Hubo un error, vuelve a intentarlo más tarde.'});
    });
  }

  updateUser() {
    this.loaderService.showLoader({content:'actualizando usuario...'});
    this.userService.updateUser(this.user, (user, error) => {
      if (!error) {
        this.userService.setUserData(user, (storageSuccess, storageError) => {
          if (!storageError) {
            this.toasterService.showToast({
              message: 'Datos guardados correctamente',
              duration: 3000,
              position: 'middle'
            });
          }
        })
      } else {
        this.loaderService.showLoader({content: 'Hubo un error, vuelve a intentarlo más tarde.'});
      }
      this.loaderService.hideLoader();
    });
  }

}
