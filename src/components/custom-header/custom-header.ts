import { Component, Input } from '@angular/core';

@Component({
  selector: 'custom-header',
  templateUrl: 'custom-header.html'
})
export class CustomHeaderComponent {

  @Input('header-title') headerTitle;

  text: string;

  constructor() {
    console.log('Hello CustomHeaderComponent Component');
    // this.text = 'Hello World';
  }

}
