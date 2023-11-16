import { Directive, inject } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { FormDirective } from './form.directive';
import { createZodValidator, getFormGroupField } from './form.utils';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
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
    const { ngForm, schema } = this.formDirective;

    const field = getFormGroupField(ngForm.control, control);
    const validatorFn = createZodValidator(
      field,
      this.formDirective.model,
      schema
    );

    return validatorFn(control);
  }
}
