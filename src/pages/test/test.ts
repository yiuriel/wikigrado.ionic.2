import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { OrientationVideosAfterTestPage } from '../orientation-videos-after-test/orientation-videos-after-test';
import { TestQuestionsProvider } from '../../providers/test-questions/test-questions';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { UserProvider } from '../../providers/user/user';
import { TestStorageProvider } from '../../providers/test-storage/test-storage';

@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

  activeCardIndex: number;
  testQuestions: Array<Array<{question: string, answers:Array<{value: string, name: string}>}>>;
  testAnswers: Array<Array<{[key: string]: any}>>;
  testProgress: number;
  nextButtonDisable: Array<string>;
  toast: any;
  questionsPageData: string;
  questionsAnsweredData: string;
  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserProvider, private testService: TestQuestionsProvider, public toastCtrl: ToastController, public tracker: AnalyticsProvider, public loadingCtrl: LoadingController, public testStorageService: TestStorageProvider) {
    this.activeCardIndex = 0;
    this.testQuestions = this.testService.getQuestions();
    this.testProgress = 0;
    this.testAnswers = [];
    this.nextButtonDisable = [];
    this.updateQuestionsPageData();
    this.updateQuestionsAnsweredData(0);
  }

  answerSelect(index, subindex, answer) {
    // this.tracker.trackEvent('test page', this.tracker.CLICK_ACTION, this.testQuestions[index][subindex].question, answer)
    this.updateTest(index, subindex, answer);
  }

  handleActiveIndex(move) {
    this.activeCardIndex += move;
    this.updateQuestionsPageData();
  }

  updateTest(index, subindex, answer) {
    if (!this.testAnswers[index]) {
      this.testAnswers[index] = [];
    }
    this.testAnswers[index][subindex] = {value: answer.value, type: answer.type};
    this.testProgress = this.updateProgress(this.testAnswers);
    this.nextButtonDisable[index] = (this.testAnswers[index].filter(obj => obj.value.toString() === "1").length > 3) ? "disabled" : "";

    if (this.nextButtonDisable[index] === "disabled" && !this.toast) {
      this.showToast();
    }

    const questionsAnswered = this.getAnsweredLength(this.testAnswers);
    this.updateQuestionsAnsweredData(questionsAnswered.length);
  }

  showToast() {
    this.toast = this.toastCtrl.create({
      message: 'Solo puedes elegir "Si" 3 (tres) veces por pantalla',
      duration: 5000,
      position: 'middle',
      showCloseButton: true
    });
    this.toast.present();
    this.toast.onDidDismiss(() => {
      this.toast = null;
    });
  }

  showErrorToast() {
    this.toast = this.toastCtrl.create({
      message: 'Hubo un error, vuelve a intentarlo mas tarde',
      duration: 5000,
      position: 'middle',
      showCloseButton: true
    });
    this.toast.present();
    this.toast.onDidDismiss(() => {
      this.toast = null;
    });
  }

  updateProgress(values) {
    var merged = this.getAnsweredLength(values);
    return (merged.length * 100) / this.testService.getTotalLength()
  }

  getAnsweredLength(values) {
    return [].concat.apply([], values).filter(obj => obj.value);
  }

  updateQuestionsPageData() {
    this.questionsPageData = "Pagina " + (this.activeCardIndex + 1) + " de " + this.testQuestions.length;
  }

  updateQuestionsAnsweredData(questionsAnswered) {
    this.questionsAnsweredData = "Respondiste " + (questionsAnswered) + " de " + this.testService.getTotalLength();
  }

  checkAnswers() {
    const answers = this.getAnsweredLength(this.testAnswers);
    const yesValues = answers.filter(answer => answer.value === "1");
    const types = yesValues.map(obj => obj.type).sort();
    let repetitions = {};
    types.forEach(type => {
      if (!repetitions.hasOwnProperty(type)) {
        repetitions[type] = 0;
      }
      repetitions[type] += 1;
    });

    let first_orientation = this.getOrientation(repetitions);
    let second_orientation = this.getOrientation(repetitions);
    let third_orientation = this.getOrientation(repetitions);

    if ((first_orientation.number > second_orientation.number) || second_orientation.number > third_orientation.number) {
      third_orientation.orientation = null;
    }

    this.showLoader('obteniendo el resultado del test...');
    this.userService.updateUserOrientations(
      {
        first_orientation: first_orientation.orientation,
        second_orientation: second_orientation.orientation,
        third_orientation: third_orientation.orientation
      },
      (success, error) => {
        this.hideLoader();
        if (!error) {
          this.testStorageService.setTestDone(true, (value, error) => {
            if (!error) {
              this.navCtrl.setRoot(OrientationVideosAfterTestPage, {animate: true});
            }
          })
        } else {
          this.showErrorToast();
        }
      })

  }

  getOrientation(repetitions) {
    let keyToRemove = "";
    let min = 0;
    Object.keys(repetitions).forEach((key, index) => {
      if (repetitions[key] > min) {
        min = repetitions[key];
        keyToRemove = key;
      }
    });
    delete repetitions[keyToRemove];
    return {orientation: keyToRemove, number: min};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
    this.tracker.trackView('vista del test')
  }

  showLoader(text) {
    this.loader = this.loadingCtrl.create({
      content: text,
      spinner: 'crescent',
    });

    this.loader.present();
  }

  hideLoader() {
    this.loader.dismiss();
  }

}
