/**
 * Challenge:
 *
 * Create an observable from button click events in the DOM.
 * 
 * Log each click event to the console.
 * 
 */

import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  buttonClick$;

  ngOnInit() {
    const button = document.querySelector('button');
    this.buttonClick$ = Observable.fromEvent(button, 'click');

    this.buttonClick$.subscribe(
      event => console.log(event)
    );
  }

  ngOnDestroy() {
    this.buttonClick$.unsubscribe();
  }
}
