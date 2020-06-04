import { Moment } from 'moment';

export interface IExperience {
  id?: number;
  name?: string;
  identifier?: string;
  issuerIdentifier?: string;
  issueDate?: string;
  expirationDate?: string;
  title?: string;
  start?: string;
  end?: string;
  active?: boolean;
  createdBy?: string;
  createdDate?: string;
  updatedBy?: string;
  updatedDate?: string;
}

export const defaultValue: Readonly<IExperience> = {
  active: false,
};
