import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Platform, AlertController, ActionSheetController, ModalController } from 'ionic-angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AllAppDataProvider } from '../../providers/all-app-data/all-app-data';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-grado',
  templateUrl: 'grado.html',
})
export class GradoPage {

  appsAvailable: Array<string>
  item: any;
  dimensionData: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private social: SocialSharing, public tracker: AnalyticsProvider, public navParams: NavParams, public platform: Platform, public actionSheetCtrl: ActionSheetController, public viewCtrl: ViewController, private launchNavigator: LaunchNavigator, private iab: InAppBrowser, public allAppDataService: AllAppDataProvider, public modalCtrl: ModalController) {
    this.appsAvailable = [];

    this.item = this.navParams.data.data;
    this.dimensionData = this.navParams.data.dimensionData;
  }

  getItemName(item) {
    if (item.type === 'grades') {
      return item.grade;
    }
    if (item.type === 'universities') {
      return item.university;
    }
    if (item.type === 'colleges') {
      return item.name;
    }
  }

  getItemNameForMapTrack(item) {
    if (item.type === 'grades') {
      return item.main_university.university;
    }
    if (item.type === 'universities') {
      return item.university;
    }
    if (item.type === 'colleges') {
      return item.name;
    }
  }

  shareVia(item, shareType) {
    let itemName = this.getItemName(item);
    switch (shareType) {
      case 'whatsapp':
        this.social.shareViaWhatsApp('unete a wikigrado y profesionales te explicarán en video sobre grados universitarios de tu interes. ', null, 'https://www.wikigrado.es/').then(shareSuccess => {
          this.tracker.trackEvent('social', 'compartir ' + shareType, itemName);
        }).catch(error => {
          this.noAppAlert();
        });
      break;
      case 'facebook':
        this.social.shareViaFacebookWithPasteMessageHint('', '', '').then(shareSuccess => {
          this.tracker.trackEvent('social', 'compartir ' + shareType, itemName);
        }).catch(error => {
          this.noAppAlert();
        });
      break;
      case 'twitter':
        this.social.shareViaTwitter('unete a wikigrado y profesionales te explicarán en video sobre grados universitarios de tu interes. ', null, 'https://www.wikigrado.es/').then(shareSuccess => {
          this.tracker.trackEvent('social', 'compartir ' + shareType, itemName);
        }).catch(error => {
          this.noAppAlert();
        });
      break;
      case 'email':
        this.social.shareViaEmail('La App de wikigrado es genial, visita el sitio https://www.wikigrado.es/', 'unete a wikigrado', []).then(shareSuccess => {
          this.tracker.trackEvent('social', 'compartir ' + shareType, itemName);
        }).catch(error => {
          this.noAppAlert();
        });
      break;
    }
  }

  noAppAlert() {
    let alert = this.alertCtrl.create({
      title: 'Ups!',
      subTitle: 'Puede que no tengas instalada la aplicacion para compartir esto.',
      buttons: ['OK']
    });
    alert.present();
  }

  sendMail(mail) {
    window.open(`mailto:${mail}`, '_system');
  }

  ionViewDidLoad() {
    if (this.platform.is("mobile") && !this.platform.is("mobileweb")) {
      this.launchNavigator.availableApps().then(res => {
        for (let app in res) {
          if (res.hasOwnProperty(app) && res[app]) {
            this.appsAvailable.push(app);
          }
        }

        if (this.appsAvailable.indexOf("google_maps") === -1) {
          this.appsAvailable.push("google_maps");
        }
      })
    }
  }

  openUrl(url, name) {
    this.iab.create(url, "_blank", {closebuttoncaption: "ok"});
    this.tracker.trackEvent('links', 'web universidad ' + name, url);
  }

  callPhoneNumber(number) {
    const itemName = this.getItemName(this.item);
    const n = number.replace(/\s/g, "");
    this.iab.create("tel:" + n, "_system", {closebuttoncaption: "ok", location: 'no'});
    this.tracker.trackEvent('llamadas', 'llamar ' + this.item.type + " " + itemName, n);
  }

  viewLocation(location) {
    let restOfButtons = this.appsAvailable.map((app) => {
      return {
        text: app.replace(/_/g, " "),
        handler: () => {
          const itemName = this.getItemNameForMapTrack(this.item);
          this.tracker.trackEvent('mapa', app, itemName);
          this.openApp(app, location)
        }
      }
    })
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Ver ubicacion',
      buttons: [
        ...restOfButtons,
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  openApp(app, location) {
    let options: LaunchNavigatorOptions = {
      app: app
    };

    this.launchNavigator.navigate([location.latitude, location.longitude], options).then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );
  }

  goTo(obj, type) {
    if (obj) {
      let preObjectToPass = this.allAppDataService.getDataBasedOnTypeAndIndex(type, obj.id);
      let objToPass = type === 'universities' ? this.allAppDataService.getUniversityWithGrades(preObjectToPass) : this.allAppDataService.getGradeWithUniversities(preObjectToPass);
      let modal = this.modalCtrl.create(GradoPage, {data: {...objToPass, type, index: objToPass.id}, dimensionData: this.dimensionData});
      modal.onDidDismiss(() => {
        modal = null;
      })
      modal.present();
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
