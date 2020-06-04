import { Moment } from 'moment';

export interface ITitle {
  id?: number;
  name?: string;
  identifier?: string;
  orderValue?: number;
  defaultValue?: boolean;
  active?: boolean;
  createdBy?: string;
  createdDate?: string;
  updatedBy?: string;
  updatedDate?: string;
}

export const defaultValue: Readonly<ITitle> = {
  defaultValue: false,
  active: false,
};
