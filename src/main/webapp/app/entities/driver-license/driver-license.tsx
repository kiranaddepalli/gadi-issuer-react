import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './driver-license.reducer';
import { IDriverLicense } from 'app/shared/model/driver-license.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDriverLicenseProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const DriverLicense = (props: IDriverLicenseProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { driverLicenseList, match, loading } = props;
  return (
    <div>
      <h2 id="driver-license-heading">
        <Translate contentKey="gadiApp.driverLicense.home.title">Driver Licenses</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="gadiApp.driverLicense.home.createLabel">Create new Driver License</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {driverLicenseList && driverLicenseList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.driverLicense.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.driverLicense.identifier">Identifier</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.driverLicense.issuerIdentifier">Issuer Identifier</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.driverLicense.issueDate">Issue Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.driverLicense.expirationDate">Expiration Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.driverLicense.classCode">Class Code</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.driverLicense.birthDate">Birth Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.driverLicense.heightFeet">Height Feet</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.driverLicense.heightInches">Height Inches</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.driverLicense.active">Active</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.driverLicense.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.driverLicense.createdDate">Created Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.driverLicense.updatedBy">Updated By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.driverLicense.updatedDate">Updated Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.driverLicense.address">Address</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.driverLicense.gender">Gender</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.driverLicense.eyeColor">Eye Color</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.driverLicense.hairColor">Hair Color</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.driverLicense.race">Race</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.driverLicense.issuingState">Issuing State</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.driverLicense.issuingCountry">Issuing Country</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.driverLicense.holderImage">Holder Image</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {driverLicenseList.map((driverLicense, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${driverLicense.id}`} color="link" size="sm">
                      {driverLicense.id}
                    </Button>
                  </td>
                  <td>{driverLicense.name}</td>
                  <td>{driverLicense.identifier}</td>
                  <td>{driverLicense.issuerIdentifier}</td>
                  <td>
                    {driverLicense.issueDate ? <TextFormat type="date" value={driverLicense.issueDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {driverLicense.expirationDate ? (
                      <TextFormat type="date" value={driverLicense.expirationDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{driverLicense.classCode}</td>
                  <td>
                    {driverLicense.birthDate ? <TextFormat type="date" value={driverLicense.birthDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{driverLicense.heightFeet}</td>
                  <td>{driverLicense.heightInches}</td>
                  <td>{driverLicense.active ? 'true' : 'false'}</td>
                  <td>{driverLicense.createdBy}</td>
                  <td>
                    {driverLicense.createdDate ? (
                      <TextFormat type="date" value={driverLicense.createdDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{driverLicense.updatedBy}</td>
                  <td>
                    {driverLicense.updatedDate ? (
                      <TextFormat type="date" value={driverLicense.updatedDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{driverLicense.address ? <Link to={`address/${driverLicense.address.id}`}>{driverLicense.address.id}</Link> : ''}</td>
                  <td>{driverLicense.gender ? <Link to={`gender/${driverLicense.gender.id}`}>{driverLicense.gender.id}</Link> : ''}</td>
                  <td>
                    {driverLicense.eyeColor ? <Link to={`eye-color/${driverLicense.eyeColor.id}`}>{driverLicense.eyeColor.id}</Link> : ''}
                  </td>
                  <td>
                    {driverLicense.hairColor ? (
                      <Link to={`hair-color/${driverLicense.hairColor.id}`}>{driverLicense.hairColor.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{driverLicense.race ? <Link to={`race/${driverLicense.race.id}`}>{driverLicense.race.id}</Link> : ''}</td>
                  <td>
                    {driverLicense.issuingState ? (
                      <Link to={`state/${driverLicense.issuingState.id}`}>{driverLicense.issuingState.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {driverLicense.issuingCountry ? (
                      <Link to={`country/${driverLicense.issuingCountry.id}`}>{driverLicense.issuingCountry.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {driverLicense.holderImage ? (
                      <Link to={`image-content/${driverLicense.holderImage.id}`}>{driverLicense.holderImage.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${driverLicense.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${driverLicense.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${driverLicense.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="gadiApp.driverLicense.home.notFound">No Driver Licenses found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ driverLicense }: IRootState) => ({
  driverLicenseList: driverLicense.entities,
  loading: driverLicense.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DriverLicense);
