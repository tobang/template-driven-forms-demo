/* eslint-disable @angular-eslint/directive-selector */
import { Directive, inject } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';

import { Observable } from 'rxjs';

import { FormDirective } from './form.directive';
import { getFormControlFieldName } from './form.utils';
import { createAsyncVestValidator } from './vest';

// This directive's selector targets the Angular Template Driven ngModel directive and extends it
// with validation features by implementing Angulars AsynValidator interface.
@Directive({
  selector: '[ngModel]',
  standalone: true,
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: FormModelDirective,
      multi: true,
    },
  ],
})
export class FormModelDirective implements AsyncValidator {
  // Inject the parent form
  private readonly formDirective = inject(FormDirective);

  // Validate is part of the AsyncValidator interface
  public validate(
    control: AbstractControl
  ): Observable<ValidationErrors | null> | Promise<ValidationErrors | null> {
    // Get form and suite from the parent form directive
    const { ngForm, suite } = this.formDirective;
    // Get the name of the that this validator is attached to
    const fieldName = getFormControlFieldName(ngForm.control, control);

    // This calls a utility function that takes care of
    // creating the validator that tests if the model passes or fails
    const validatorFn = createAsyncVestValidator(
      fieldName,
      this.formDirective.model,
      suite
    );
    return validatorFn(control);
  }
}
