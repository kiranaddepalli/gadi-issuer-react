import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './address-type.reducer';
import { IAddressType } from 'app/shared/model/address-type.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAddressTypeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const AddressType = (props: IAddressTypeProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { addressTypeList, match, loading } = props;
  return (
    <div>
      <h2 id="address-type-heading">
        <Translate contentKey="gadiApp.addressType.home.title">Address Types</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="gadiApp.addressType.home.createLabel">Create new Address Type</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {addressTypeList && addressTypeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.addressType.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.addressType.identifier">Identifier</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.addressType.orderValue">Order Value</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.addressType.defaultValue">Default Value</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.addressType.active">Active</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.addressType.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.addressType.createdDate">Created Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.addressType.updatedBy">Updated By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.addressType.updatedDate">Updated Date</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {addressTypeList.map((addressType, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${addressType.id}`} color="link" size="sm">
                      {addressType.id}
                    </Button>
                  </td>
                  <td>{addressType.name}</td>
                  <td>{addressType.identifier}</td>
                  <td>{addressType.orderValue}</td>
                  <td>{addressType.defaultValue ? 'true' : 'false'}</td>
                  <td>{addressType.active ? 'true' : 'false'}</td>
                  <td>{addressType.createdBy}</td>
                  <td>
                    {addressType.createdDate ? <TextFormat type="date" value={addressType.createdDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{addressType.updatedBy}</td>
                  <td>
                    {addressType.updatedDate ? <TextFormat type="date" value={addressType.updatedDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${addressType.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${addressType.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${addressType.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="gadiApp.addressType.home.notFound">No Address Types found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ addressType }: IRootState) => ({
  addressTypeList: addressType.entities,
  loading: addressType.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AddressType);
