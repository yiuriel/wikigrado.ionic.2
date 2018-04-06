import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { TestQuestionsProvider } from '../../providers/test-questions/test-questions';
import { AnalyticsProvider } from '../../providers/analytics/analytics';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private testService: TestQuestionsProvider, public toastCtrl: ToastController, public tracker: AnalyticsProvider) {
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
    this.nextButtonDisable[index] = (this.testAnswers[index].filter(obj => obj.value.toString() === "1").length > 2) ? "disabled" : "";

    if (this.nextButtonDisable[index] === "disabled" && !this.toast) {
      this.showToast();
    }

    const questionsAnswered = this.getAnsweredLength(this.testAnswers);
    this.updateQuestionsAnsweredData(questionsAnswered.length);
  }

  showToast() {
    this.toast = this.toastCtrl.create({
      message: 'Solo puedes elegir "Si" 2 (dos) veces por pantalla',
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
    const first_orieantation = Object.keys(repetitions).reduce((a, b) => repetitions[a] > repetitions[b] ? a : b);
    delete repetitions[first_orieantation];
    const second_orieantation = Object.keys(repetitions).reduce((a, b) => repetitions[a] > repetitions[b] ? a : b);
    delete repetitions[second_orieantation];
    console.warn(first_orieantation, second_orieantation, types, repetitions);
    alert("orientaciones: " + first_orieantation + " y " + second_orieantation);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
    this.tracker.trackView('vista del test')
  }

}
