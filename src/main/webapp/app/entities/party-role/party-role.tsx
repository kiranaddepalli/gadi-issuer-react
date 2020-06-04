import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './party-role.reducer';
import { IPartyRole } from 'app/shared/model/party-role.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPartyRoleProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const PartyRole = (props: IPartyRoleProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { partyRoleList, match, loading } = props;
  return (
    <div>
      <h2 id="party-role-heading">
        <Translate contentKey="gadiApp.partyRole.home.title">Party Roles</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="gadiApp.partyRole.home.createLabel">Create new Party Role</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {partyRoleList && partyRoleList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.partyRole.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.partyRole.identifier">Identifier</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.partyRole.orderValue">Order Value</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.partyRole.defaultValue">Default Value</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.partyRole.active">Active</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.partyRole.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.partyRole.createdDate">Created Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.partyRole.updatedBy">Updated By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.partyRole.updatedDate">Updated Date</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {partyRoleList.map((partyRole, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${partyRole.id}`} color="link" size="sm">
                      {partyRole.id}
                    </Button>
                  </td>
                  <td>{partyRole.name}</td>
                  <td>{partyRole.identifier}</td>
                  <td>{partyRole.orderValue}</td>
                  <td>{partyRole.defaultValue ? 'true' : 'false'}</td>
                  <td>{partyRole.active ? 'true' : 'false'}</td>
                  <td>{partyRole.createdBy}</td>
                  <td>
                    {partyRole.createdDate ? <TextFormat type="date" value={partyRole.createdDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{partyRole.updatedBy}</td>
                  <td>
                    {partyRole.updatedDate ? <TextFormat type="date" value={partyRole.updatedDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${partyRole.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${partyRole.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${partyRole.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="gadiApp.partyRole.home.notFound">No Party Roles found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ partyRole }: IRootState) => ({
  partyRoleList: partyRole.entities,
  loading: partyRole.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PartyRole);
