import { Directive, inject } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

import { FormDirective } from './form.directive';
import { getFormGroupField } from './form.utils';
import { isSuite } from './models';
import { createZodValidator } from './zod';
import { createVestValidator } from './vest';

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
    const { ngForm, schema, model } = this.formDirective;
    if (!schema || !model) {
      throw new Error('Validation schema or model is missing');
    }
    const field = getFormGroupField(ngForm.control, control);

    if (isSuite(schema)) {
      const validatorFn = createVestValidator(
        field,
        this.formDirective.model,
        schema
      );
      return validatorFn(control);
    } else {
      const validatorFn = createZodValidator(
        field,
        this.formDirective.model,
        schema
      );
      return validatorFn(control);
    }
  }
}
