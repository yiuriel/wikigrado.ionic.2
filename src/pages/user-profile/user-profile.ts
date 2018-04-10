import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
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

  @ViewChild(Slides) slides: Slides;
  avatars: Array<string>
  avatar: number;
  user: {[key: string]: any};
  ages: Array<number>

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserProvider, private camera: Camera, public canvasService: CanvasProvider, public toasterService: ToasterProvider, public loaderService: LoaderProvider) {
    this.userService.getUserData((data, error) => {
      if (!error) {
        this.user = data;
        this.avatar = data.avatar;
      }
    });

    this.avatars = ['assets/imgs/avatar/1.png','assets/imgs/avatar/2.png','assets/imgs/avatar/3.png','assets/imgs/avatar/4.png','assets/imgs/avatar/5.png','assets/imgs/avatar/6.png','assets/imgs/avatar/7.png','assets/imgs/avatar/8.png','assets/imgs/avatar/9.png','assets/imgs/avatar/10.png','assets/imgs/avatar/11.png']
    this.ages = Array.from(Array(100).keys()).slice(13, 100);
  }

  slideChanged() {
    this.avatar = this.slides.getActiveIndex();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');
  }

  updateUser() {
    this.loaderService.showLoader({content:'actualizando usuario...'});
    this.userService.updateUser({...this.user, avatar: this.avatar}, (user, error) => {
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
