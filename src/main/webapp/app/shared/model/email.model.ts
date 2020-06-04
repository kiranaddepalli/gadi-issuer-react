import { Moment } from 'moment';
import { IEmailType } from 'app/shared/model/email-type.model';

export interface IEmail {
  id?: number;
  address?: number;
  active?: boolean;
  createdBy?: string;
  createdDate?: string;
  updatedBy?: string;
  updatedDate?: string;
  emailType?: IEmailType;
}

export const defaultValue: Readonly<IEmail> = {
  active: false,
};
