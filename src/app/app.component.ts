import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { InitialSliderPage } from '../pages/initial-slider/initial-slider';

// pages for menu
import { TestPage } from '../pages/test/test';
import { GradosPage } from '../pages/grados/grados';
import { UniversidadesPage } from '../pages/universidades/universidades';
import { ColegiosMayoresPage } from '../pages/colegios-mayores/colegios-mayores';
import { FavoritosPage } from '../pages/favoritos/favoritos';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = InitialSliderPage;

  pages: Array<{icon: string, title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { icon: 'md-book', title: 'Test de Personalidad', component: TestPage },
      { icon: 'md-school', title: 'Grados y Salidas Profesionales', component: GradosPage },
      { icon: 'md-ribbon', title: 'Universidades', component: UniversidadesPage },
      { icon: 'md-paper', title: 'Colegios Mayores', component: ColegiosMayoresPage },
      { icon: 'md-star', title: 'Favoritos', component: FavoritosPage },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
