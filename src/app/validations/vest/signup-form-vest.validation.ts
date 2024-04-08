import { enforce, omitWhen, only, staticSuite, test } from 'vest';

import { addressValidations } from './address.validation';
import { SignupModel } from '../../models/signup.model';
import { phonenumberValidations } from './phone-number.validation';
// Strong typing
export type FieldNames = keyof SignupModel;

export const createSignupValidationSuite = () => {
  return staticSuite((model: SignupModel, field: string) => {
    only(field);

    test<FieldNames>('firstName', 'First name is required', () => {
      enforce(model.firstName).isNotBlank();
    });

    test<FieldNames>('lastName', 'Last name is required', () => {
      enforce(model.lastName).isNotBlank();
    });

    test<FieldNames>('age', 'Age is required', () => {
      enforce(model.age).isNotBlank();
    });

    test<FieldNames>('age', 'Age must be a number', () => {
      enforce(model.age).isNumeric();
    });

    test<FieldNames>('age', 'You must be 10 years old', () => {
      enforce(model.age).greaterThan(9);
    });

    omitWhen((model.age ?? 0) > 17 || (model.age ?? 0) < 10, () => {
      test<FieldNames>('parentEmail', 'Parent email is required', () => {
        enforce(model.parentEmail).isNotBlank();
      });
      test<FieldNames>('parentEmail', 'Email address must be valid', () => {
        enforce(model.parentEmail).matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        );
      });
    });

    addressValidations(model.addresses?.homeAddress, 'addresses.homeAddress');
    omitWhen(!model.addresses?.includeWorkAddress, () => {
      addressValidations(model.addresses?.workAddress, 'addresses.workAddress');
    });
    phonenumberValidations(model?.phoneNumbers, 'phoneNumbers');
  });
};
