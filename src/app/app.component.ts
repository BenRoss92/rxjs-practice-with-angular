/**
 * Challenge:
 * 
 * Get the second subscriber to receive values 2 and 3, without changing any positioning of the code
 * And get the first subscriber to receive the value 200 before any other values
 * 
 * Log the following to the console:
 * first subscriber: 200
 * first subscriber: 1
 * first subscriber: 2
 * second subscriber: 2
 * first subscriber: 3
 * second subscriber: 3
 */

import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  subscriber$;

  ngOnInit() {
    /**
     * BehaviorSubject (weird American spelling) requires a starting value
     * The first emitted value will be 200
     */
    this.subscriber$ = new BehaviorSubject(200);

    this.subscriber$.subscribe(
      value => console.log('first subscriber:', value),
      err => console.log(err),
      () => console.log('first subscriber:', 'completed!'),
    );

    this.subscriber$.next(1);
    this.subscriber$.next(2);

    this.subscriber$.subscribe(
      value => console.log('second subscriber:', value),
      err => console.log(err),
      () => console.log('second subscriber:', 'completed!'),
    );

    /** 
     * As soon as we create our second subscription,
     * we want to subscribe to to not only new values being emitted after subscription,
     * but also the last value that was emitted before we started subscribing (in this case, the value 2)
     */
    this.subscriber$.next(3);
  }

  ngOnDestroy() {
    this.subscriber$.unsubscribe();
  }
}
