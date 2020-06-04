import { Moment } from 'moment';

export interface IGender {
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

export const defaultValue: Readonly<IGender> = {
  defaultValue: false,
  active: false,
};
