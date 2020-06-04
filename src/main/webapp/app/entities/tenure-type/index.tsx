import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TenureType from './tenure-type';
import TenureTypeDetail from './tenure-type-detail';
import TenureTypeUpdate from './tenure-type-update';
import TenureTypeDeleteDialog from './tenure-type-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TenureTypeDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TenureTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TenureTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TenureTypeDetail} />
      <ErrorBoundaryRoute path={match.url} component={TenureType} />
    </Switch>
  </>
);

export default Routes;
