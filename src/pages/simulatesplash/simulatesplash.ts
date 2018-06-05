import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { InitialSliderPage } from '../initial-slider/initial-slider';
import { OrientationVideosAfterTestPage } from '../../pages/orientation-videos-after-test/orientation-videos-after-test';
import { PretestPage } from '../../pages/pretest/pretest';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';
import { TestStorageProvider } from '../../providers/test-storage/test-storage';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-simulatesplash',
  templateUrl: 'simulatesplash.html',
})
export class SimulatesplashPage {

  testpage: any;

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public userService: UserProvider, private geolocation: Geolocation, private storage: Storage, public testStorageService: TestStorageProvider) {
    this.testpage = PretestPage;
    this.testStorageService.getTestDone((value, error) => {
      if (!error) {
        if (value) {
          this.testpage = OrientationVideosAfterTestPage;
        }
      }
    })
  }

  ionViewDidLoad() {
    this.checkUserData((success, error) => {
      const redirectTimeout = setTimeout(() => {
        if (success) {
          clearTimeout(redirectTimeout);
          this.navCtrl.setRoot(this.testpage);
        } else {
          this.navCtrl.setRoot(InitialSliderPage);
        }
      }, 500);
    });
  }

  checkUserData(callback) {
    this.platform.ready().then(() => {
      this.storage.ready().then(() => {
        this.userService.verifySession((sessionSuccess, sessionError) => {
          if (!sessionError) {
            const options = {
              enableHighAccuracy: false,
              timeout: 20000,
              maximumAge: 5000
            };
            const subscription = this.geolocation.watchPosition(options)
            .filter((p) => p.coords !== undefined) //Filter Out Errors
            .subscribe(position => {
              if (position.coords) {
                this.userService.updateLatLong(position.coords, (success, error) => {
                  if (!error) {
                    // console.error(success);
                  }
                });
                subscription.unsubscribe();
              }
            });
            callback(sessionSuccess, null);
          } else {
            callback(null, sessionError);
          }
        });
      }, (error) => {
        callback(null, error);
      })
    });
  }

}
