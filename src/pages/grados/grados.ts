import { Component, ElementRef } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { GradoPage } from '../grado/grado';
import { AllAppDataProvider } from '../../providers/all-app-data/all-app-data';
import { AnalyticsProvider } from '../../providers/analytics/analytics';

@Component({
  selector: 'page-grados',
  templateUrl: 'grados.html',
})
export class GradosPage {

  grades: Array<{[key: string]: any}>
  gradesCached: Array<{[key: string]: any}>
  dimensions: {width: number, height: number}

  constructor(public navCtrl: NavController, public tracker: AnalyticsProvider, public navParams: NavParams, public modalCtrl: ModalController, public allAppDataService :AllAppDataProvider, private domElem: ElementRef, public loadingCtrl: LoadingController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad GradosPage');
  }

  ionViewDidEnter() {
    let width = this.domElem.nativeElement.offsetWidth - 32;
    this.dimensions = {
      width: width,
      height: (width * 9) / 16,
    }

    this.getAllGrades();
  }

  getAllGrades() {
    this.grades = this.allAppDataService.get('grades');
    this.gradesCached = [].concat(this.grades);
  }

  filterGrades($event) {
    const value = $event.value;
    if (value) {
      this.grades = this.gradesCached.filter(cache => {
        return cache.grade.toLowerCase().indexOf(value.toLowerCase()) > -1
      });
    } else {
      this.grades = [].concat(this.gradesCached);
    }
  }

  goToGrade(grade) {
    if (grade) {
      let gradeWithUnivs = this.allAppDataService.getGradeWithUniversities(grade);
      let modal = this.modalCtrl.create(GradoPage, {data: {...gradeWithUnivs, type: 'grades', index: gradeWithUnivs.id}, dimensionData: this.dimensions});
      modal.onDidDismiss(() => {
        modal = null;
      })
      modal.present();
    }
  }

}
