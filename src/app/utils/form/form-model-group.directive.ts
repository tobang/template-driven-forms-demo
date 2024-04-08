/* eslint-disable @angular-eslint/directive-selector */
import { Directive, inject } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

import { FormDirective } from './form.directive';
import { getFormGroupFieldName } from './form.utils';
import { createVestValidator } from './vest';

// This directive's selector targets the Angular Template Driven ngModelGroup directive and extends it
// with validation features by implementing Angulars Validator interface.
@Directive({
  selector: '[ngModelGroup]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: FormModelGroupDirective,
      multi: true,
    },
  ],
})
export class FormModelGroupDirective implements Validator {
  private readonly formDirective = inject(FormDirective);

  public validate(control: AbstractControl): ValidationErrors | null {
    const { ngForm, suite, model } = this.formDirective;
    if (!suite || !model) {
      throw new Error('Validation suite or model is missing');
    }
    const fieldName = getFormGroupFieldName(ngForm.control, control);

    const validatorFn = createVestValidator(
      fieldName,
      this.formDirective.model,
      suite
    );
    return validatorFn(control);
  }
}
