import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './tenure-type.reducer';
import { ITenureType } from 'app/shared/model/tenure-type.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITenureTypeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const TenureType = (props: ITenureTypeProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { tenureTypeList, match, loading } = props;
  return (
    <div>
      <h2 id="tenure-type-heading">
        <Translate contentKey="gadiApp.tenureType.home.title">Tenure Types</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="gadiApp.tenureType.home.createLabel">Create new Tenure Type</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {tenureTypeList && tenureTypeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.tenureType.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.tenureType.identifier">Identifier</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.tenureType.orderValue">Order Value</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.tenureType.defaultValue">Default Value</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.tenureType.active">Active</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.tenureType.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.tenureType.createdDate">Created Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.tenureType.updatedBy">Updated By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.tenureType.updatedDate">Updated Date</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {tenureTypeList.map((tenureType, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${tenureType.id}`} color="link" size="sm">
                      {tenureType.id}
                    </Button>
                  </td>
                  <td>{tenureType.name}</td>
                  <td>{tenureType.identifier}</td>
                  <td>{tenureType.orderValue}</td>
                  <td>{tenureType.defaultValue ? 'true' : 'false'}</td>
                  <td>{tenureType.active ? 'true' : 'false'}</td>
                  <td>{tenureType.createdBy}</td>
                  <td>
                    {tenureType.createdDate ? <TextFormat type="date" value={tenureType.createdDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{tenureType.updatedBy}</td>
                  <td>
                    {tenureType.updatedDate ? <TextFormat type="date" value={tenureType.updatedDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${tenureType.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tenureType.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tenureType.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="gadiApp.tenureType.home.notFound">No Tenure Types found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ tenureType }: IRootState) => ({
  tenureTypeList: tenureType.entities,
  loading: tenureType.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TenureType);
