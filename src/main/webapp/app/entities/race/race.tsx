import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './race.reducer';
import { IRace } from 'app/shared/model/race.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRaceProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Race = (props: IRaceProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { raceList, match, loading } = props;
  return (
    <div>
      <h2 id="race-heading">
        <Translate contentKey="gadiApp.race.home.title">Races</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="gadiApp.race.home.createLabel">Create new Race</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {raceList && raceList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.race.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.race.identifier">Identifier</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.race.orderValue">Order Value</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.race.defaultValue">Default Value</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.race.active">Active</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.race.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.race.createdDate">Created Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.race.updatedBy">Updated By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.race.updatedDate">Updated Date</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {raceList.map((race, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${race.id}`} color="link" size="sm">
                      {race.id}
                    </Button>
                  </td>
                  <td>{race.name}</td>
                  <td>{race.identifier}</td>
                  <td>{race.orderValue}</td>
                  <td>{race.defaultValue ? 'true' : 'false'}</td>
                  <td>{race.active ? 'true' : 'false'}</td>
                  <td>{race.createdBy}</td>
                  <td>{race.createdDate ? <TextFormat type="date" value={race.createdDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{race.updatedBy}</td>
                  <td>{race.updatedDate ? <TextFormat type="date" value={race.updatedDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${race.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${race.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${race.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="gadiApp.race.home.notFound">No Races found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ race }: IRootState) => ({
  raceList: race.entities,
  loading: race.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Race);
