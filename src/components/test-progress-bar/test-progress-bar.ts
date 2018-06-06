import { Component, Input } from '@angular/core';


@Component({
  selector: 'test-progress-bar',
  templateUrl: 'test-progress-bar.html'
})
export class TestProgressBarComponent {
  @Input('progress') progress:number;

  constructor() {
  }

}
