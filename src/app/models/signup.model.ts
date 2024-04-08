import { AddressModel } from './address.model';
import { PhonenumberModel } from './phone-number.model';

export type SignupModel = {
  firstName?: string;
  lastName?: string;
  userName?: string;
  age?: number;
  parentEmail?: string;
  phoneNumbers?: PhonenumberModel;
  addresses?: {
    homeAddress?: AddressModel;
    workAddress?: AddressModel;
    includeWorkAddress?: boolean;
  };
};
