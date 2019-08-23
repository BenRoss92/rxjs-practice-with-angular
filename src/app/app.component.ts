/**
 * Challenge:
 * 
 * Every second, log the values 0-4 to the console, then complete the observable stream.
 * 
 */

import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  numbers$;

  ngOnInit() {
    // create an observable called 'numbers' that will emit incremental values every second
    this.numbers$ = Observable
      .interval(1000)
      // apply an operator to this observable to only emit the first 5 values.
      .take(5);

    // subscribe to this observable and log the emitted values to the console
    this.numbers$.subscribe(
      value => console.log(value),
      err => console.error(err),
      () => console.info('completed'),
    );
  }

  ngOnDestroy() {
    this.numbers$.unsubscribe();
  }
}
