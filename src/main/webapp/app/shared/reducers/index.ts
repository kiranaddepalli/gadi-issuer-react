import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import address, {
  AddressState
} from 'app/entities/address/address.reducer';
// prettier-ignore
import phoneNumber, {
  PhoneNumberState
} from 'app/entities/phone-number/phone-number.reducer';
// prettier-ignore
import email, {
  EmailState
} from 'app/entities/email/email.reducer';
// prettier-ignore
import imageContent, {
  ImageContentState
} from 'app/entities/image-content/image-content.reducer';
// prettier-ignore
import organization, {
  OrganizationState
} from 'app/entities/organization/organization.reducer';
// prettier-ignore
import person, {
  PersonState
} from 'app/entities/person/person.reducer';
// prettier-ignore
import partyRelationship, {
  PartyRelationshipState
} from 'app/entities/party-relationship/party-relationship.reducer';
// prettier-ignore
import credentialType, {
  CredentialTypeState
} from 'app/entities/credential-type/credential-type.reducer';
// prettier-ignore
import driverLicense, {
  DriverLicenseState
} from 'app/entities/driver-license/driver-license.reducer';
// prettier-ignore
import passport, {
  PassportState
} from 'app/entities/passport/passport.reducer';
// prettier-ignore
import education, {
  EducationState
} from 'app/entities/education/education.reducer';
// prettier-ignore
import experience, {
  ExperienceState
} from 'app/entities/experience/experience.reducer';
// prettier-ignore
import country, {
  CountryState
} from 'app/entities/country/country.reducer';
// prettier-ignore
import state, {
  StateState
} from 'app/entities/state/state.reducer';
// prettier-ignore
import addressType, {
  AddressTypeState
} from 'app/entities/address-type/address-type.reducer';
// prettier-ignore
import phoneType, {
  PhoneTypeState
} from 'app/entities/phone-type/phone-type.reducer';
// prettier-ignore
import emailType, {
  EmailTypeState
} from 'app/entities/email-type/email-type.reducer';
// prettier-ignore
import partyType, {
  PartyTypeState
} from 'app/entities/party-type/party-type.reducer';
// prettier-ignore
import partyRole, {
  PartyRoleState
} from 'app/entities/party-role/party-role.reducer';
// prettier-ignore
import title, {
  TitleState
} from 'app/entities/title/title.reducer';
// prettier-ignore
import suffix, {
  SuffixState
} from 'app/entities/suffix/suffix.reducer';
// prettier-ignore
import gender, {
  GenderState
} from 'app/entities/gender/gender.reducer';
// prettier-ignore
import eyeColor, {
  EyeColorState
} from 'app/entities/eye-color/eye-color.reducer';
// prettier-ignore
import hairColor, {
  HairColorState
} from 'app/entities/hair-color/hair-color.reducer';
// prettier-ignore
import race, {
  RaceState
} from 'app/entities/race/race.reducer';
// prettier-ignore
import tenureType, {
  TenureTypeState
} from 'app/entities/tenure-type/tenure-type.reducer';
// prettier-ignore
import imageType, {
  ImageTypeState
} from 'app/entities/image-type/image-type.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly address: AddressState;
  readonly phoneNumber: PhoneNumberState;
  readonly email: EmailState;
  readonly imageContent: ImageContentState;
  readonly organization: OrganizationState;
  readonly person: PersonState;
  readonly partyRelationship: PartyRelationshipState;
  readonly credentialType: CredentialTypeState;
  readonly driverLicense: DriverLicenseState;
  readonly passport: PassportState;
  readonly education: EducationState;
  readonly experience: ExperienceState;
  readonly country: CountryState;
  readonly state: StateState;
  readonly addressType: AddressTypeState;
  readonly phoneType: PhoneTypeState;
  readonly emailType: EmailTypeState;
  readonly partyType: PartyTypeState;
  readonly partyRole: PartyRoleState;
  readonly title: TitleState;
  readonly suffix: SuffixState;
  readonly gender: GenderState;
  readonly eyeColor: EyeColorState;
  readonly hairColor: HairColorState;
  readonly race: RaceState;
  readonly tenureType: TenureTypeState;
  readonly imageType: ImageTypeState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  address,
  phoneNumber,
  email,
  imageContent,
  organization,
  person,
  partyRelationship,
  credentialType,
  driverLicense,
  passport,
  education,
  experience,
  country,
  state,
  addressType,
  phoneType,
  emailType,
  partyType,
  partyRole,
  title,
  suffix,
  gender,
  eyeColor,
  hairColor,
  race,
  tenureType,
  imageType,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;
