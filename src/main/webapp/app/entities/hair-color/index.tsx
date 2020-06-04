import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import HairColor from './hair-color';
import HairColorDetail from './hair-color-detail';
import HairColorUpdate from './hair-color-update';
import HairColorDeleteDialog from './hair-color-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={HairColorDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={HairColorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={HairColorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={HairColorDetail} />
      <ErrorBoundaryRoute path={match.url} component={HairColor} />
    </Switch>
  </>
);

export default Routes;
