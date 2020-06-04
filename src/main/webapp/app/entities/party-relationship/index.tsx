import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PartyRelationship from './party-relationship';
import PartyRelationshipDetail from './party-relationship-detail';
import PartyRelationshipUpdate from './party-relationship-update';
import PartyRelationshipDeleteDialog from './party-relationship-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PartyRelationshipDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PartyRelationshipUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PartyRelationshipUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PartyRelationshipDetail} />
      <ErrorBoundaryRoute path={match.url} component={PartyRelationship} />
    </Switch>
  </>
);

export default Routes;
