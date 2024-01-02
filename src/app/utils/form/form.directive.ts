/* eslint-disable @angular-eslint/directive-selector */
import { Directive, inject, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { debounceTime, distinctUntilChanged, map, Observable } from 'rxjs';

import { z } from 'zod';
import { Suite } from 'vest';

// This directive's selector targets form elments that have a model and schema property
@Directive({
  selector: 'form[model][schema]',
  standalone: true,
})
export class FormDirective<T> {
  // This is where your model/form value is passed
  @Input() public model!: T;
  // This is your validation schema. Normally there would only be a Zod schema or Vest suite.
  // But as this application is a demo for validation, it accepts both.
  @Input() public schema!:
    | z.ZodTypeAny
    | Suite<string, string, (model: T, field: string) => void>;
  // Inject the NgForm directive and only in this directive injector
  public readonly ngForm = inject(NgForm, { self: true });

  // Each time the value of the injected form changes emit the value
  // debounce to reduce the amount of emissions
  // You can use this on your form element to listen for changes to the form.
  @Output() formValueChange: Observable<T> = this.ngForm.form.valueChanges.pipe(
    debounceTime(0),
    map(() => this.ngForm.form.getRawValue())
  );

  // Emits every time the dirty property of the form changes
  @Output() public readonly dirtyChange = this.ngForm.form.valueChanges.pipe(
    map(() => this.ngForm.dirty),
    distinctUntilChanged()
  );
  // Emits every time the valid property of the form changes
  @Output() public readonly validChange = this.ngForm.form.valueChanges.pipe(
    map(() => this.ngForm.valid),
    distinctUntilChanged()
  );

  constructor() {
    // Get notified when the ngSubmit event fires, so we can
    // mark all controls as touched to show any errors.
    this.ngForm.ngSubmit.pipe(takeUntilDestroyed()).subscribe(() => {
      this.ngForm.form.markAllAsTouched();
    });
  }
}
