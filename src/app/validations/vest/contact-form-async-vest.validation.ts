import { create, enforce, omitWhen, only, test } from 'vest';

import { addressValidations } from './address.validation';
import { ContactModel } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { fromEvent, lastValueFrom, takeUntil } from 'rxjs';

export const createContactAsyncValidationSuite = (
  contactService: ContactService
) => {
  return create((model: ContactModel, field: string) => {
    only(field);

    test('firstName', 'First name is required', () => {
      enforce(model.firstName).isNotBlank();
    });

    test('lastName', 'Last name is required', () => {
      enforce(model.lastName).isNotBlank();
    });

    test('nickName', 'Nick name is required', () => {
      enforce(model.nickName).isNotBlank();
    });

    omitWhen(!model.nickName, () => {
      test('nickName', 'nickName is already taken', async ({ signal }) => {
        await lastValueFrom(
          contactService
            .isNickNameTaken()
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
