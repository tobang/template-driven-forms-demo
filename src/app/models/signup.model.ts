import { AddressModel } from './address.model';

export type SignupModel = {
  firstName?: string;
  lastName?: string;
  userName?: string;
  age?: number;
  parentEmail?: string;
  addresses?: {
    homeAddress?: AddressModel;
    workAddress?: AddressModel;
    includeWorkAddress?: boolean;
  };
};
