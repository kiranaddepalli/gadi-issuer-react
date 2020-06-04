import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AddressType from './address-type';
import AddressTypeDetail from './address-type-detail';
import AddressTypeUpdate from './address-type-update';
import AddressTypeDeleteDialog from './address-type-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={AddressTypeDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AddressTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AddressTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AddressTypeDetail} />
      <ErrorBoundaryRoute path={match.url} component={AddressType} />
    </Switch>
  </>
);

export default Routes;
