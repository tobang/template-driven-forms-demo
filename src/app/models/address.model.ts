import { Zipcode } from '../validations/vest/zip-codes';

export type AddressModel = Partial<{
  country: Zipcode;
  street: string;
  zipcode: string;
  city: string;
}>;
