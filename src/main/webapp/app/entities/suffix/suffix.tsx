import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './suffix.reducer';
import { ISuffix } from 'app/shared/model/suffix.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Suffix = (props: ISuffixProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { suffixList, match, loading } = props;
  return (
    <div>
      <h2 id="suffix-heading">
        <Translate contentKey="gadiApp.suffix.home.title">Suffixes</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="gadiApp.suffix.home.createLabel">Create new Suffix</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {suffixList && suffixList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.suffix.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.suffix.identifier">Identifier</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.suffix.orderValue">Order Value</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.suffix.defaultValue">Default Value</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.suffix.active">Active</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.suffix.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.suffix.createdDate">Created Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.suffix.updatedBy">Updated By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.suffix.updatedDate">Updated Date</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {suffixList.map((suffix, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${suffix.id}`} color="link" size="sm">
                      {suffix.id}
                    </Button>
                  </td>
                  <td>{suffix.name}</td>
                  <td>{suffix.identifier}</td>
                  <td>{suffix.orderValue}</td>
                  <td>{suffix.defaultValue ? 'true' : 'false'}</td>
                  <td>{suffix.active ? 'true' : 'false'}</td>
                  <td>{suffix.createdBy}</td>
                  <td>{suffix.createdDate ? <TextFormat type="date" value={suffix.createdDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{suffix.updatedBy}</td>
                  <td>{suffix.updatedDate ? <TextFormat type="date" value={suffix.updatedDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${suffix.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${suffix.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${suffix.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="gadiApp.suffix.home.notFound">No Suffixes found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ suffix }: IRootState) => ({
  suffixList: suffix.entities,
  loading: suffix.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Suffix);
