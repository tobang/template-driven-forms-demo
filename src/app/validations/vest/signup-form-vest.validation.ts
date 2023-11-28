import { create, enforce, omitWhen, only, test } from 'vest';

import { addressValidations } from './address.validation';
import { SignupModel } from '../../models/signup.model';

export const createSignupValidationSuite = () => {
  // Strong typing
  /*  type FieldName = keyof ContactModel;
  type GroupName = 'addresses';
  type Callback = (data: ContactModel, field: string) => void; */

  return create((model: SignupModel, field: string) => {
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
