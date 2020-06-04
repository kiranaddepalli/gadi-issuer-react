import { Moment } from 'moment';

export interface IImageType {
  id?: number;
  name?: string;
  mimeType?: string;
  orderValue?: number;
  defaultValue?: boolean;
  active?: boolean;
  createdBy?: string;
  createdDate?: string;
  updatedBy?: string;
  updatedDate?: string;
}

export const defaultValue: Readonly<IImageType> = {
  defaultValue: false,
  active: false,
};
