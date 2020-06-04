import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './eye-color.reducer';
import { IEyeColor } from 'app/shared/model/eye-color.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEyeColorProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const EyeColor = (props: IEyeColorProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { eyeColorList, match, loading } = props;
  return (
    <div>
      <h2 id="eye-color-heading">
        <Translate contentKey="gadiApp.eyeColor.home.title">Eye Colors</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="gadiApp.eyeColor.home.createLabel">Create new Eye Color</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {eyeColorList && eyeColorList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.eyeColor.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.eyeColor.identifier">Identifier</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.eyeColor.orderValue">Order Value</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.eyeColor.defaultValue">Default Value</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.eyeColor.active">Active</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.eyeColor.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.eyeColor.createdDate">Created Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.eyeColor.updatedBy">Updated By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.eyeColor.updatedDate">Updated Date</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {eyeColorList.map((eyeColor, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${eyeColor.id}`} color="link" size="sm">
                      {eyeColor.id}
                    </Button>
                  </td>
                  <td>{eyeColor.name}</td>
                  <td>{eyeColor.identifier}</td>
                  <td>{eyeColor.orderValue}</td>
                  <td>{eyeColor.defaultValue ? 'true' : 'false'}</td>
                  <td>{eyeColor.active ? 'true' : 'false'}</td>
                  <td>{eyeColor.createdBy}</td>
                  <td>{eyeColor.createdDate ? <TextFormat type="date" value={eyeColor.createdDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{eyeColor.updatedBy}</td>
                  <td>{eyeColor.updatedDate ? <TextFormat type="date" value={eyeColor.updatedDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${eyeColor.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${eyeColor.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${eyeColor.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="gadiApp.eyeColor.home.notFound">No Eye Colors found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ eyeColor }: IRootState) => ({
  eyeColorList: eyeColor.entities,
  loading: eyeColor.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EyeColor);
