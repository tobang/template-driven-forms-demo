import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContactService {
  constructor() {}

  isNickNameTaken(): Observable<boolean> {
    const randomBoolean = Math.random() < 0.5;
    console.log('Random', randomBoolean);
    return of(randomBoolean).pipe(delay(500));
  }
}
