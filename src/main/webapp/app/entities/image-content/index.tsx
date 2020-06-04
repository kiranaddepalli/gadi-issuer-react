import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ImageContent from './image-content';
import ImageContentDetail from './image-content-detail';
import ImageContentUpdate from './image-content-update';
import ImageContentDeleteDialog from './image-content-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ImageContentDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ImageContentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ImageContentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ImageContentDetail} />
      <ErrorBoundaryRoute path={match.url} component={ImageContent} />
    </Switch>
  </>
);

export default Routes;
