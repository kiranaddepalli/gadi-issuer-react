import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './phone-type.reducer';
import { IPhoneType } from 'app/shared/model/phone-type.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPhoneTypeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const PhoneType = (props: IPhoneTypeProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { phoneTypeList, match, loading } = props;
  return (
    <div>
      <h2 id="phone-type-heading">
        <Translate contentKey="gadiApp.phoneType.home.title">Phone Types</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="gadiApp.phoneType.home.createLabel">Create new Phone Type</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {phoneTypeList && phoneTypeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.phoneType.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.phoneType.identifier">Identifier</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.phoneType.orderValue">Order Value</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.phoneType.defaultValue">Default Value</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.phoneType.active">Active</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.phoneType.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.phoneType.createdDate">Created Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.phoneType.updatedBy">Updated By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.phoneType.updatedDate">Updated Date</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {phoneTypeList.map((phoneType, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${phoneType.id}`} color="link" size="sm">
                      {phoneType.id}
                    </Button>
                  </td>
                  <td>{phoneType.name}</td>
                  <td>{phoneType.identifier}</td>
                  <td>{phoneType.orderValue}</td>
                  <td>{phoneType.defaultValue ? 'true' : 'false'}</td>
                  <td>{phoneType.active ? 'true' : 'false'}</td>
                  <td>{phoneType.createdBy}</td>
                  <td>
                    {phoneType.createdDate ? <TextFormat type="date" value={phoneType.createdDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{phoneType.updatedBy}</td>
                  <td>
                    {phoneType.updatedDate ? <TextFormat type="date" value={phoneType.updatedDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${phoneType.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${phoneType.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${phoneType.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="gadiApp.phoneType.home.notFound">No Phone Types found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ phoneType }: IRootState) => ({
  phoneTypeList: phoneType.entities,
  loading: phoneType.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PhoneType);
