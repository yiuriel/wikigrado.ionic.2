import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { TestPage } from '../test/test';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { UserProvider } from '../../providers/user/user';
import { TestStorageProvider } from '../../providers/test-storage/test-storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import {EmpleoPage} from "../empleo/empleo";
import {GradosPage} from "../grados/grados";
import {FpInicioPage} from "../fp-inicio/fp-inicio";

@Component({
  selector: 'page-pretest',
  templateUrl: 'pretest.html',
})
export class PretestPage {
  test_done: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public tracker: AnalyticsProvider, public userService: UserProvider, public testStorageService: TestStorageProvider, private iab: InAppBrowser, public menuCtrl: MenuController) {
    this.menuCtrl.enable(true, 'appmenu');
  }

  ionViewDidLoad() {
    this.testStorageService.getTestDone((data, error) => {
      if (!error) {
        this.test_done = data;
      }
    });
  }

  openNavarraTest() {
    this.iab.create("https://www.unav.edu/web/admision-y-ayudas/test-online-de-orientacion", "_blank", {closebuttoncaption: "ok"});
  }

  goToTestPage() {
    this.navCtrl.setRoot(TestPage, {}, {animate: true})
  }

  //goToFormacionPage(){
  //  this.navCtrl.setRoot(FormacionPage, {}, {animate: true})
  //}
  goToEmpleoPage(){
    this.navCtrl.setRoot(EmpleoPage, {}, {animate: true})
  }
  goToGradosPage(){
    this.navCtrl.setRoot(GradosPage, {}, {animate: true})
  }
  goToFPPage(){
    this.navCtrl.setRoot(FpInicioPage, {}, {animate: true})
  }
}

