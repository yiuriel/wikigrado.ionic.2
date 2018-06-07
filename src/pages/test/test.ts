import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OrientationVideosAfterTestPage } from '../orientation-videos-after-test/orientation-videos-after-test';
import { TestQuestionsProvider } from '../../providers/test-questions/test-questions';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { UserProvider } from '../../providers/user/user';
import { TestStorageProvider } from '../../providers/test-storage/test-storage';
import { LoaderProvider } from '../../providers/loader/loader';
import { ToasterProvider } from '../../providers/toaster/toaster';

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
  questionsPageData: string;
  questionsAnsweredData: string;
  userData: any;
  orientations: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserProvider, private testService: TestQuestionsProvider, public toasterService: ToasterProvider, public tracker: AnalyticsProvider, public loaderService: LoaderProvider, public testStorageService: TestStorageProvider) {
    this.activeCardIndex = 0;
    this.testQuestions = this.testService.getQuestions();
    this.testProgress = 0;
    this.testAnswers = [];
    this.nextButtonDisable = [];
    this.orientations = [];
    this.updateQuestionsPageData();
    this.updateQuestionsAnsweredData(0);
    this.userService.getUserData((data, error) => {
      if (!error) {
        this.userData = data;
      }
    })
  }

  answerSelect(index, subindex, answer) {
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
    this.nextButtonDisable[index] = "";

    // if (this.nextButtonDisable[index] === "disabled") {
    //   this.toasterService.showToast({message: 'Solo puedes elegir "Si" 3 (tres) veces por pantalla'});
    // }

    const questionsAnswered = this.getAnsweredLength(this.testAnswers);
    this.updateQuestionsAnsweredData(questionsAnswered.length);
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

    this.getOrientations(repetitions);

    this.loaderService.showLoader({content:'obteniendo el resultado del test...'});
    const orientations = this.orientations.join(",");
    this.userService.updateUserOrientations(
      orientations,
      (success, error) => {
        this.loaderService.hideLoader();
        if (!error) {
          this.userService.setUserData(success, (ok, userDataError) => {
            if (!userDataError) {
              this.testStorageService.setTestDone(true, (value, error) => {
                if (!error) {
                  this.navCtrl.setRoot(OrientationVideosAfterTestPage, {animate: true});
                }
              })
              this.trackOrientations();
            } else {
              this.toasterService.showToast({message: 'Hubo un error, vuelve a intentarlo más tarde.'});
            }
          })
        } else {
          this.toasterService.showToast({message: 'Hubo un error, vuelve a intentarlo más tarde.'});
        }
      }
    );
  }

  ionViewWillLeave() {
    if (this.testProgress < 100) {
      this.tracker.trackEvent('test de orientacion', 'sin resultados', 'salir del test');
    }
  }

  getOrientations(repetitions) {
    const orientation = this.getMaxOrientation(repetitions);
    this.orientations.push(orientation.orientation);

    const second_orientation = this.getMaxOrientation(repetitions);
    this.orientations.push(second_orientation.orientation);

    const third_orientation = this.getMaxOrientation(repetitions);
    if (third_orientation.number === second_orientation.number) {
      this.orientations.push(third_orientation.orientation);
      const forth_orientation = this.getMaxOrientation(repetitions);
      if (forth_orientation.number === third_orientation.number) {
        this.orientations.push(forth_orientation.orientation);
        const fifth_orientation = this.getMaxOrientation(repetitions);
        if (fifth_orientation.number === forth_orientation.number) {
          this.orientations.push(fifth_orientation.orientation);
        }
      }
    }
  }

  getMaxOrientation(repetitions) {
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
    this.tracker.trackView('vista del test');
  }

  trackOrientations() {
    this.orientations.forEach((orientation, i) => {
      this.tracker.trackEvent('test de orientacion', 'resultado ' + i, orientation);
    });
  }

}
