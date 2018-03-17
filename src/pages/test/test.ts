import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

  activeCardIndex: number;
  testQuestions: Array<{question: string, answers:Array<{value: string, name: string}>}>;
  testAnswers: Array<{answer: any}>;
  testProgress: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.activeCardIndex = 0;
    this.testProgress = 0;
    this.testAnswers = [];
    this.testQuestions = [
      {
        question: "Pregunta 1",
        answers: [
          {
            value: "1",
            name: "Respuesta 1"
          },
          {
            value: "2",
            name: "Respuesta 2"
          },
          {
            value: "3",
            name: "Respuesta 3"
          }
        ]
      },
      {
        question: "Pregunta 2",
        answers: [
          {
            value: "4",
            name: "Respuesta 4"
          },
          {
            value: "5",
            name: "Respuesta 5"
          },
          {
            value: "6",
            name: "Respuesta 6"
          }
        ]
      },
      {
        question: "Pregunta 3",
        answers: [
          {
            value: "7",
            name: "Respuesta 7"
          },
          {
            value: "8",
            name: "Respuesta 8"
          },
          {
            value: "9",
            name: "Respuesta 9"
          }
        ]
      },
      {
        question: "Pregunta 4",
        answers: [
          {
            value: "10",
            name: "Respuesta 10"
          },
          {
            value: "11",
            name: "Respuesta 11"
          },
          {
            value: "12",
            name: "Respuesta 12"
          }
        ]
      },
      {
        question: "Pregunta 5",
        answers: [
          {
            value: "13",
            name: "Respuesta 13"
          },
          {
            value: "14",
            name: "Respuesta 14"
          },
          {
            value: "15",
            name: "Respuesta 15"
          }
        ]
      }
    ]
  }

  answerSelect(index, answer) {
    this.testAnswers[index] = answer.value;
    var values = this.testAnswers.filter(answer => answer);
    this.testProgress = (values.length * 100) / this.testQuestions.length;
    console.log(this.testProgress)
  }

  handleActiveIndex(move) {
    this.activeCardIndex += move;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
  }

}
