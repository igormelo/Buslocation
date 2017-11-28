import { Component } from '@angular/core';

/**
 * Generated class for the MylocationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'mylocation',
  templateUrl: 'mylocation.html'
})
export class MylocationComponent {

  text: string;

  constructor() {
    console.log('Hello MylocationComponent Component');
    this.text = 'Hello World';
  }

}
