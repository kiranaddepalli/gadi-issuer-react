import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PhoneType from './phone-type';
import PhoneTypeDetail from './phone-type-detail';
import PhoneTypeUpdate from './phone-type-update';
import PhoneTypeDeleteDialog from './phone-type-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PhoneTypeDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PhoneTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PhoneTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PhoneTypeDetail} />
      <ErrorBoundaryRoute path={match.url} component={PhoneType} />
    </Switch>
  </>
);

export default Routes;
