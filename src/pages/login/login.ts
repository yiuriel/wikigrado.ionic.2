import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { PretestPage } from '../pretest/pretest';
import { UserProvider } from '../../providers/user/user';
import { TestStorageProvider } from '../../providers/test-storage/test-storage';
import { LoaderProvider } from '../../providers/loader/loader';
import { ToasterProvider } from '../../providers/toaster/toaster';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: {email:string, password: string}
  showVolver: any;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  canSendRecovery: boolean = true;

  constructor(public navCtrl: NavController, public userService: UserProvider, public navParams: NavParams, public toasterService: ToasterProvider, public loaderService: LoaderProvider, public testStorageService: TestStorageProvider, public alertCtrl: AlertController) {
    this.user = {email: "", password: ""}
    this.showVolver = this.navParams.data.hasOwnProperty("showVolver") || false;

    const user = this.navParams.get('user');
    if (user && user.email) {
      this.user.email = user.email;
    }
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  resetPassword() {
    if (this.canSendRecovery) {
      let alert = this.alertCtrl.create({
        title: 'Recuperar contraseña',
        inputs: [
          {
            name: 'recovery_email',
            type: 'email',
            id: 'recovery_email',
            value: this.user.email,
            placeholder: 'Email'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Mandar email',
            handler: data => {
              if (data.recovery_email) {
                this.loaderService.showLoader({content:'Enviando email...'});
                this.userService.startPasswordRecovery(data.recovery_email, (success, error) => {
                  this.loaderService.hideLoader();
                  if (error) {
                    this.toasterService.showToast({message: 'Hubo un error, asegurate de que los datos sean correctos.'});
                  } else {
                    this.canSendRecovery = false;
                    let innerAlert = this.alertCtrl.create({
                      title: 'Verifica tu email',
                      subTitle: 'Tendras un link para generar un nuevo password.',
                      buttons: [{
                        text: 'Ok!',
                        role: 'accept'
                      }]
                    });
                    innerAlert.present();
                  }
                })
              }
            }
          }
        ]
      });
      alert.present();
    } else {
      let alreadyHaveAnEmailAlert = this.alertCtrl.create({
        title: 'Verifica tu email',
        subTitle: 'Ya te hemos enviado un email para crear una nueva contraseña.',
        buttons: [{
          text: 'Ok!',
          role: 'accept'
        }]
      });
      alreadyHaveAnEmailAlert.present();
    }
  }

  login() {
    this.loaderService.showLoader({content:'conectando...'});
    this.userService.login(this.user, (data, error) => {
      this.loaderService.hideLoader();
      if (error) {
        switch(error.error) {
          case 'wrongLoginToast':
            return this.toasterService.showToast({message: 'Hubo un error, vuelve a intentarlo más tarde.'});
          case 'error':
            return this.toasterService.showToast({message: 'Puede que los datos sean incorrectos, o que tu email no este validado.'});
        }
      } else {
        if (data.orientations) {
          this.testStorageService.setTestDone(true, (value, failed) => {
            if (!failed) {
              this.navCtrl.setRoot(PretestPage);
            }
          })
        } else {
          this.navCtrl.setRoot(PretestPage);
        }
      }
    });
  }

  goBack() {
    this.navCtrl.pop();
  }

}
