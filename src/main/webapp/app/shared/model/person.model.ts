import { Moment } from 'moment';
import { IAddress } from 'app/shared/model/address.model';
import { IPhoneNumber } from 'app/shared/model/phone-number.model';
import { IEmail } from 'app/shared/model/email.model';

export interface IPerson {
  id?: number;
  name?: string;
  identifier?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  active?: boolean;
  createdBy?: string;
  createdDate?: string;
  updatedBy?: string;
  updatedDate?: string;
  address?: IAddress;
  homePhone?: IPhoneNumber;
  workPhone?: IPhoneNumber;
  mobilePhone?: IPhoneNumber;
  email?: IEmail;
}

export const defaultValue: Readonly<IPerson> = {
  active: false,
};
