/**
 * Challenge:
 *
 * Create an observable stream that emits values incrementally every second, starting from 0.
 * 
 * Then take the first 5 emitted values only.
 *
 * Then create another observable stream from this previous stream that emits those values multiplied by 10.
 *
 */

import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
/**
 * import 'interval' and `add` it to Observable's prototype
 * N.B. use the `/add/` folder to only pull in that method to reduce the overall bundle size
 * see https://www.learnrxjs.io/concepts/operator-imports.html
 */
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  numbers$;

  ngOnInit() {
    // Creates an observable stream that emits values incrementally every second, starting from 0
    this.numbers$ = Observable.interval(1000);

    // creates a new observable stream, taking the first 5 emitted values only.
    this.numbers$
      .take(5)
      // creates a new observable stream that multiplies each emitted value by 10.
      .map((number) => number * 10)

      // subscribe to the `numbers$` observable for when it will emit values
      .subscribe(
        // onNext handler - each time a value is emitted to the stream, log it to the console
        number => console.log(number),
        // onError handler - if an error is emitted, log it to the console
        err => console.error(err),
        // onCompletion handler - when stream has completed, log out a completion message to the console
        () => console.log('stream has completed!')
      );

  }

  ngOnDestroy() {
    // unsubscribe from the `numbers$` stream when the component is destroyed to avoid a memory leak
    this.numbers$.unsubscribe();
  }
}
