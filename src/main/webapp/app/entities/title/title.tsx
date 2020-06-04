import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './title.reducer';
import { ITitle } from 'app/shared/model/title.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITitleProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Title = (props: ITitleProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { titleList, match, loading } = props;
  return (
    <div>
      <h2 id="title-heading">
        <Translate contentKey="gadiApp.title.home.title">Titles</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="gadiApp.title.home.createLabel">Create new Title</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {titleList && titleList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.title.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.title.identifier">Identifier</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.title.orderValue">Order Value</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.title.defaultValue">Default Value</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.title.active">Active</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.title.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.title.createdDate">Created Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.title.updatedBy">Updated By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.title.updatedDate">Updated Date</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {titleList.map((title, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${title.id}`} color="link" size="sm">
                      {title.id}
                    </Button>
                  </td>
                  <td>{title.name}</td>
                  <td>{title.identifier}</td>
                  <td>{title.orderValue}</td>
                  <td>{title.defaultValue ? 'true' : 'false'}</td>
                  <td>{title.active ? 'true' : 'false'}</td>
                  <td>{title.createdBy}</td>
                  <td>{title.createdDate ? <TextFormat type="date" value={title.createdDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{title.updatedBy}</td>
                  <td>{title.updatedDate ? <TextFormat type="date" value={title.updatedDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${title.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${title.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${title.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="gadiApp.title.home.notFound">No Titles found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ title }: IRootState) => ({
  titleList: title.entities,
  loading: title.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Title);
