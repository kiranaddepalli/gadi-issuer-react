import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './party-type.reducer';
import { IPartyType } from 'app/shared/model/party-type.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPartyTypeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const PartyType = (props: IPartyTypeProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { partyTypeList, match, loading } = props;
  return (
    <div>
      <h2 id="party-type-heading">
        <Translate contentKey="gadiApp.partyType.home.title">Party Types</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="gadiApp.partyType.home.createLabel">Create new Party Type</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {partyTypeList && partyTypeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.partyType.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.partyType.identifier">Identifier</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.partyType.orderValue">Order Value</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.partyType.defaultValue">Default Value</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.partyType.active">Active</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.partyType.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.partyType.createdDate">Created Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.partyType.updatedBy">Updated By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.partyType.updatedDate">Updated Date</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {partyTypeList.map((partyType, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${partyType.id}`} color="link" size="sm">
                      {partyType.id}
                    </Button>
                  </td>
                  <td>{partyType.name}</td>
                  <td>{partyType.identifier}</td>
                  <td>{partyType.orderValue}</td>
                  <td>{partyType.defaultValue ? 'true' : 'false'}</td>
                  <td>{partyType.active ? 'true' : 'false'}</td>
                  <td>{partyType.createdBy}</td>
                  <td>
                    {partyType.createdDate ? <TextFormat type="date" value={partyType.createdDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{partyType.updatedBy}</td>
                  <td>
                    {partyType.updatedDate ? <TextFormat type="date" value={partyType.updatedDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${partyType.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${partyType.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${partyType.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="gadiApp.partyType.home.notFound">No Party Types found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ partyType }: IRootState) => ({
  partyTypeList: partyType.entities,
  loading: partyType.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PartyType);
