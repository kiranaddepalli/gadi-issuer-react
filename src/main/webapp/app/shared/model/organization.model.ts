import { Moment } from 'moment';
import { IPartyRole } from 'app/shared/model/party-role.model';
import { IState } from 'app/shared/model/state.model';
import { ICountry } from 'app/shared/model/country.model';
import { IAddress } from 'app/shared/model/address.model';
import { IPhoneNumber } from 'app/shared/model/phone-number.model';

export interface IOrganization {
  id?: number;
  name?: string;
  identifier?: string;
  businessName?: string;
  dbaName?: string;
  fein?: string;
  startDate?: string;
  active?: boolean;
  createdBy?: string;
  createdDate?: string;
  updatedBy?: string;
  updatedDate?: string;
  partyRole?: IPartyRole;
  incorporatedState?: IState;
  country?: ICountry;
  address?: IAddress;
  mainPhone?: IPhoneNumber;
  secondaryPhone?: IPhoneNumber;
}

export const defaultValue: Readonly<IOrganization> = {
  active: false,
};
