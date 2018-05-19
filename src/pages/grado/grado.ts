import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Platform, ActionSheetController, ModalController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, private social: SocialSharing, public tracker: AnalyticsProvider, public navParams: NavParams, public platform: Platform, public actionSheetCtrl: ActionSheetController, public viewCtrl: ViewController, private launchNavigator: LaunchNavigator, private iab: InAppBrowser, public allAppDataService: AllAppDataProvider, public modalCtrl: ModalController) {
    this.appsAvailable = [];

    this.item = this.navParams.data.data;
    this.dimensionData = this.navParams.data.dimensionData;
  }

  shareVia(item, shareType) {
    this.social.canShareVia(shareType).then((success) => {
      console.warn(success);
    }).catch(error => {
      console.warn(JSON.stringify(error));
    });
  }

  sendMail(mail) {
    window.open(`mailto:${mail}`, '_system');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GradoPage');
    if (this.platform.is("mobile") && !this.platform.is("mobileweb")) {
      this.launchNavigator.availableApps().then(res => {
        for (let app in res) {
          if (res.hasOwnProperty(app) && res[app]) {
            this.appsAvailable.push(app);
          }
        }
      })
    }
  }

  openUrl(url) {
    this.iab.create(url, "_blank", {closebuttoncaption: "ok"});
  }

  callPhoneNumber(number) {
    window.open(`tel:${number}`, '_system');
  }

  viewLocation(location) {
    let restOfButtons = this.appsAvailable.map((app) => {
      return {
        text: app.replace(/_/g, " "),
        handler: () => {
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
