/* eslint-disable @angular-eslint/directive-selector */
import { Directive, inject, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { debounceTime, Observable } from 'rxjs';

import { z } from 'zod';

@Directive({
  selector: 'form[model][schema]',
  standalone: true,
})
export class FormZodDirective<T> {
  @Input() public model!: T;
  @Input() public schema!: z.ZodTypeAny;
  public readonly ngForm = inject(NgForm, { self: true });
  @Output() formValueChange: Observable<T> = this.ngForm.form.valueChanges.pipe(
    debounceTime(0)
  );

  constructor() {
    this.ngForm.ngSubmit.pipe(takeUntilDestroyed()).subscribe(() => {
      this.ngForm.form.markAllAsTouched();
    });
  }
}
