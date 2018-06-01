import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, AlertController } from 'ionic-angular';
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
  accept: boolean;

  constructor(public navCtrl: NavController, public tracker: AnalyticsProvider, public navParams: NavParams, public userService: UserProvider, public toasterService: ToasterProvider, public loaderService: LoaderProvider, public alertCtrl: AlertController ) {
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

  seePrivacyPolicy() {
    const confirm = this.alertCtrl.create({
      title: 'Politicas de Privacidad',
      message: `<div>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original.<br/><br/> Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.Al contrario del pensamiento popular, el texto de Lorem Ipsum no es simplemente texto aleatorio. Tiene sus raices en una pieza cl´sica de la literatura del Latin, que data del año 45 antes de Cristo, haciendo que este adquiera mas de 2000 años dantiguedad.<br/><br/> Richard McClintock, un profesor de Latin de la Universidad de Hampden-Sydney en Virginia, encontró una de las palabras más oscuras de la lengua del latín, "consecteur", en un pasaje de Lorem Ipsum, y al seguir leyendo distintos textos del latín, descubrió la fuente indudable. Lorem Ipsum viene de las secciones 1.10.32 y 1.10.33 de "de Finnibus Bonorum et Malorum" (Los Extremos del Bien y El Mal) por Cicero, escrito en el año 45 antes de Cristo. Este libro es un tratado de teoría de éticas, muy popular durante el Renacimiento. La primera linea del Lorem Ipsum, "Lorem ipsum dolor sit amet..", viene de una linea en la sección 1.10.32 </div>`,
      buttons: [
        {
          text: 'No Acepto',
          handler: () => {
            this.accept = false;
          }
        },
        {
          text: 'Acepto',
          handler: () => {
            this.accept = true;
          }
        }
      ]
    });
    confirm.present();
  }

  goBack() {
    this.navCtrl.pop();
  }

}
