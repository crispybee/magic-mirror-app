import { Component } from '@angular/core';

/*
  Generated class for the MirrorGrid component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'mirror-grid',
  templateUrl: 'mirror-grid.html'
})
export class MirrorGridComponent {

  text: string;

  constructor() {
    console.log('Hello MirrorGrid Component');
    this.text = 'Hello World';
  }

}
