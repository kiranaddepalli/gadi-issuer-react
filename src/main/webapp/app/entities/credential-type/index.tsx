import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CredentialType from './credential-type';
import CredentialTypeDetail from './credential-type-detail';
import CredentialTypeUpdate from './credential-type-update';
import CredentialTypeDeleteDialog from './credential-type-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CredentialTypeDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CredentialTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CredentialTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CredentialTypeDetail} />
      <ErrorBoundaryRoute path={match.url} component={CredentialType} />
    </Switch>
  </>
);

export default Routes;
