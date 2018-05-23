import { Component, ElementRef } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { TestPage } from '../test/test';
import { UserProvider } from '../../providers/user/user';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { OrientationVideosProvider } from '../../providers/orientation-videos/orientation-videos';

@Component({
  selector: 'page-orientation-videos-after-test',
  templateUrl: 'orientation-videos-after-test.html',
})
export class OrientationVideosAfterTestPage {

  user: any;
  videos: Array<{[key: string]: any}>
  dimensions: {width: number, height: number}

  constructor(public navCtrl: NavController, public tracker: AnalyticsProvider, public navParams: NavParams, public userService: UserProvider, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public orientationVideosService: OrientationVideosProvider, private domElem: ElementRef) {
    this.userService.getUserData((data, error) => {
      if (!error) {
        this.user = data;
      }
    })
  }

  ionViewDidEnter() {
    let width = this.domElem.nativeElement.offsetWidth - 64;
    this.dimensions = {
      width: width,
      height: (width * 9) / 16,
    }

    const orientations = [this.user.first_orientation, this.user.second_orientation, this.user.third_orientation].filter(orientation => orientation !== null);
    this.videos = this.orientationVideosService.getVideosBasedOnOrientations(orientations);
  }

  retakeTest() {
    this.navCtrl.setRoot(TestPage, {animate: true})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrientationVideosAfterTestPage');
  }

}
