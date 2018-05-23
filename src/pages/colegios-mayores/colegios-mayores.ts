import { Component, ElementRef } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { GradoPage } from '../grado/grado';
import { AllAppDataProvider } from '../../providers/all-app-data/all-app-data';
import { AnalyticsProvider } from '../../providers/analytics/analytics';

@Component({
  selector: 'page-colegios-mayores',
  templateUrl: 'colegios-mayores.html',
})
export class ColegiosMayoresPage {

  colleges: {[key: string]: any}
  collegesCached: {[key: string]: any}
  dimensions: {width: number, height: number}

  constructor(public navCtrl: NavController, public tracker: AnalyticsProvider, public navParams: NavParams, private domElem: ElementRef, public modalCtrl: ModalController, public allAppDataService: AllAppDataProvider, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ColegiosMayoresPage');
    let width = this.domElem.nativeElement.offsetWidth - 64;
    this.dimensions = {
      width: width,
      height: (width * 9) / 16,
    }

    this.getColegiosMayoresFromService();
  }

  getColegiosMayoresFromService() {
    this.colleges = this.allAppDataService.getColleges();
    this.collegesCached = [].concat(this.colleges);
  }

  getColegiosMayores($event) {
    const value = $event.value;
    if (value) {
      this.colleges = this.collegesCached.filter(cache => {
        return cache.career.indexOf(value) > -1
      });
    } else {
      this.colleges = [].concat(this.collegesCached);
    }
  }

  goToColegioMayor(colegioMayor) {
    if (colegioMayor) {
      let modal = this.modalCtrl.create(GradoPage, {data: {...colegioMayor, type: 'colleges', index: colegioMayor.id}, dimensionData: this.dimensions});
      modal.onDidDismiss(() => {
        modal = null;
      })
      modal.present();
    }
  }

}
