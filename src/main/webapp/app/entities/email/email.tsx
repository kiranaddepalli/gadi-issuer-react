import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './email.reducer';
import { IEmail } from 'app/shared/model/email.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmailProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Email = (props: IEmailProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { emailList, match, loading } = props;
  return (
    <div>
      <h2 id="email-heading">
        <Translate contentKey="gadiApp.email.home.title">Emails</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="gadiApp.email.home.createLabel">Create new Email</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {emailList && emailList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.email.address">Address</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.email.active">Active</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.email.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.email.createdDate">Created Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.email.updatedBy">Updated By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.email.updatedDate">Updated Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.email.emailType">Email Type</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {emailList.map((email, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${email.id}`} color="link" size="sm">
                      {email.id}
                    </Button>
                  </td>
                  <td>{email.address}</td>
                  <td>{email.active ? 'true' : 'false'}</td>
                  <td>{email.createdBy}</td>
                  <td>{email.createdDate ? <TextFormat type="date" value={email.createdDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{email.updatedBy}</td>
                  <td>{email.updatedDate ? <TextFormat type="date" value={email.updatedDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{email.emailType ? <Link to={`email-type/${email.emailType.id}`}>{email.emailType.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${email.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${email.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${email.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="gadiApp.email.home.notFound">No Emails found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ email }: IRootState) => ({
  emailList: email.entities,
  loading: email.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Email);
