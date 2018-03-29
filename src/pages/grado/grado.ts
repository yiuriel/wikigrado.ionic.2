import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Platform, ActionSheetController } from 'ionic-angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { AnalyticsProvider } from '../../providers/analytics/analytics';

@Component({
  selector: 'page-grado',
  templateUrl: 'grado.html',
})
export class GradoPage {

  appsAvailable: Array<string>

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public actionSheetCtrl: ActionSheetController, public viewCtrl: ViewController, private launchNavigator: LaunchNavigator) {
    this.appsAvailable = [];
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

  viewLocation(location) {
    let restOfButtons = this.appsAvailable.map((app) => {
      return {
        text: app.replace(/_/g, " "),
        handler: () => {
          this.openApp(app)
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

  openApp(app) {
    let options: LaunchNavigatorOptions = {
      app: app
    };

    this.launchNavigator.navigate('Jujuy, AR', options).then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
