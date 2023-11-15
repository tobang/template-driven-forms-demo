import { AddressModel } from './address.model';

export type FormModel = Partial<{
  firstName: string;
  lastName: string;
  addresses: {
    homeAddress: AddressModel;
    workAddress: AddressModel;
    includeWorkAddress: boolean;
  };
}>;
