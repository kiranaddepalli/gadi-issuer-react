import { Moment } from 'moment';
import { IImageType } from 'app/shared/model/image-type.model';

export interface IImageContent {
  id?: number;
  name?: string;
  external?: boolean;
  imageUrl?: string;
  size?: number;
  keywords?: string;
  contentContentType?: string;
  content?: any;
  active?: boolean;
  createdBy?: string;
  createdDate?: string;
  updatedBy?: string;
  updatedDate?: string;
  imageType?: IImageType;
}

export const defaultValue: Readonly<IImageContent> = {
  external: false,
  active: false,
};
