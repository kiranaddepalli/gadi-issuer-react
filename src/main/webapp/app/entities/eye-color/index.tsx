import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EyeColor from './eye-color';
import EyeColorDetail from './eye-color-detail';
import EyeColorUpdate from './eye-color-update';
import EyeColorDeleteDialog from './eye-color-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EyeColorDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EyeColorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EyeColorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EyeColorDetail} />
      <ErrorBoundaryRoute path={match.url} component={EyeColor} />
    </Switch>
  </>
);

export default Routes;
