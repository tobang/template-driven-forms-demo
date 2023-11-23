import { enforce, test } from 'vest';

import { AddressModel } from '../../models/address.model';

export function addressValidations(
  model: AddressModel | undefined,
  field: string
): void {
  test(`${field}.street`, 'Street is required', () => {
    enforce(model?.street).isNotBlank();
  });
  test(`${field}.city`, 'City is required', () => {
    enforce(model?.city).isNotBlank();
  });
  test(`${field}.zipcode`, 'Zip code is required', () => {
    enforce(model?.zipcode).isNotBlank();
  });

  test(`${field}.zipcode`, 'Zip code not valid', () => {
    enforce(model?.zipcode).matches(/^\d{4}$/);
  });
}
