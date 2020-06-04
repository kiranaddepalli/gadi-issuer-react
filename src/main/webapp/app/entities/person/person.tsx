import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './person.reducer';
import { IPerson } from 'app/shared/model/person.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPersonProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Person = (props: IPersonProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { personList, match, loading } = props;
  return (
    <div>
      <h2 id="person-heading">
        <Translate contentKey="gadiApp.person.home.title">People</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="gadiApp.person.home.createLabel">Create new Person</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {personList && personList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.person.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.person.identifier">Identifier</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.person.firstName">First Name</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.person.middleName">Middle Name</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.person.lastName">Last Name</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.person.active">Active</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.person.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.person.createdDate">Created Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.person.updatedBy">Updated By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.person.updatedDate">Updated Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.person.address">Address</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.person.homePhone">Home Phone</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.person.workPhone">Work Phone</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.person.mobilePhone">Mobile Phone</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.person.email">Email</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {personList.map((person, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${person.id}`} color="link" size="sm">
                      {person.id}
                    </Button>
                  </td>
                  <td>{person.name}</td>
                  <td>{person.identifier}</td>
                  <td>{person.firstName}</td>
                  <td>{person.middleName}</td>
                  <td>{person.lastName}</td>
                  <td>{person.active ? 'true' : 'false'}</td>
                  <td>{person.createdBy}</td>
                  <td>{person.createdDate ? <TextFormat type="date" value={person.createdDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{person.updatedBy}</td>
                  <td>{person.updatedDate ? <TextFormat type="date" value={person.updatedDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{person.address ? <Link to={`address/${person.address.id}`}>{person.address.id}</Link> : ''}</td>
                  <td>{person.homePhone ? <Link to={`phone-number/${person.homePhone.id}`}>{person.homePhone.id}</Link> : ''}</td>
                  <td>{person.workPhone ? <Link to={`phone-number/${person.workPhone.id}`}>{person.workPhone.id}</Link> : ''}</td>
                  <td>{person.mobilePhone ? <Link to={`phone-number/${person.mobilePhone.id}`}>{person.mobilePhone.id}</Link> : ''}</td>
                  <td>{person.email ? <Link to={`email/${person.email.id}`}>{person.email.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${person.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${person.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${person.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="gadiApp.person.home.notFound">No People found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ person }: IRootState) => ({
  personList: person.entities,
  loading: person.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Person);
