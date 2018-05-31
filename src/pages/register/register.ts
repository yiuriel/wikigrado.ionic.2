import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { PretestPage } from '../pretest/pretest';
// import { RegisterPictureStepPage } from '../register-picture-step/register-picture-step';
import { LoaderProvider } from '../../providers/loader/loader';
import { ToasterProvider } from '../../providers/toaster/toaster';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  @ViewChild(Slides) slides: Slides;
  @ViewChild('registeremail') input: {[key: string]: any};
  ages: Array<number>
  avatars: Array<string>
  avatar: number;
  user: {[key: string]: any};
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(public navCtrl: NavController, public tracker: AnalyticsProvider, public navParams: NavParams, public userService: UserProvider, public toasterService: ToasterProvider, public loaderService: LoaderProvider ) {
    this.ages = Array.from(Array(100).keys()).slice(13, 100);
    this.user = {};

    this.avatar = 0;
    this.avatars = ['assets/imgs/avatar/1.png','assets/imgs/avatar/2.png','assets/imgs/avatar/3.png','assets/imgs/avatar/4.png','assets/imgs/avatar/5.png','assets/imgs/avatar/6.png','assets/imgs/avatar/7.png','assets/imgs/avatar/8.png','assets/imgs/avatar/9.png','assets/imgs/avatar/10.png','assets/imgs/avatar/11.png']
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  slideChanged() {
    this.avatar = this.slides.getActiveIndex();
  }

  register() {
    this.loaderService.showLoader({content:'registrando...'});
    this.userService.register({...this.user, avatar: this.avatar}, (success, error) => {
      this.loaderService.hideLoader();
      if (error) {
        switch (error.error) {
          case 'retryToast':
          case 'error':
          case 1:
            return this.toasterService.showToast({message: 'Hubo un error, vuelve a intentarlo más tarde.'});
          case 'emailTakenToast':
            return this.toasterService.showToast({message: 'Ya existe un usuario con este email'});
        }
      } else {
        this.toasterService.showToast({message: 'te registraste exitosamente, luego de verificar tu email podras loguearte.', duration: 10000});
        // this.navCtrl.setRoot(PretestPage);
      }
    });
  }

  checkEmail() {
    if (this.user.email && this.input.valid) {
      this.userService.checkEmail(this.user.email, (type) => {
        if (type === 'not-available') {
          this.toasterService.showToast({message: 'Ya existe un usuario con este email'});
        } else if (type === 'error') {
          this.toasterService.showToast({message: 'Hubo un error, vuelve a intentarlo más tarde.'});
        }
      })
    }
  }

  goBack() {
    this.navCtrl.pop();
  }

}
