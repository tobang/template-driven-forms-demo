import { create, enforce, omitWhen, only, test } from 'vest';

import { addressValidations } from './address.validation';
import { SignupModel } from '../../models/signup.model';
import { SignupService } from '../../services/signup.service';
import { fromEvent, lastValueFrom, takeUntil } from 'rxjs';

export const createSignupAsyncValidationSuite = (
  contactService: SignupService
) => {
  return create((model: SignupModel, field: string) => {
    only(field);

    test('firstName', 'First name is required', () => {
      enforce(model.firstName).isNotBlank();
    });

    test('lastName', 'Last name is required', () => {
      enforce(model.lastName).isNotBlank();
    });

    test('userName', 'User name is required', () => {
      enforce(model.userName).isNotBlank();
    });

    omitWhen(!model.userName, () => {
      test('userName', 'User name is already taken', async ({ signal }) => {
        await lastValueFrom(
          contactService
            .isUserNameTaken()
            .pipe(takeUntil(fromEvent(signal, 'abort')))
        ).then((value) => (value ? Promise.reject() : Promise.resolve()));
      });
    });

    addressValidations(model.addresses?.homeAddress, 'addresses.homeAddress');
    omitWhen(!model.addresses?.includeWorkAddress, () => {
      addressValidations(model.addresses?.workAddress, 'addresses.workAddress');
    });
  });
};
