import { AddressModel } from './address.model';

export type ContactModel = {
  firstName?: string;
  lastName?: string;
  nickName?: string;
  addresses?: {
    homeAddress?: AddressModel;
    workAddress?: AddressModel;
    includeWorkAddress?: boolean;
  };
};
