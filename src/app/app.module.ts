import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { NativeGeocoder } from '@ionic-native/native-geocoder';

import { ComponentsModule } from '../components/components.module'
import { PipesModule } from '../pipes/pipes.module'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { InitialSliderPage } from '../pages/initial-slider/initial-slider';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import { RegisterPictureStepPage } from '../pages/register-picture-step/register-picture-step';

import { TestPage } from '../pages/test/test';
import { PretestPage } from '../pages/pretest/pretest';
import { GradosPage } from '../pages/grados/grados';
import { GradoPage } from '../pages/grado/grado';
import { UniversidadesPage } from '../pages/universidades/universidades';
import { UniversidadPage } from '../pages/universidad/universidad';
import { ColegiosMayoresPage } from '../pages/colegios-mayores/colegios-mayores';
import { FavoritosPage } from '../pages/favoritos/favoritos';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserProvider } from '../providers/user/user';
import { TestQuestionsProvider } from '../providers/test-questions/test-questions';
import { GradosVideosProvider } from '../providers/grados-videos/grados-videos';
import { UniversidadesProvider } from '../providers/universidades/universidades';
import { ColegiosMayoresProvider } from '../providers/colegios-mayores/colegios-mayores';
import { AnalyticsProvider } from '../providers/analytics/analytics';
import { FavoritesProvider } from '../providers/favorites/favorites';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    InitialSliderPage,
    RegisterPage,
    LoginPage,
    TestPage,
    PretestPage,
    GradosPage,
    GradoPage,
    UniversidadesPage,
    UniversidadPage,
    ColegiosMayoresPage,
    FavoritosPage,
    RegisterPictureStepPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      platforms: {
        ios: {
          activator: "ripple"
        }
      }
    }),
    ComponentsModule,
    PipesModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    InitialSliderPage,
    RegisterPage,
    LoginPage,
    TestPage,
    PretestPage,
    GradosPage,
    GradoPage,
    UniversidadesPage,
    UniversidadPage,
    ColegiosMayoresPage,
    FavoritosPage,
    RegisterPictureStepPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    NativeGeocoder,
    GoogleAnalytics,
    ScreenOrientation,
    LaunchNavigator,
    UserProvider,
    TestQuestionsProvider,
    GradosVideosProvider,
    UniversidadesProvider,
    ColegiosMayoresProvider,
    AnalyticsProvider,
    FavoritesProvider
  ]
})
export class AppModule {}
