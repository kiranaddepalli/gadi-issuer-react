import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './email-type.reducer';
import { IEmailType } from 'app/shared/model/email-type.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmailTypeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const EmailType = (props: IEmailTypeProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { emailTypeList, match, loading } = props;
  return (
    <div>
      <h2 id="email-type-heading">
        <Translate contentKey="gadiApp.emailType.home.title">Email Types</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="gadiApp.emailType.home.createLabel">Create new Email Type</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {emailTypeList && emailTypeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.emailType.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.emailType.identifier">Identifier</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.emailType.orderValue">Order Value</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.emailType.defaultValue">Default Value</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.emailType.active">Active</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.emailType.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.emailType.createdDate">Created Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.emailType.updatedBy">Updated By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.emailType.updatedDate">Updated Date</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {emailTypeList.map((emailType, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${emailType.id}`} color="link" size="sm">
                      {emailType.id}
                    </Button>
                  </td>
                  <td>{emailType.name}</td>
                  <td>{emailType.identifier}</td>
                  <td>{emailType.orderValue}</td>
                  <td>{emailType.defaultValue ? 'true' : 'false'}</td>
                  <td>{emailType.active ? 'true' : 'false'}</td>
                  <td>{emailType.createdBy}</td>
                  <td>
                    {emailType.createdDate ? <TextFormat type="date" value={emailType.createdDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{emailType.updatedBy}</td>
                  <td>
                    {emailType.updatedDate ? <TextFormat type="date" value={emailType.updatedDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${emailType.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${emailType.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${emailType.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="gadiApp.emailType.home.notFound">No Email Types found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ emailType }: IRootState) => ({
  emailTypeList: emailType.entities,
  loading: emailType.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmailType);
