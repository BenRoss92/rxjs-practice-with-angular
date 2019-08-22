/**
 * How to control an observer/share it between multiple subscribers 
 * 
 * When using an Observable - You cannot share an observer between observables.
 * You can only have one observer per observable, and only one instance of the observable is available.
 * 
 * You can subscribe multiple times to the same observable, but you cannot change what the observer is doing inside each observable.
 * 
 * For multiple observables to change the same observer, you need to use a Subject.
 * A Subject can act as both an observer (emitting values) and a subscriber (subscribing to those values).
 * 
 * Example:
 * 
 * We want two subscribers that will subscribe to different values that are being emitted by one observable stream.
 * 
 * We will be emitting the values 1, 2 and 3 from an observable stream.
 * We want two subscribers:
 * - the first should receive all values - 1, 2 and 3.
 * - The second should only receive value 3 (i.e. after 2 and 3 have been emitted).
 * 
 */

import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  subscriber$;

  ngOnInit() {
    // create an observable
    // N.B. with Subject, do not have to:
    // - create an observable by using `create`
    // - or define a callback function in which to place an observer object
    // when you instantiate a Subject, it creates an observer object that you can then call `next` on, to emit values
    this.subscriber$ = new Subject();

    // create a subscriber that will subscribe to an observer
    // N.B. the subscriber needs to subscribe *before* the observer emits values, to get those emitted values
    // Otherwise it will miss them.
    this.subscriber$.subscribe(
      // handle what happens on next, error and completion
      // log this out to the console
      value => console.log('subscriber 1:', value),
      err => console.log(err),
      () => console.log('subscriber 1:', 'completed!'),
    );

    // the observer should emit the values 1 and 2
    this.subscriber$.next(1);
    this.subscriber$.next(2);

    /**
     * 
     * Don't `complete` an observer when using a `Subject`
     * - Subsequent subscribers to this observer (i.e. the second subscriber) will fail silently.
     * Instead, `unsubscribe` from an observer
     * - will produce an error if another subscriber (i.e. the second subscriber) than tries to subscribe to the observer
     * `unsubscribe` kills the subscribing to the observer, so can't access the observer anymore.
     */
    this.subscriber$.unsubscribe();

    // then create another subscriber that wil subscribe to values after they have been emitted
    // the observer should emit the value 3 - will only be able to subscribe to values after they have been emitted
    this.subscriber$.subscribe(
      value => console.log('subscriber 2:', value),
      err => console.log(err),
      () => console.log('subscriber 2:', 'completed!'),
    );

    this.subscriber$.next(3);
  }

  ngOnDestroy() {
    // make sure that we unsubscribe from our observable to avoid a memory leak.
    // put this in the ngOnDestroy (when component is destroyed), so that we're not listening forever
    // (i.e. after an observable has completed).
    this.subscriber$.unsubscribe();
  }
}
