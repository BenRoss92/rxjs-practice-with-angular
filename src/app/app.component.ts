import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  observable$;

  ngOnInit() {
    this.observable$ = Observable.create((observer) => {
      observer.next(1);
      observer.next(2);
      observer.next(3);

      observer.complete();
    });

    this.observable$.subscribe(
      value => console.log(value),
      err => console.error(err),
      () => console.log('completed!')
    );
  }

  ngOnDestroy() {
    this.observable$.unsubscribe();
  }
}
