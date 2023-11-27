import { AbstractControl, AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { set } from 'radash';
import { Observable } from 'rxjs';
import { Suite, SuiteResult } from 'vest';

/**
 * Creates an Angular ValidatorFn that uses a Vest suite behind the scenes
 * @param field
 * @param model
 * @param suite
 */
export function createVestValidator<T>(
  field: string,
  model: T,
  suite: (model: T, field: string) => SuiteResult<string, string>
): ValidatorFn {
  return (control: AbstractControl) => {
    const mod = structuredClone(model);
    set(mod as object, field, control.value);
    const result = suite(mod, field);
    const errors = result.getErrors()[field];
    return errors ? { error: errors[0], errors } : null;
  };
}

/**
 * Creates an Angular AsyncValidatorFn that uses a Vest suite behind the scenes
 * @param field
 * @param model
 * @param suite
 */
export function createAsyncVestValidator<T>(
  field: string,
  model: T,
  suite: Suite<string, string, (model: T, field: string) => void>
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const mod = structuredClone(model);
    const modUpdated = set(mod as object, field, control.value) as T;
    return new Observable((observer) => {
      suite(modUpdated, field).done((result) => {
        const errors = result.getErrors()[field];
        observer.next(errors ? { error: errors[0], errors } : null);
        observer.complete();
      });
    });
  };
}
