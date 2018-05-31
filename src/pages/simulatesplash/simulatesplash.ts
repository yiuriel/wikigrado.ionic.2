import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { InitialSliderPage } from '../initial-slider/initial-slider';
import { OrientationVideosAfterTestPage } from '../../pages/orientation-videos-after-test/orientation-videos-after-test';
import { PretestPage } from '../../pages/pretest/pretest';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';
import { TestStorageProvider } from '../../providers/test-storage/test-storage';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';

@Component({
  selector: 'page-simulatesplash',
  templateUrl: 'simulatesplash.html',
})
export class SimulatesplashPage {

  testpage: any;

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public userService: UserProvider, private geolocation: Geolocation, private storage: Storage, public testStorageService: TestStorageProvider, private nativeGeocoder: NativeGeocoder) {
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
            if (sessionSuccess.latitude && sessionSuccess.longitude) {
              this.nativeGeocoder.reverseGeocode(sessionSuccess.latitude, sessionSuccess.longitude)
                .then((result: NativeGeocoderReverseResult) => {
                  this.doCityCountryCall(result);
                })
                .catch((error: any) => console.log(error));
            } else {
              const options = {
                enableHighAccuracy: false,
                timeout: 20000,
                maximumAge: 5000
              };
              const subscription = this.geolocation.watchPosition(options)
              .filter((p) => p.coords !== undefined) //Filter Out Errors
              .subscribe(position => {
                if (position.coords) {
                  this.nativeGeocoder.reverseGeocode(position.coords.latitude, position.coords.longitude)
                    .then((result: NativeGeocoderReverseResult) => {
                      this.doCityCountryCall(result);
                    })
                    .catch((error: any) => console.log(error));
                  this.userService.updateLatLong(position.coords, (success, error) => {});
                  subscription.unsubscribe();
                }
              });
            }
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

  doCityCountryCall(result) {
    if (result && result[0]) {
      const first = result[0];
      this.userService.updateCityCountry(
        first.subAdministrativeArea + ", " + first.administrativeArea,
        first.countryName,
        (cityCountrySuccess, error) => {
          if (!error) {
            console.log(cityCountrySuccess);
          }
        }
      )
    }
  }

}
