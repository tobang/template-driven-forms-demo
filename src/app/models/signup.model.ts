import { AddressModel } from './address.model';

export type SignupModel = {
  firstName?: string;
  lastName?: string;
  userName?: string;
  addresses?: {
    homeAddress?: AddressModel;
    workAddress?: AddressModel;
    includeWorkAddress?: boolean;
  };
};
