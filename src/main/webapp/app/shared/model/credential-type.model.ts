import { Moment } from 'moment';

export interface ICredentialType {
  id?: number;
  name?: string;
  identifier?: string;
  active?: boolean;
  createdBy?: string;
  createdDate?: string;
  updatedBy?: string;
  updatedDate?: string;
}

export const defaultValue: Readonly<ICredentialType> = {
  active: false,
};
