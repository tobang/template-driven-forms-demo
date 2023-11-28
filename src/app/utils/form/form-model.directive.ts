import {
  Directive,
  inject,
  Input,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
  NgControl,
  ValidationErrors,
} from '@angular/forms';

import { Observable } from 'rxjs';

import { FormDirective } from './form.directive';
import { getFormControlField } from './form.utils';
import { createAsyncZodValidator } from './zod';
import { createAsyncVestValidator } from './vest';
import { isSuite } from './models';

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
  private readonly formDirective = inject(FormDirective);
  private readonly vcr = inject(ViewContainerRef);

  private field: string | undefined;

  @Input() public alwaysValidate = false;

  public validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const { ngForm, schema } = this.formDirective;
    this.field = getFormControlField(ngForm.control, control);

    if (isSuite(schema)) {
      const validatorFn = createAsyncVestValidator(
        this.field,
        this.formDirective.model,
        schema
      );
      return validatorFn(control);
    } else {
      const validatorFn = createAsyncZodValidator(
        this.field,
        this.formDirective.model,
        schema
      );
      return validatorFn(control);
    }
  }
}
