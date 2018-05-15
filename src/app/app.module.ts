import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { SocialSharing } from '@ionic-native/social-sharing';

import { ComponentsModule } from '../components/components.module'
import { PipesModule } from '../pipes/pipes.module'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SimulatesplashPage } from '../pages/simulatesplash/simulatesplash';
import { InitialSliderPage } from '../pages/initial-slider/initial-slider';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import { RegisterPictureStepPage } from '../pages/register-picture-step/register-picture-step';

import { TestPage } from '../pages/test/test';
import { PretestPage } from '../pages/pretest/pretest';
import { GradosPage } from '../pages/grados/grados';
import { GradoPage } from '../pages/grado/grado';
import { UniversidadesPage } from '../pages/universidades/universidades';
import { ColegiosMayoresPage } from '../pages/colegios-mayores/colegios-mayores';
import { FavoritosPage } from '../pages/favoritos/favoritos';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { OrientationVideosAfterTestPage } from '../pages/orientation-videos-after-test/orientation-videos-after-test';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserProvider } from '../providers/user/user';
import { TestQuestionsProvider } from '../providers/test-questions/test-questions';
import { AnalyticsProvider } from '../providers/analytics/analytics';
import { FavoritesProvider } from '../providers/favorites/favorites';
import { EnvProvider } from '../providers/env/env';
import { AllAppDataProvider } from '../providers/all-app-data/all-app-data';
import { CanvasProvider } from '../providers/canvas/canvas';
import { OrientationVideosProvider } from '../providers/orientation-videos/orientation-videos';
import { TestStorageProvider } from '../providers/test-storage/test-storage';
import { LoaderProvider } from '../providers/loader/loader';
import { ToasterProvider } from '../providers/toaster/toaster';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    SimulatesplashPage,
    InitialSliderPage,
    RegisterPage,
    LoginPage,
    TestPage,
    PretestPage,
    GradosPage,
    GradoPage,
    UniversidadesPage,
    ColegiosMayoresPage,
    FavoritosPage,
    RegisterPictureStepPage,
    UserProfilePage,
    OrientationVideosAfterTestPage,
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
    IonicStorageModule.forRoot(),
    ComponentsModule,
    PipesModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    SimulatesplashPage,
    InitialSliderPage,
    RegisterPage,
    LoginPage,
    TestPage,
    PretestPage,
    GradosPage,
    GradoPage,
    UniversidadesPage,
    ColegiosMayoresPage,
    FavoritosPage,
    RegisterPictureStepPage,
    UserProfilePage,
    OrientationVideosAfterTestPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InAppBrowser,
    Geolocation,
    NativeGeocoder,
    GoogleAnalytics,
    Camera,
    SocialSharing,
    ScreenOrientation,
    LaunchNavigator,
    UserProvider,
    TestQuestionsProvider,
    AnalyticsProvider,
    FavoritesProvider,
    EnvProvider,
    AllAppDataProvider,
    CanvasProvider,
    OrientationVideosProvider,
    TestStorageProvider,
    LoaderProvider,
    ToasterProvider
  ]
})
export class AppModule {}
