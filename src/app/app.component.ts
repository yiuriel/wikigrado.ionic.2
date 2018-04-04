import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
// import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';

import { HttpClientModule } from '@angular/common/http';
import { UserProvider } from '../providers/user/user';
import { AnalyticsProvider } from '../providers/analytics/analytics';

// import { InitialSliderPage } from '../pages/initial-slider/initial-slider';

// pages for menu
// import { TestPage } from '../pages/test/test';
import { LoginPage } from '../pages/login/login';
import { PretestPage } from '../pages/pretest/pretest';
import { GradosPage } from '../pages/grados/grados';
import { UniversidadesPage } from '../pages/universidades/universidades';
import { ColegiosMayoresPage } from '../pages/colegios-mayores/colegios-mayores';
import { FavoritosPage } from '../pages/favoritos/favoritos';
import { SimulatesplashPage } from '../pages/simulatesplash/simulatesplash';
import 'rxjs/add/operator/filter';

@Component({
  templateUrl: 'app.html',
  providers: [UserProvider, HttpClientModule]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SimulatesplashPage;

  pages: Array<{icon: string, title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private geolocation: Geolocation, public tracker: AnalyticsProvider, public userService: UserProvider) {
    this.initializeApp();

    const testMenuComponent = this.checkIfPretestOrTest();

    // used for an example of ngFor and navigation
    this.pages = [
      { icon: 'md-book', title: 'Test de Personalidad', component: testMenuComponent },
      { icon: 'md-school', title: 'Grados y Salidas Profesionales', component: GradosPage },
      { icon: 'md-ribbon', title: 'Universidades', component: UniversidadesPage },
      { icon: 'md-paper', title: 'Colegios Mayores', component: ColegiosMayoresPage },
      { icon: 'md-star', title: 'Favoritos', component: FavoritosPage },
    ];
  }

  checkIfPretestOrTest() {
    return PretestPage;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.tracker.initService();

      // if user has data, update user data in service, and update session
      // this.userService.clearStorage();
      this.userService.verifySession((type) => {
        switch (type) {
          case 'success':
            // move this to a service and mix with userService
            const options = {
              enableHighAccuracy: false,
              timeout: 20000,
              maximumAge: 5000
            };
            const subscription = this.geolocation.watchPosition(options)
              .filter((p) => p.coords !== undefined) //Filter Out Errors
              .subscribe(position => {
                if (position.coords) {
                  this.userService.updateLatLong(position.coords);
                  subscription.unsubscribe();
                }
              });
            return;
          case 'error':
            return;
        }
      });
    });
  }

  logout() {
    this.userService.clearStorage();
    this.nav.setRoot(LoginPage, {showVolver: false});
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
