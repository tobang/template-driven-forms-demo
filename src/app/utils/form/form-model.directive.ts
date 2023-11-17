import { Directive, inject, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { FormDirective } from './form.directive';
import { createZodValidator, getFormControlField } from './form.utils';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngModel]',
  standalone: true,
  providers: [
    { provide: NG_VALIDATORS, useExisting: FormModelDirective, multi: true },
  ],
})
export class FormModelDirective implements Validator {
  private readonly formDirective = inject(FormDirective);
  private field: string | undefined;

  @Input() public alwaysValidate = false;

  public validate(control: AbstractControl): ValidationErrors | null {
    const { ngForm, schema } = this.formDirective;
    this.field = getFormControlField(ngForm.control, control);

    const validatorFn = createZodValidator(
      this.field,
      this.formDirective.model,
      schema
    );

    return validatorFn(control);
  }
}
