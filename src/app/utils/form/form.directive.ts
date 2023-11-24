/* eslint-disable @angular-eslint/directive-selector */
import { Directive, inject, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { debounceTime, distinctUntilChanged, map, Observable } from 'rxjs';

import { z } from 'zod';
import { Suite } from 'vest';

@Directive({
  selector: 'form[model][schema]',
  standalone: true,
})
export class FormDirective<T> {
  @Input() public model!: T;
  @Input() public schema!:
    | z.ZodTypeAny
    | Suite<string, string, (model: T, field: string) => void>;

  public readonly ngForm = inject(NgForm, { self: true });

  @Output() formValueChange: Observable<T> = this.ngForm.form.valueChanges.pipe(
    debounceTime(0),
    map(() => this.ngForm.form.getRawValue())
  );

  @Output() public readonly dirtyChange = this.ngForm.form.valueChanges.pipe(
    map(() => this.ngForm.dirty),
    distinctUntilChanged()
  );

  @Output() public readonly validChange = this.ngForm.form.valueChanges.pipe(
    map(() => this.ngForm.valid),
    distinctUntilChanged()
  );

  constructor() {
    this.ngForm.ngSubmit.pipe(takeUntilDestroyed()).subscribe(() => {
      this.ngForm.form.markAllAsTouched();
    });
  }
}
