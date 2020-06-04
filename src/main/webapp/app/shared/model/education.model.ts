import { Moment } from 'moment';
import { ITenureType } from 'app/shared/model/tenure-type.model';

export interface IEducation {
  id?: number;
  name?: string;
  identifier?: string;
  issuerIdentifier?: string;
  issueDate?: string;
  expirationDate?: string;
  completed?: boolean;
  start?: string;
  end?: string;
  active?: boolean;
  createdBy?: string;
  createdDate?: string;
  updatedBy?: string;
  updatedDate?: string;
  tenure?: ITenureType;
}

export const defaultValue: Readonly<IEducation> = {
  completed: false,
  active: false,
};
