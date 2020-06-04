import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './gender.reducer';
import { IGender } from 'app/shared/model/gender.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IGenderProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Gender = (props: IGenderProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { genderList, match, loading } = props;
  return (
    <div>
      <h2 id="gender-heading">
        <Translate contentKey="gadiApp.gender.home.title">Genders</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="gadiApp.gender.home.createLabel">Create new Gender</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {genderList && genderList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.gender.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.gender.identifier">Identifier</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.gender.orderValue">Order Value</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.gender.defaultValue">Default Value</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.gender.active">Active</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.gender.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.gender.createdDate">Created Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.gender.updatedBy">Updated By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.gender.updatedDate">Updated Date</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {genderList.map((gender, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${gender.id}`} color="link" size="sm">
                      {gender.id}
                    </Button>
                  </td>
                  <td>{gender.name}</td>
                  <td>{gender.identifier}</td>
                  <td>{gender.orderValue}</td>
                  <td>{gender.defaultValue ? 'true' : 'false'}</td>
                  <td>{gender.active ? 'true' : 'false'}</td>
                  <td>{gender.createdBy}</td>
                  <td>{gender.createdDate ? <TextFormat type="date" value={gender.createdDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{gender.updatedBy}</td>
                  <td>{gender.updatedDate ? <TextFormat type="date" value={gender.updatedDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${gender.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${gender.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${gender.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="gadiApp.gender.home.notFound">No Genders found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ gender }: IRootState) => ({
  genderList: gender.entities,
  loading: gender.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Gender);
