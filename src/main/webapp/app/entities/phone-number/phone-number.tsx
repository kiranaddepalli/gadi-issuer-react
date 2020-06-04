import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './phone-number.reducer';
import { IPhoneNumber } from 'app/shared/model/phone-number.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPhoneNumberProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const PhoneNumber = (props: IPhoneNumberProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { phoneNumberList, match, loading } = props;
  return (
    <div>
      <h2 id="phone-number-heading">
        <Translate contentKey="gadiApp.phoneNumber.home.title">Phone Numbers</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="gadiApp.phoneNumber.home.createLabel">Create new Phone Number</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {phoneNumberList && phoneNumberList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.phoneNumber.countryCode">Country Code</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.phoneNumber.areaCode">Area Code</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.phoneNumber.phoneNumber">Phone Number</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.phoneNumber.extension">Extension</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.phoneNumber.active">Active</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.phoneNumber.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.phoneNumber.createdDate">Created Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.phoneNumber.updatedBy">Updated By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.phoneNumber.updatedDate">Updated Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.phoneNumber.phoneType">Phone Type</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {phoneNumberList.map((phoneNumber, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${phoneNumber.id}`} color="link" size="sm">
                      {phoneNumber.id}
                    </Button>
                  </td>
                  <td>{phoneNumber.countryCode}</td>
                  <td>{phoneNumber.areaCode}</td>
                  <td>{phoneNumber.phoneNumber}</td>
                  <td>{phoneNumber.extension}</td>
                  <td>{phoneNumber.active ? 'true' : 'false'}</td>
                  <td>{phoneNumber.createdBy}</td>
                  <td>
                    {phoneNumber.createdDate ? <TextFormat type="date" value={phoneNumber.createdDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{phoneNumber.updatedBy}</td>
                  <td>
                    {phoneNumber.updatedDate ? <TextFormat type="date" value={phoneNumber.updatedDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {phoneNumber.phoneType ? <Link to={`phone-type/${phoneNumber.phoneType.id}`}>{phoneNumber.phoneType.id}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${phoneNumber.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${phoneNumber.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${phoneNumber.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="gadiApp.phoneNumber.home.notFound">No Phone Numbers found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ phoneNumber }: IRootState) => ({
  phoneNumberList: phoneNumber.entities,
  loading: phoneNumber.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PhoneNumber);
