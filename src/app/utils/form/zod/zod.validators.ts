import { ValidatorFn, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { isEmpty, set } from 'radash';
import { Observable } from 'rxjs';
import { z } from 'zod';

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
    const modUpdated = set(mod as object, field, control.value);

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
 * Creates an Angular AsyncValidatorFn that uses a Zod schema behind the scenes
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
    const modUpdated = set(mod as object, field, control.value);

    // TODO: Only run schema on data difference
    // Difference between model and modUpdated
    // Maybe all fields in schema has to be optional?

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
            observer.next({
              error: zodErrorsString[0],
              errors: zodErrorsString,
            });
          }
        } else {
          observer.next(null);
        }
        observer.complete();
      });
    });
  };
}
