import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './hair-color.reducer';
import { IHairColor } from 'app/shared/model/hair-color.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IHairColorProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const HairColor = (props: IHairColorProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { hairColorList, match, loading } = props;
  return (
    <div>
      <h2 id="hair-color-heading">
        <Translate contentKey="gadiApp.hairColor.home.title">Hair Colors</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="gadiApp.hairColor.home.createLabel">Create new Hair Color</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {hairColorList && hairColorList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.hairColor.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.hairColor.identifier">Identifier</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.hairColor.orderValue">Order Value</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.hairColor.defaultValue">Default Value</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.hairColor.active">Active</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.hairColor.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.hairColor.createdDate">Created Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.hairColor.updatedBy">Updated By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.hairColor.updatedDate">Updated Date</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {hairColorList.map((hairColor, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${hairColor.id}`} color="link" size="sm">
                      {hairColor.id}
                    </Button>
                  </td>
                  <td>{hairColor.name}</td>
                  <td>{hairColor.identifier}</td>
                  <td>{hairColor.orderValue}</td>
                  <td>{hairColor.defaultValue ? 'true' : 'false'}</td>
                  <td>{hairColor.active ? 'true' : 'false'}</td>
                  <td>{hairColor.createdBy}</td>
                  <td>
                    {hairColor.createdDate ? <TextFormat type="date" value={hairColor.createdDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{hairColor.updatedBy}</td>
                  <td>
                    {hairColor.updatedDate ? <TextFormat type="date" value={hairColor.updatedDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${hairColor.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${hairColor.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${hairColor.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="gadiApp.hairColor.home.notFound">No Hair Colors found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ hairColor }: IRootState) => ({
  hairColorList: hairColor.entities,
  loading: hairColor.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(HairColor);
