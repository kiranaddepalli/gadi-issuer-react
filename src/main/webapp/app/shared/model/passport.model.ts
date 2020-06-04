import { Moment } from 'moment';
import { IGender } from 'app/shared/model/gender.model';
import { ICountry } from 'app/shared/model/country.model';
import { IImageContent } from 'app/shared/model/image-content.model';

export interface IPassport {
  id?: number;
  name?: string;
  identifier?: string;
  issuerIdentifier?: string;
  issueDate?: string;
  expirationDate?: string;
  classCode?: string;
  birthDate?: string;
  heightFeet?: number;
  heightInches?: number;
  active?: boolean;
  createdBy?: string;
  createdDate?: string;
  updatedBy?: string;
  updatedDate?: string;
  gender?: IGender;
  nationality?: ICountry;
  holderImage?: IImageContent;
}

export const defaultValue: Readonly<IPassport> = {
  active: false,
};
