import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-orientation-videos-after-test',
  templateUrl: 'orientation-videos-after-test.html',
})
export class OrientationVideosAfterTestPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrientationVideosAfterTestPage');
  }

}
