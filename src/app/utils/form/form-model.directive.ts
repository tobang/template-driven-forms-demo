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
import { createAsyncZodValidator } from './zod';
import { createAsyncVestValidator } from './vest';
import { isSuite } from './models';

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
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    // Get form and schema from the parent form directive
    const { ngForm, schema } = this.formDirective;
    // Get the name of the that this validator is attached to
    const fieldName = getFormControlFieldName(ngForm.control, control);

    // Because we can have either a Vest or Zod validator
    // We check to see what type it is. Usually there would only be one.
    if (isSuite(schema)) {
      // This calls a utility function that takes care of
      // creating the validator that tests if the model passes or fails
      const validatorFn = createAsyncVestValidator(
        fieldName,
        this.formDirective.model,
        schema
      );
      return validatorFn(control);
    } else {
      // The exact same thing for zod
      const validatorFn = createAsyncZodValidator(
        fieldName,
        this.formDirective.model,
        schema
      );
      return validatorFn(control);
    }
  }
}
