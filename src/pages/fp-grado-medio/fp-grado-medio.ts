import { Component, ElementRef } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { AllAppDataProvider } from '../../providers/all-app-data/all-app-data';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { Storage } from '@ionic/storage';
import {GradoMedioPage} from "../grado-medio/grado-medio";

@Component({
  selector: 'page-fp-grado-medio',
  templateUrl: 'fp-grado-medio.html',
})
export class FpGradoMedioPage {
  grades: {[key: string]: any}
  gradesCached: Array<{[key: string]: any}>
  dimensions: {width: number, height: number}
  agreedInformation: boolean = true;

  constructor(public navCtrl: NavController, public tracker: AnalyticsProvider, public navParams: NavParams, public modalCtrl: ModalController, public allAppDataService :AllAppDataProvider, private domElem: ElementRef, public loadingCtrl: LoadingController, public storage: Storage) {
    this.storage.get('agreedInformation').then(value => {
      if (value) {
        this.agreedInformation = true;
      } else {
        this.agreedInformation = false;
      }
    }, error => {
      this.agreedInformation = false;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FpGradoMedioPage');
  }
  setAgreedInformation() {
    this.storage.set('agreedInformation', true).then(value => {
      this.agreedInformation = true;
    }, error => {
      this.agreedInformation = false;
    });
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter FpGradoMedioPage');
    let width = this.domElem.nativeElement.offsetWidth - 32;
    this.dimensions = {
      width: width,
      height: (width * 9) / 16,
    }

    this.getGradoMedioFromService();
  }

  //getAllGradoMedio() {
  //  this.grades = this.allAppDataService.getGradoMedio();
  //  console.log(this.grades);
  //  this.gradesCached = [].concat(this.grades);
  //}
//
  filterGrades($event) {
    const value = $event.value;
    if (value) {
      this.grades = this.gradesCached.filter(cache => {
        return cache.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      });
    } else {
      this.grades = [].concat(this.gradesCached);
    }
  }

  //goToGrade(grade) {
  //  if (grade) {
  //    let gradeWithUnivs = this.allAppDataService.getGradeMedioWithUniversities(grade);
  //    let modal = this.modalCtrl.create(GradoMedioPage, {data: {...gradeWithUnivs, type: 'fp_medio', index: gradeWithUnivs.id}, dimensionData: this.dimensions});
  //    modal.onDidDismiss(() => {
  //      modal = null;
  //    })
  //    modal.present();
  //  }
  //}
  getGradoMedioFromService() {
    this.grades = this.allAppDataService.getGradoMedio();
    this.gradesCached = [].concat(this.grades);
    console.log(this.grades);
  }

  //getGradoMedio($event) {
  //  const value = $event.value;
  //  if (value) {
  //    this.grades = this.gradesCached.filter(cache => {
  //      return cache.career.indexOf(value) > -1
  //    });
  //  } else {
  //    this.grades = [].concat(this.gradesCached);
  //  }
  //}

  goToGrade(grade) {
    if (grade) {
      let modal = this.modalCtrl.create(GradoMedioPage, {data: {...grade, type: 'fp_medio', index: grade.id}, dimensionData: this.dimensions});
      modal.onDidDismiss(() => {
        modal = null;
      })
      modal.present();
    }
  }
}

