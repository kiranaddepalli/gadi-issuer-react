import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ImageType from './image-type';
import ImageTypeDetail from './image-type-detail';
import ImageTypeUpdate from './image-type-update';
import ImageTypeDeleteDialog from './image-type-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ImageTypeDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ImageTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ImageTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ImageTypeDetail} />
      <ErrorBoundaryRoute path={match.url} component={ImageType} />
    </Switch>
  </>
);

export default Routes;
