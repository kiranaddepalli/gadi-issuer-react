import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Suffix from './suffix';
import SuffixDetail from './suffix-detail';
import SuffixUpdate from './suffix-update';
import SuffixDeleteDialog from './suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={SuffixDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={Suffix} />
    </Switch>
  </>
);

export default Routes;
