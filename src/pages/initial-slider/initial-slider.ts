import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-initial-slider',
  templateUrl: 'initial-slider.html',
})
export class InitialSliderPage {

  slides: Array<any>

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // this.slides = [
    //   {
    //     title: "Welcome to the Docs!",
    //     description: "The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic.",
    //   },
    //   {
    //     title: "What is Ionic?",
    //     description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
    //   },
    //   {
    //     title: "What is Ionic Cloud?",
    //     description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
    //   }
    // ];
  }

  goToRegisterPage() {
    this.navCtrl.push(RegisterPage)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InitialSliderPage');
  }

}
