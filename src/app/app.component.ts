/**
 * Challenge:
 *
 * Create an observable stream that emits numbers incrementally every second, starting from 0.
 * 
 * Create an observable stream that emits the letters a-e.
 * 
 * Then take the first 5 emitted numbers only.
 *
 * Then for each value emitted by the letters observable, take only the last value of the letters observable stream (i.e. 'e')
 * and 'switch' the observable that you want this value to be passed into.
 * i.e. switch the letters observable for the numbers observable, and pass the letter 'e' into the numbers observable.
 * The numbers observable will emit five incremental numbers and combine it with the letter 'e' each time in the form ${number}${letter}.
 * These values will be emitted each second.
 * 
 * Log the final emitted values to the console.
 *
 */

import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
/**
 * import 'interval' and `add` it to the `Observable` prototype
 * N.B. use the `/add/` folder to only pull in that method to reduce the overall bundle size
 * see https://www.learnrxjs.io/concepts/operator-imports.html
 */
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/switchMap';
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

    /**
     * `switchMap` - Take the last emitted letter, and then switch from the letters observable to the numbers observable.
     * The numbers observable will now be the observable that you will be using for each emitted letter.
     * We now have access to the last letter emitted in our numbers observable.
     * We can then create a new observable combining the last letter with each number.
     * 
     * `switchMap` vs `mergeMap`:
     * `switchMap`:
     * - takes the last emitted value of the observable you called it on, not all of the values.
     * - We subscribe to the inner observable (the output of the mapping function passed to `switchMap`).
     * Then we unsubscribe from the letters observable 
     * 
     * One value (i.e. the last value) will been emitted from the observable you are calling `switchMap` on.
     * We will then switch to using a different observable, and unsubscribe from the observable you called `switchMap` on.
     * 
     */
    this.letters$.switchMap((letter) => {
      /** 
       * N.B. Callback function needs to return an observable for switchMap
       * - You need to return the observable that you are switching into.
       */
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
