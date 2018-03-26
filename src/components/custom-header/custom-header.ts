import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PretestPage } from '../../pages/pretest/pretest'

@Component({
  selector: '[customheader]',
  templateUrl: 'custom-header.html'
})
export class CustomHeaderComponent {

  @Input('header-title') headerTitle;
  @Input('remove-header-icon') removeHeaderIcon;

  text: string;

  constructor(public navCtrl: NavController) {
    console.log('Hello CustomHeaderComponent Component');
    // this.text = 'Hello World';
  }

  backToPretest() {
    this.navCtrl.setRoot(PretestPage, {}, {animate: true});
  }

}
