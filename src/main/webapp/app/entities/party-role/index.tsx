import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PartyRole from './party-role';
import PartyRoleDetail from './party-role-detail';
import PartyRoleUpdate from './party-role-update';
import PartyRoleDeleteDialog from './party-role-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PartyRoleDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PartyRoleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PartyRoleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PartyRoleDetail} />
      <ErrorBoundaryRoute path={match.url} component={PartyRole} />
    </Switch>
  </>
);

export default Routes;
