import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './passport.reducer';
import { IPassport } from 'app/shared/model/passport.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPassportProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Passport = (props: IPassportProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { passportList, match, loading } = props;
  return (
    <div>
      <h2 id="passport-heading">
        <Translate contentKey="gadiApp.passport.home.title">Passports</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="gadiApp.passport.home.createLabel">Create new Passport</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {passportList && passportList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.passport.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.passport.identifier">Identifier</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.passport.issuerIdentifier">Issuer Identifier</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.passport.issueDate">Issue Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.passport.expirationDate">Expiration Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.passport.classCode">Class Code</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.passport.birthDate">Birth Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.passport.heightFeet">Height Feet</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.passport.heightInches">Height Inches</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.passport.active">Active</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.passport.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.passport.createdDate">Created Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.passport.updatedBy">Updated By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.passport.updatedDate">Updated Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.passport.gender">Gender</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.passport.nationality">Nationality</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.passport.holderImage">Holder Image</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {passportList.map((passport, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${passport.id}`} color="link" size="sm">
                      {passport.id}
                    </Button>
                  </td>
                  <td>{passport.name}</td>
                  <td>{passport.identifier}</td>
                  <td>{passport.issuerIdentifier}</td>
                  <td>{passport.issueDate ? <TextFormat type="date" value={passport.issueDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>
                    {passport.expirationDate ? <TextFormat type="date" value={passport.expirationDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{passport.classCode}</td>
                  <td>{passport.birthDate ? <TextFormat type="date" value={passport.birthDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{passport.heightFeet}</td>
                  <td>{passport.heightInches}</td>
                  <td>{passport.active ? 'true' : 'false'}</td>
                  <td>{passport.createdBy}</td>
                  <td>{passport.createdDate ? <TextFormat type="date" value={passport.createdDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{passport.updatedBy}</td>
                  <td>{passport.updatedDate ? <TextFormat type="date" value={passport.updatedDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{passport.gender ? <Link to={`gender/${passport.gender.id}`}>{passport.gender.id}</Link> : ''}</td>
                  <td>{passport.nationality ? <Link to={`country/${passport.nationality.id}`}>{passport.nationality.id}</Link> : ''}</td>
                  <td>
                    {passport.holderImage ? <Link to={`image-content/${passport.holderImage.id}`}>{passport.holderImage.id}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${passport.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${passport.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${passport.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="gadiApp.passport.home.notFound">No Passports found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ passport }: IRootState) => ({
  passportList: passport.entities,
  loading: passport.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Passport);
