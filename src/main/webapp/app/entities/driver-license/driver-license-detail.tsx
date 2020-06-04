import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './driver-license.reducer';
import { IDriverLicense } from 'app/shared/model/driver-license.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDriverLicenseDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DriverLicenseDetail = (props: IDriverLicenseDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { driverLicenseEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gadiApp.driverLicense.detail.title">DriverLicense</Translate> [<b>{driverLicenseEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="gadiApp.driverLicense.name">Name</Translate>
            </span>
          </dt>
          <dd>{driverLicenseEntity.name}</dd>
          <dt>
            <span id="identifier">
              <Translate contentKey="gadiApp.driverLicense.identifier">Identifier</Translate>
            </span>
          </dt>
          <dd>{driverLicenseEntity.identifier}</dd>
          <dt>
            <span id="issuerIdentifier">
              <Translate contentKey="gadiApp.driverLicense.issuerIdentifier">Issuer Identifier</Translate>
            </span>
          </dt>
          <dd>{driverLicenseEntity.issuerIdentifier}</dd>
          <dt>
            <span id="issueDate">
              <Translate contentKey="gadiApp.driverLicense.issueDate">Issue Date</Translate>
            </span>
          </dt>
          <dd>
            {driverLicenseEntity.issueDate ? (
              <TextFormat value={driverLicenseEntity.issueDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="expirationDate">
              <Translate contentKey="gadiApp.driverLicense.expirationDate">Expiration Date</Translate>
            </span>
          </dt>
          <dd>
            {driverLicenseEntity.expirationDate ? (
              <TextFormat value={driverLicenseEntity.expirationDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="classCode">
              <Translate contentKey="gadiApp.driverLicense.classCode">Class Code</Translate>
            </span>
          </dt>
          <dd>{driverLicenseEntity.classCode}</dd>
          <dt>
            <span id="birthDate">
              <Translate contentKey="gadiApp.driverLicense.birthDate">Birth Date</Translate>
            </span>
          </dt>
          <dd>
            {driverLicenseEntity.birthDate ? (
              <TextFormat value={driverLicenseEntity.birthDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="heightFeet">
              <Translate contentKey="gadiApp.driverLicense.heightFeet">Height Feet</Translate>
            </span>
          </dt>
          <dd>{driverLicenseEntity.heightFeet}</dd>
          <dt>
            <span id="heightInches">
              <Translate contentKey="gadiApp.driverLicense.heightInches">Height Inches</Translate>
            </span>
          </dt>
          <dd>{driverLicenseEntity.heightInches}</dd>
          <dt>
            <span id="active">
              <Translate contentKey="gadiApp.driverLicense.active">Active</Translate>
            </span>
          </dt>
          <dd>{driverLicenseEntity.active ? 'true' : 'false'}</dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="gadiApp.driverLicense.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{driverLicenseEntity.createdBy}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="gadiApp.driverLicense.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>
            {driverLicenseEntity.createdDate ? (
              <TextFormat value={driverLicenseEntity.createdDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="updatedBy">
              <Translate contentKey="gadiApp.driverLicense.updatedBy">Updated By</Translate>
            </span>
          </dt>
          <dd>{driverLicenseEntity.updatedBy}</dd>
          <dt>
            <span id="updatedDate">
              <Translate contentKey="gadiApp.driverLicense.updatedDate">Updated Date</Translate>
            </span>
          </dt>
          <dd>
            {driverLicenseEntity.updatedDate ? (
              <TextFormat value={driverLicenseEntity.updatedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="gadiApp.driverLicense.address">Address</Translate>
          </dt>
          <dd>{driverLicenseEntity.address ? driverLicenseEntity.address.id : ''}</dd>
          <dt>
            <Translate contentKey="gadiApp.driverLicense.gender">Gender</Translate>
          </dt>
          <dd>{driverLicenseEntity.gender ? driverLicenseEntity.gender.id : ''}</dd>
          <dt>
            <Translate contentKey="gadiApp.driverLicense.eyeColor">Eye Color</Translate>
          </dt>
          <dd>{driverLicenseEntity.eyeColor ? driverLicenseEntity.eyeColor.id : ''}</dd>
          <dt>
            <Translate contentKey="gadiApp.driverLicense.hairColor">Hair Color</Translate>
          </dt>
          <dd>{driverLicenseEntity.hairColor ? driverLicenseEntity.hairColor.id : ''}</dd>
          <dt>
            <Translate contentKey="gadiApp.driverLicense.race">Race</Translate>
          </dt>
          <dd>{driverLicenseEntity.race ? driverLicenseEntity.race.id : ''}</dd>
          <dt>
            <Translate contentKey="gadiApp.driverLicense.issuingState">Issuing State</Translate>
          </dt>
          <dd>{driverLicenseEntity.issuingState ? driverLicenseEntity.issuingState.id : ''}</dd>
          <dt>
            <Translate contentKey="gadiApp.driverLicense.issuingCountry">Issuing Country</Translate>
          </dt>
          <dd>{driverLicenseEntity.issuingCountry ? driverLicenseEntity.issuingCountry.id : ''}</dd>
          <dt>
            <Translate contentKey="gadiApp.driverLicense.holderImage">Holder Image</Translate>
          </dt>
          <dd>{driverLicenseEntity.holderImage ? driverLicenseEntity.holderImage.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/driver-license" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/driver-license/${driverLicenseEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ driverLicense }: IRootState) => ({
  driverLicenseEntity: driverLicense.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DriverLicenseDetail);
