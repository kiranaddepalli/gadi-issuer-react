import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './organization.reducer';
import { IOrganization } from 'app/shared/model/organization.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOrganizationProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Organization = (props: IOrganizationProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { organizationList, match, loading } = props;
  return (
    <div>
      <h2 id="organization-heading">
        <Translate contentKey="gadiApp.organization.home.title">Organizations</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="gadiApp.organization.home.createLabel">Create new Organization</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {organizationList && organizationList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.organization.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.organization.identifier">Identifier</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.organization.businessName">Business Name</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.organization.dbaName">Dba Name</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.organization.fein">Fein</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.organization.startDate">Start Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.organization.active">Active</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.organization.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.organization.createdDate">Created Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.organization.updatedBy">Updated By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.organization.updatedDate">Updated Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.organization.partyRole">Party Role</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.organization.incorporatedState">Incorporated State</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.organization.country">Country</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.organization.address">Address</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.organization.mainPhone">Main Phone</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.organization.secondaryPhone">Secondary Phone</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {organizationList.map((organization, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${organization.id}`} color="link" size="sm">
                      {organization.id}
                    </Button>
                  </td>
                  <td>{organization.name}</td>
                  <td>{organization.identifier}</td>
                  <td>{organization.businessName}</td>
                  <td>{organization.dbaName}</td>
                  <td>{organization.fein}</td>
                  <td>
                    {organization.startDate ? <TextFormat type="date" value={organization.startDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{organization.active ? 'true' : 'false'}</td>
                  <td>{organization.createdBy}</td>
                  <td>
                    {organization.createdDate ? <TextFormat type="date" value={organization.createdDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{organization.updatedBy}</td>
                  <td>
                    {organization.updatedDate ? <TextFormat type="date" value={organization.updatedDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {organization.partyRole ? <Link to={`party-role/${organization.partyRole.id}`}>{organization.partyRole.id}</Link> : ''}
                  </td>
                  <td>
                    {organization.incorporatedState ? (
                      <Link to={`state/${organization.incorporatedState.id}`}>{organization.incorporatedState.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{organization.country ? <Link to={`country/${organization.country.id}`}>{organization.country.id}</Link> : ''}</td>
                  <td>{organization.address ? <Link to={`address/${organization.address.id}`}>{organization.address.id}</Link> : ''}</td>
                  <td>
                    {organization.mainPhone ? (
                      <Link to={`phone-number/${organization.mainPhone.id}`}>{organization.mainPhone.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {organization.secondaryPhone ? (
                      <Link to={`phone-number/${organization.secondaryPhone.id}`}>{organization.secondaryPhone.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${organization.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${organization.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${organization.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="gadiApp.organization.home.notFound">No Organizations found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ organization }: IRootState) => ({
  organizationList: organization.entities,
  loading: organization.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Organization);
