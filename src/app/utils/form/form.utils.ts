import {
  AbstractControl,
  AsyncValidatorFn,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { isEmpty, set } from 'radash';
import { Observable } from 'rxjs';
import { z } from 'zod';

function getControlPath(
  rootForm: FormGroup,
  controlName: string,
  control: AbstractControl
): string {
  for (const key in rootForm.controls) {
    if (rootForm.controls.hasOwnProperty(key)) {
      const ctrl = rootForm.get(key);
      if (ctrl instanceof FormGroup) {
        const path = getControlPath(ctrl, controlName, control);
        if (path) {
          return key + '.' + path;
        }
      } else if (ctrl === control) {
        return key;
      }
    }
  }
  return '';
}

function getGroupPath(
  formGroup: FormGroup,
  controlName: string,
  control: AbstractControl
): string {
  for (const key in formGroup.controls) {
    if (formGroup.controls.hasOwnProperty(key)) {
      const ctrl = formGroup.get(key);
      if (ctrl === control) {
        return key;
      }
      if (ctrl instanceof FormGroup) {
        const path = getGroupPath(ctrl, controlName, control);
        if (path) {
          return key + '.' + path;
        }
      }
    }
  }
  return '';
}

/**
 * Calculates the name of an abstract control in a form group
 * @param formGroup
 * @param control
 */
function findControlNameInGroup(
  formGroup:
    | { [key: string]: AbstractControl<any, any> }
    | AbstractControl<any, any>[],
  control: AbstractControl
): string {
  return (
    Object.keys(formGroup).find(
      (name: string) => control === control.parent?.get(name)
    ) || ''
  );
}

/**
 * Calculates the field name of a form control: Eg: addresses.shippingAddress.street
 * @param rootForm
 * @param control
 */
export function getFormControlField(
  rootForm: FormGroup,
  control: AbstractControl
): string {
  const parentFormGroup = control.parent?.controls;
  if (!parentFormGroup) {
    throw new Error(
      'An ngModel should always be wrapped in a parent FormGroup'
    );
  }
  const abstractControlName = findControlNameInGroup(parentFormGroup, control);
  return getControlPath(rootForm, abstractControlName, control);
}

/**
 * Calcuates the field name of a form group Eg: addresses.shippingAddress
 * @param rootForm
 * @param control
 */
export function getFormGroupField(
  rootForm: FormGroup,
  control: AbstractControl
): string {
  const parentFormGroup = control.parent?.controls;
  if (!parentFormGroup) {
    throw new Error(
      'An ngModelGroup should always be wrapped in a parent FormGroup'
    );
  }
  const abstractControlName = findControlNameInGroup(parentFormGroup, control);
  return getGroupPath(rootForm, abstractControlName, control);
}

/**
 * Creates an Angular ValidatorFn that uses a Zod schema behind the scenes
 * @param field
 * @param model
 * @param schema
 */
export function createZodValidator<T>(
  field: string,
  model: T,
  schema: z.ZodTypeAny
): ValidatorFn {
  return (control: AbstractControl) => {
    const mod = structuredClone(model);
    const modUpdated = set(mod as object, field, control.value); // Update the property with path

    const resultZod = schema.safeParse(modUpdated);

    if (!resultZod.success) {
      const zodErrors = resultZod.error.errors.filter(
        (issue) => issue.path.join('.') === field
      );

      if (!isEmpty(zodErrors)) {
        const zodErrorsString = zodErrors.reduce((acc: string[], value) => {
          return [...(acc as string[]), value.message];
        }, []);

        return { error: zodErrorsString[0], errors: zodErrorsString };
      }
    }

    return null;
  };
}

/**
 * Creates an Angular ValidatorFn that uses a Zod schema behind the scenes
 * @param field
 * @param model
 * @param schema
 */
export function createAsyncZodValidator<T>(
  field: string,
  model: T,
  schema: z.ZodTypeAny
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const mod = structuredClone(model);
    const modUpdated = set(mod as object, field, control.value); // Update the property with path

    return new Observable((observer) => {
      schema.safeParseAsync(modUpdated).then((resultZod) => {
        if (!resultZod.success) {
          const zodErrors = resultZod.error.errors.filter(
            (issue) => issue.path.join('.') === field
          );
          if (!isEmpty(zodErrors)) {
            const zodErrorsString = zodErrors.reduce((acc: string[], value) => {
              return [...(acc as string[]), value.message];
            }, []);
            console.log('Errors string', zodErrorsString);
            observer.next({
              error: zodErrorsString[0],
              errors: zodErrorsString,
            });
            observer.complete();
          }
        } else {
          observer.next(null);
          observer.complete();
        }
      });
    });
  };
}
