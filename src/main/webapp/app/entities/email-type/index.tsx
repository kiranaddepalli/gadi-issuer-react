import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EmailType from './email-type';
import EmailTypeDetail from './email-type-detail';
import EmailTypeUpdate from './email-type-update';
import EmailTypeDeleteDialog from './email-type-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EmailTypeDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EmailTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EmailTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EmailTypeDetail} />
      <ErrorBoundaryRoute path={match.url} component={EmailType} />
    </Switch>
  </>
);

export default Routes;
