/**
 * Challenge:
 *
 * Create an observable stream that emits numbers incrementally every second, starting from 0.
 * 
 * Create an observable stream that emits the letters a-e.
 * 
 * Then take the first 5 emitted numbers only.
 *
 * Then each second, combine the number value with each letter
 * - have the letter observable emit all letters every second
 * - combine the two observable streams - that way we will emit multiple letters every time a number is emitted.
 * 
 * Log the final emitted values to the console.
 *
 */

import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
/**
 * import 'interval' and `add` it to Observable's prototype
 * N.B. use the `/add/` folder to only pull in that method to reduce the overall bundle size
 * see https://www.learnrxjs.io/concepts/operator-imports.html
 */
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  numbers$;
  letters$;

  ngOnInit() {
    // Creates an observable stream that emits values incrementally every second, starting from 0
    this.numbers$ = Observable.interval(1000);
    // Creates an observable stream that emits the letters a-e in sequence
    this.letters$ = Observable.of('a', 'b', 'c', 'd', 'e');

    // Creates and returns a new observable that merges the emitted values from the letters and numbers observables
    // Merges the emitted values from the letters observable into the numbers observable to emit all letters every second
    this.letters$.mergeMap((letter) => {
      // N.B. Callback function needs to return an observable for mergeMap
      return this.numbers$
        .take(5)
        .map(number => number + letter);
    })
    // immediately subscribe to the new returned observable
    // N.B. Make sure you only subscribe to the resulting values after they have been through the operators
    .subscribe(value => console.log(value));
  }

  ngOnDestroy() {
    // unsubscribe from the `numbers$` and `letters$` streams when the component is destroyed to avoid a memory leak
    this.numbers$.unsubscribe();
    this.letters$.unsubscribe();
  }
}
