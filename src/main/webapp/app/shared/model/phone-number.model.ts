import { Moment } from 'moment';
import { IPhoneType } from 'app/shared/model/phone-type.model';

export interface IPhoneNumber {
  id?: number;
  countryCode?: number;
  areaCode?: number;
  phoneNumber?: string;
  extension?: number;
  active?: boolean;
  createdBy?: string;
  createdDate?: string;
  updatedBy?: string;
  updatedDate?: string;
  phoneType?: IPhoneType;
}

export const defaultValue: Readonly<IPhoneNumber> = {
  active: false,
};
