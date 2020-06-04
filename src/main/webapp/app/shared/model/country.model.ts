import { Moment } from 'moment';
import { IState } from 'app/shared/model/state.model';

export interface ICountry {
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
  state?: IState;
}

export const defaultValue: Readonly<ICountry> = {
  defaultValue: false,
  active: false,
};
