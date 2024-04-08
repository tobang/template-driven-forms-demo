import { enforce, omitWhen, test } from 'vest';

import { AddressModel } from '../../models/address.model';
import { zipCodeValidation } from './zip-codes';

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
  test(`${field}.country`, 'Country is required', () => {
    enforce(model?.country).isNotBlank();
  });
  test(`${field}.zipcode`, 'Zip code is required', () => {
    enforce(model?.zipcode).isNotBlank();
  });

  omitWhen(!model?.country, () => {
    zipCodeValidation(
      `${field}.zipcode`,
      model?.zipcode as string,
      model?.country?.Regex as string
    );
  });
}
