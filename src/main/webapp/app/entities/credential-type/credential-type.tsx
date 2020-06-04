import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './credential-type.reducer';
import { ICredentialType } from 'app/shared/model/credential-type.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICredentialTypeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const CredentialType = (props: ICredentialTypeProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { credentialTypeList, match, loading } = props;
  return (
    <div>
      <h2 id="credential-type-heading">
        <Translate contentKey="gadiApp.credentialType.home.title">Credential Types</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="gadiApp.credentialType.home.createLabel">Create new Credential Type</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {credentialTypeList && credentialTypeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.credentialType.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.credentialType.identifier">Identifier</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.credentialType.active">Active</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.credentialType.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.credentialType.createdDate">Created Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.credentialType.updatedBy">Updated By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.credentialType.updatedDate">Updated Date</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {credentialTypeList.map((credentialType, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${credentialType.id}`} color="link" size="sm">
                      {credentialType.id}
                    </Button>
                  </td>
                  <td>{credentialType.name}</td>
                  <td>{credentialType.identifier}</td>
                  <td>{credentialType.active ? 'true' : 'false'}</td>
                  <td>{credentialType.createdBy}</td>
                  <td>
                    {credentialType.createdDate ? (
                      <TextFormat type="date" value={credentialType.createdDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{credentialType.updatedBy}</td>
                  <td>
                    {credentialType.updatedDate ? (
                      <TextFormat type="date" value={credentialType.updatedDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${credentialType.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${credentialType.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${credentialType.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="gadiApp.credentialType.home.notFound">No Credential Types found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ credentialType }: IRootState) => ({
  credentialTypeList: credentialType.entities,
  loading: credentialType.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CredentialType);
