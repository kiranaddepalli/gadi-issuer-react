import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Address from './address';
import PhoneNumber from './phone-number';
import Email from './email';
import ImageContent from './image-content';
import Organization from './organization';
import Person from './person';
import PartyRelationship from './party-relationship';
import CredentialType from './credential-type';
import DriverLicense from './driver-license';
import Passport from './passport';
import Education from './education';
import Experience from './experience';
import Country from './country';
import State from './state';
import AddressType from './address-type';
import PhoneType from './phone-type';
import EmailType from './email-type';
import PartyType from './party-type';
import PartyRole from './party-role';
import Title from './title';
import Suffix from './suffix';
import Gender from './gender';
import EyeColor from './eye-color';
import HairColor from './hair-color';
import Race from './race';
import TenureType from './tenure-type';
import ImageType from './image-type';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}address`} component={Address} />
      <ErrorBoundaryRoute path={`${match.url}phone-number`} component={PhoneNumber} />
      <ErrorBoundaryRoute path={`${match.url}email`} component={Email} />
      <ErrorBoundaryRoute path={`${match.url}image-content`} component={ImageContent} />
      <ErrorBoundaryRoute path={`${match.url}organization`} component={Organization} />
      <ErrorBoundaryRoute path={`${match.url}person`} component={Person} />
      <ErrorBoundaryRoute path={`${match.url}party-relationship`} component={PartyRelationship} />
      <ErrorBoundaryRoute path={`${match.url}credential-type`} component={CredentialType} />
      <ErrorBoundaryRoute path={`${match.url}driver-license`} component={DriverLicense} />
      <ErrorBoundaryRoute path={`${match.url}passport`} component={Passport} />
      <ErrorBoundaryRoute path={`${match.url}education`} component={Education} />
      <ErrorBoundaryRoute path={`${match.url}experience`} component={Experience} />
      <ErrorBoundaryRoute path={`${match.url}country`} component={Country} />
      <ErrorBoundaryRoute path={`${match.url}state`} component={State} />
      <ErrorBoundaryRoute path={`${match.url}address-type`} component={AddressType} />
      <ErrorBoundaryRoute path={`${match.url}phone-type`} component={PhoneType} />
      <ErrorBoundaryRoute path={`${match.url}email-type`} component={EmailType} />
      <ErrorBoundaryRoute path={`${match.url}party-type`} component={PartyType} />
      <ErrorBoundaryRoute path={`${match.url}party-role`} component={PartyRole} />
      <ErrorBoundaryRoute path={`${match.url}title`} component={Title} />
      <ErrorBoundaryRoute path={`${match.url}suffix`} component={Suffix} />
      <ErrorBoundaryRoute path={`${match.url}gender`} component={Gender} />
      <ErrorBoundaryRoute path={`${match.url}eye-color`} component={EyeColor} />
      <ErrorBoundaryRoute path={`${match.url}hair-color`} component={HairColor} />
      <ErrorBoundaryRoute path={`${match.url}race`} component={Race} />
      <ErrorBoundaryRoute path={`${match.url}tenure-type`} component={TenureType} />
      <ErrorBoundaryRoute path={`${match.url}image-type`} component={ImageType} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
