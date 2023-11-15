/* eslint-disable @angular-eslint/directive-selector */
import { Directive, inject, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { debounceTime, map, Observable } from 'rxjs';

@Directive({
  selector: 'form',
  standalone: true,
})
export class FormDirective<T> {
  @Input() public model!: T;
  public readonly ngForm = inject(NgForm, { self: true });
  @Output() formValueChange: Observable<T> = this.ngForm.form.valueChanges.pipe(
    map(
      (value) =>
        ({
          value: value,
          dirty: this.ngForm.form.dirty,
          status: this.ngForm.form.status,
          pristine: this.ngForm.pristine,
        } as T)
    ),
    debounceTime(0)
  );
}
