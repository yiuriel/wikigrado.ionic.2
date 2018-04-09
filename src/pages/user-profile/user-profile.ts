import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { CanvasProvider } from '../../providers/canvas/canvas';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  user: {[key: string]: any};
  toast: any;
  loader: any;
  ages: Array<number>

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserProvider, private camera: Camera, public canvasService: CanvasProvider, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.userService.getUserData((data, error) => {
      if (!error) {
        this.user = data;
      }
    });

    this.ages = Array.from(Array(100).keys());
    this.ages.shift();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');
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
      this.showLoader('cambiando imagen...');
      this.canvasService.generateFromImage(base64image, 300, 300, .75, data => {
        this.user.image = data;
        this.userService.updateAvatar(data, (success, error) => {
          if (!error) {
            this.savedImageToast();
          } else {
            this.errorToast();
          }
          this.hideLoader();
        });
      });
    }, (err) => {
      this.errorToast();
    });
  }

  updateUser() {
    this.showLoader('actualizando usuario...');
    this.userService.updateUser(this.user, (user, error) => {
      if (!error) {
        this.userService.setUserData(user, (storageSuccess, storageError) => {
          if (!storageError) {
            this.showSuccessToast();
          }
        })
      } else {
        this.errorToast();
      }
      this.hideLoader();
    });
  }

  showSuccessToast() {
    this.toast = this.toastCtrl.create({
      message: 'Datos guardados correctamente',
      duration: 3000,
      position: 'middle',
      showCloseButton: true
    });
    this.toast.present();
    this.toast.onDidDismiss(() => {
      this.toast = null;
    });
  }

  savedImageToast() {
    this.toast = this.toastCtrl.create({
      message: 'Imagen cambiada correctamente',
      duration: 3000,
      position: 'middle'
    });
    this.toast.present();
    this.toast.onDidDismiss(() => {
      this.toast = null;
    });
  }

  errorToast() {
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

}
