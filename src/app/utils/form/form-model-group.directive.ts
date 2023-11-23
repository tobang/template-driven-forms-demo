import { Directive, inject } from '@angular/core';
import {
  AbstractControl,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { FormZodDirective } from './zod/form-zod.directive';
import { createAsyncZodValidator, getFormGroupField } from './form.utils';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngModelGroup]',
  standalone: true,
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: FormModelGroupDirective,
      multi: true,
    },
  ],
})
export class FormModelGroupDirective implements Validator {
  private readonly formDirective = inject(FormZodDirective);

  public validate(control: AbstractControl): ValidationErrors | null {
    const { ngForm, schema } = this.formDirective;

    const field = getFormGroupField(ngForm.control, control);
    const validatorFn = createAsyncZodValidator(
      field,
      this.formDirective.model,
      schema
    );

    return validatorFn(control);
  }
}
