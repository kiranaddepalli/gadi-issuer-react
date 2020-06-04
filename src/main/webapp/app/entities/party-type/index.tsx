import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PartyType from './party-type';
import PartyTypeDetail from './party-type-detail';
import PartyTypeUpdate from './party-type-update';
import PartyTypeDeleteDialog from './party-type-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PartyTypeDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PartyTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PartyTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PartyTypeDetail} />
      <ErrorBoundaryRoute path={match.url} component={PartyType} />
    </Switch>
  </>
);

export default Routes;
