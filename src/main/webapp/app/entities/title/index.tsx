import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Title from './title';
import TitleDetail from './title-detail';
import TitleUpdate from './title-update';
import TitleDeleteDialog from './title-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TitleDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TitleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TitleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TitleDetail} />
      <ErrorBoundaryRoute path={match.url} component={Title} />
    </Switch>
  </>
);

export default Routes;
