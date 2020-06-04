import { Moment } from 'moment';
import { IPartyRole } from 'app/shared/model/party-role.model';
import { IPartyType } from 'app/shared/model/party-type.model';

export interface IPartyRelationship {
  id?: number;
  fromParty?: number;
  toParty?: string;
  fromDate?: string;
  partyRole?: IPartyRole;
  fromPartyType?: IPartyType;
  toPartyType?: IPartyType;
}

export const defaultValue: Readonly<IPartyRelationship> = {};
