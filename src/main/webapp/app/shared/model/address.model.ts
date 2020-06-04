import { Moment } from 'moment';
import { IState } from 'app/shared/model/state.model';
import { IAddressType } from 'app/shared/model/address-type.model';

export interface IAddress {
  id?: number;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  zipcode?: string;
  latitude?: number;
  longitude?: number;
  active?: boolean;
  createdBy?: string;
  createdDate?: string;
  updatedBy?: string;
  updatedDate?: string;
  state?: IState;
  addressType?: IAddressType;
}

export const defaultValue: Readonly<IAddress> = {
  active: false,
};
