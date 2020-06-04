import { Moment } from 'moment';
import { IAddress } from 'app/shared/model/address.model';
import { IGender } from 'app/shared/model/gender.model';
import { IEyeColor } from 'app/shared/model/eye-color.model';
import { IHairColor } from 'app/shared/model/hair-color.model';
import { IRace } from 'app/shared/model/race.model';
import { IState } from 'app/shared/model/state.model';
import { ICountry } from 'app/shared/model/country.model';
import { IImageContent } from 'app/shared/model/image-content.model';

export interface IDriverLicense {
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
  address?: IAddress;
  gender?: IGender;
  eyeColor?: IEyeColor;
  hairColor?: IHairColor;
  race?: IRace;
  issuingState?: IState;
  issuingCountry?: ICountry;
  holderImage?: IImageContent;
}

export const defaultValue: Readonly<IDriverLicense> = {
  active: false,
};
