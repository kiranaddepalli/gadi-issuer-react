import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './address.reducer';
import { IAddress } from 'app/shared/model/address.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAddressProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Address = (props: IAddressProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { addressList, match, loading } = props;
  return (
    <div>
      <h2 id="address-heading">
        <Translate contentKey="gadiApp.address.home.title">Addresses</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="gadiApp.address.home.createLabel">Create new Address</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {addressList && addressList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.address.addressLine1">Address Line 1</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.address.addressLine2">Address Line 2</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.address.city">City</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.address.zipcode">Zipcode</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.address.latitude">Latitude</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.address.longitude">Longitude</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.address.active">Active</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.address.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.address.createdDate">Created Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.address.updatedBy">Updated By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.address.updatedDate">Updated Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.address.state">State</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.address.addressType">Address Type</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {addressList.map((address, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${address.id}`} color="link" size="sm">
                      {address.id}
                    </Button>
                  </td>
                  <td>{address.addressLine1}</td>
                  <td>{address.addressLine2}</td>
                  <td>{address.city}</td>
                  <td>{address.zipcode}</td>
                  <td>{address.latitude}</td>
                  <td>{address.longitude}</td>
                  <td>{address.active ? 'true' : 'false'}</td>
                  <td>{address.createdBy}</td>
                  <td>{address.createdDate ? <TextFormat type="date" value={address.createdDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{address.updatedBy}</td>
                  <td>{address.updatedDate ? <TextFormat type="date" value={address.updatedDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{address.state ? <Link to={`state/${address.state.id}`}>{address.state.id}</Link> : ''}</td>
                  <td>{address.addressType ? <Link to={`address-type/${address.addressType.id}`}>{address.addressType.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${address.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${address.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${address.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="gadiApp.address.home.notFound">No Addresses found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ address }: IRootState) => ({
  addressList: address.entities,
  loading: address.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Address);
