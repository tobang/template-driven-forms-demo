import { create, enforce, omitWhen, only, test } from 'vest';

import { addressValidations } from './address.validation';
import { ContactModel } from '../../models/contact.model';

export const createContactValidationSuite = () => {
  // Strong typing
  /*  type FieldName = keyof ContactModel;
  type GroupName = 'addresses';
  type Callback = (data: ContactModel, field: string) => void; */

  return create((model: ContactModel, field: string) => {
    only(field);

    test('firstName', 'First name is required', () => {
      enforce(model.firstName).isNotBlank();
    });

    test('lastName', 'Last name is required', () => {
      enforce(model.lastName).isNotBlank();
    });

    addressValidations(model.addresses?.homeAddress, 'addresses.homeAddress');
    omitWhen(!model.addresses?.includeWorkAddress, () => {
      addressValidations(model.addresses?.workAddress, 'addresses.workAddress');
    });
  });
};
