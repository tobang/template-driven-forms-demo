import { create, enforce, omitWhen, only, test } from 'vest';

import { addressValidations } from './address.validation';
import { SignupModel } from '../../models/signup.model';
// Strong typing
export type FieldName = keyof SignupModel;
export type GroupName = 'addresses';
export type Callback = (data: SignupModel, field: string) => void;


export const createSignupValidationSuite = () => {
  return create((model: SignupModel, field: string) => {
    only(field);

    test('firstName', 'First name is required', () => {
      enforce(model.firstName).isNotBlank();
    });

    test('lastName', 'Last name is required', () => {
      enforce(model.lastName).isNotBlank();
    });

    test('age', 'Age is required', () => {
      enforce(model.age).isNotBlank();
    });

    test('age', 'Age must be a number', () => {
      enforce(model.age).isNumeric();
    });

    test('age', 'You must be 10 years old', () => {
      enforce(model.age).greaterThan(9);
    });

    omitWhen((model.age ?? 0) > 17 || (model.age ?? 0) < 10, () => {
      test('parentEmail', 'Parent email is required', () => {
        enforce(model.parentEmail).isNotBlank();
      });
      test('parentEmail', 'Email address must be valid', () => {
        enforce(model.parentEmail).matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        );
      });
    });

    addressValidations(model.addresses?.homeAddress, 'addresses.homeAddress');
    omitWhen(!model.addresses?.includeWorkAddress, () => {
      addressValidations(model.addresses?.workAddress, 'addresses.workAddress');
    });
  });
};
