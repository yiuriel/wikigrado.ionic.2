import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { ComponentsModule } from '../components/components.module'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { InitialSliderPage } from '../pages/initial-slider/initial-slider';
import { RegisterPage } from '../pages/register/register';
import { RegisterPictureStepPage } from '../pages/register-picture-step/register-picture-step';

import { TestPage } from '../pages/test/test';
import { GradosPage } from '../pages/grados/grados';
import { UniversidadesPage } from '../pages/universidades/universidades';
import { ColegiosMayoresPage } from '../pages/colegios-mayores/colegios-mayores';
import { FavoritosPage } from '../pages/favoritos/favoritos';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserProvider } from '../providers/user/user';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    InitialSliderPage,
    RegisterPage,
    TestPage,
    GradosPage,
    UniversidadesPage,
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
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    InitialSliderPage,
    RegisterPage,
    TestPage,
    GradosPage,
    UniversidadesPage,
    ColegiosMayoresPage,
    FavoritosPage,
    RegisterPictureStepPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    ScreenOrientation
  ]
})
export class AppModule {}
