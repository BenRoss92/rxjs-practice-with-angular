/**
 * Challenge:
 * 
 * Emit the values 1, 2 and 3. The second subscriber currently only gets values 2 and 3. 
 * Allow the second subscriber to receive all of the emitted values (1, 2 and 3).
 * 
 * Should log the following to the console:
 * first subscriber: 1
 * first subscriber: 2
 * second subscriber: 1
 * second subscriber: 2
 * first subscriber: 3
 * second subscriber: 3
 */

import { Component } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

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
     * Even after completing, a `ReplaySubject` will save all of the emitted values and replay them to each of its subscribers.
     */
    this.subscriber$ = new ReplaySubject();

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

    this.subscriber$.next(3);
  }

  ngOnDestroy() {
    this.subscriber$.unsubscribe();
  }
}
