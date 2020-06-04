import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IAddress } from 'app/shared/model/address.model';
import { getEntities as getAddresses } from 'app/entities/address/address.reducer';
import { IGender } from 'app/shared/model/gender.model';
import { getEntities as getGenders } from 'app/entities/gender/gender.reducer';
import { IEyeColor } from 'app/shared/model/eye-color.model';
import { getEntities as getEyeColors } from 'app/entities/eye-color/eye-color.reducer';
import { IHairColor } from 'app/shared/model/hair-color.model';
import { getEntities as getHairColors } from 'app/entities/hair-color/hair-color.reducer';
import { IRace } from 'app/shared/model/race.model';
import { getEntities as getRaces } from 'app/entities/race/race.reducer';
import { IState } from 'app/shared/model/state.model';
import { getEntities as getStates } from 'app/entities/state/state.reducer';
import { ICountry } from 'app/shared/model/country.model';
import { getEntities as getCountries } from 'app/entities/country/country.reducer';
import { IImageContent } from 'app/shared/model/image-content.model';
import { getEntities as getImageContents } from 'app/entities/image-content/image-content.reducer';
import { getEntity, updateEntity, createEntity, reset } from './driver-license.reducer';
import { IDriverLicense } from 'app/shared/model/driver-license.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDriverLicenseUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DriverLicenseUpdate = (props: IDriverLicenseUpdateProps) => {
  const [addressId, setAddressId] = useState('0');
  const [genderId, setGenderId] = useState('0');
  const [eyeColorId, setEyeColorId] = useState('0');
  const [hairColorId, setHairColorId] = useState('0');
  const [raceId, setRaceId] = useState('0');
  const [issuingStateId, setIssuingStateId] = useState('0');
  const [issuingCountryId, setIssuingCountryId] = useState('0');
  const [holderImageId, setHolderImageId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const {
    driverLicenseEntity,
    addresses,
    genders,
    eyeColors,
    hairColors,
    races,
    states,
    countries,
    imageContents,
    loading,
    updating,
  } = props;

  const handleClose = () => {
    props.history.push('/driver-license');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getAddresses();
    props.getGenders();
    props.getEyeColors();
    props.getHairColors();
    props.getRaces();
    props.getStates();
    props.getCountries();
    props.getImageContents();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.issueDate = convertDateTimeToServer(values.issueDate);
    values.expirationDate = convertDateTimeToServer(values.expirationDate);
    values.birthDate = convertDateTimeToServer(values.birthDate);
    values.createdDate = convertDateTimeToServer(values.createdDate);
    values.updatedDate = convertDateTimeToServer(values.updatedDate);

    if (errors.length === 0) {
      const entity = {
        ...driverLicenseEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gadiApp.driverLicense.home.createOrEditLabel">
            <Translate contentKey="gadiApp.driverLicense.home.createOrEditLabel">Create or edit a DriverLicense</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : driverLicenseEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="driver-license-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="driver-license-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="driver-license-name">
                  <Translate contentKey="gadiApp.driverLicense.name">Name</Translate>
                </Label>
                <AvField
                  id="driver-license-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="identifierLabel" for="driver-license-identifier">
                  <Translate contentKey="gadiApp.driverLicense.identifier">Identifier</Translate>
                </Label>
                <AvField id="driver-license-identifier" type="text" name="identifier" />
              </AvGroup>
              <AvGroup>
                <Label id="issuerIdentifierLabel" for="driver-license-issuerIdentifier">
                  <Translate contentKey="gadiApp.driverLicense.issuerIdentifier">Issuer Identifier</Translate>
                </Label>
                <AvField id="driver-license-issuerIdentifier" type="text" name="issuerIdentifier" />
              </AvGroup>
              <AvGroup>
                <Label id="issueDateLabel" for="driver-license-issueDate">
                  <Translate contentKey="gadiApp.driverLicense.issueDate">Issue Date</Translate>
                </Label>
                <AvInput
                  id="driver-license-issueDate"
                  type="datetime-local"
                  className="form-control"
                  name="issueDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.driverLicenseEntity.issueDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="expirationDateLabel" for="driver-license-expirationDate">
                  <Translate contentKey="gadiApp.driverLicense.expirationDate">Expiration Date</Translate>
                </Label>
                <AvInput
                  id="driver-license-expirationDate"
                  type="datetime-local"
                  className="form-control"
                  name="expirationDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.driverLicenseEntity.expirationDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="classCodeLabel" for="driver-license-classCode">
                  <Translate contentKey="gadiApp.driverLicense.classCode">Class Code</Translate>
                </Label>
                <AvField id="driver-license-classCode" type="text" name="classCode" />
              </AvGroup>
              <AvGroup>
                <Label id="birthDateLabel" for="driver-license-birthDate">
                  <Translate contentKey="gadiApp.driverLicense.birthDate">Birth Date</Translate>
                </Label>
                <AvInput
                  id="driver-license-birthDate"
                  type="datetime-local"
                  className="form-control"
                  name="birthDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.driverLicenseEntity.birthDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="heightFeetLabel" for="driver-license-heightFeet">
                  <Translate contentKey="gadiApp.driverLicense.heightFeet">Height Feet</Translate>
                </Label>
                <AvField id="driver-license-heightFeet" type="string" className="form-control" name="heightFeet" />
              </AvGroup>
              <AvGroup>
                <Label id="heightInchesLabel" for="driver-license-heightInches">
                  <Translate contentKey="gadiApp.driverLicense.heightInches">Height Inches</Translate>
                </Label>
                <AvField id="driver-license-heightInches" type="string" className="form-control" name="heightInches" />
              </AvGroup>
              <AvGroup check>
                <Label id="activeLabel">
                  <AvInput id="driver-license-active" type="checkbox" className="form-check-input" name="active" />
                  <Translate contentKey="gadiApp.driverLicense.active">Active</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="driver-license-createdBy">
                  <Translate contentKey="gadiApp.driverLicense.createdBy">Created By</Translate>
                </Label>
                <AvField id="driver-license-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="driver-license-createdDate">
                  <Translate contentKey="gadiApp.driverLicense.createdDate">Created Date</Translate>
                </Label>
                <AvInput
                  id="driver-license-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.driverLicenseEntity.createdDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="updatedByLabel" for="driver-license-updatedBy">
                  <Translate contentKey="gadiApp.driverLicense.updatedBy">Updated By</Translate>
                </Label>
                <AvField id="driver-license-updatedBy" type="text" name="updatedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="updatedDateLabel" for="driver-license-updatedDate">
                  <Translate contentKey="gadiApp.driverLicense.updatedDate">Updated Date</Translate>
                </Label>
                <AvInput
                  id="driver-license-updatedDate"
                  type="datetime-local"
                  className="form-control"
                  name="updatedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.driverLicenseEntity.updatedDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label for="driver-license-address">
                  <Translate contentKey="gadiApp.driverLicense.address">Address</Translate>
                </Label>
                <AvInput id="driver-license-address" type="select" className="form-control" name="address.id">
                  <option value="" key="0" />
                  {addresses
                    ? addresses.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="driver-license-gender">
                  <Translate contentKey="gadiApp.driverLicense.gender">Gender</Translate>
                </Label>
                <AvInput id="driver-license-gender" type="select" className="form-control" name="gender.id">
                  <option value="" key="0" />
                  {genders
                    ? genders.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="driver-license-eyeColor">
                  <Translate contentKey="gadiApp.driverLicense.eyeColor">Eye Color</Translate>
                </Label>
                <AvInput id="driver-license-eyeColor" type="select" className="form-control" name="eyeColor.id">
                  <option value="" key="0" />
                  {eyeColors
                    ? eyeColors.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="driver-license-hairColor">
                  <Translate contentKey="gadiApp.driverLicense.hairColor">Hair Color</Translate>
                </Label>
                <AvInput id="driver-license-hairColor" type="select" className="form-control" name="hairColor.id">
                  <option value="" key="0" />
                  {hairColors
                    ? hairColors.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="driver-license-race">
                  <Translate contentKey="gadiApp.driverLicense.race">Race</Translate>
                </Label>
                <AvInput id="driver-license-race" type="select" className="form-control" name="race.id">
                  <option value="" key="0" />
                  {races
                    ? races.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="driver-license-issuingState">
                  <Translate contentKey="gadiApp.driverLicense.issuingState">Issuing State</Translate>
                </Label>
                <AvInput id="driver-license-issuingState" type="select" className="form-control" name="issuingState.id">
                  <option value="" key="0" />
                  {states
                    ? states.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="driver-license-issuingCountry">
                  <Translate contentKey="gadiApp.driverLicense.issuingCountry">Issuing Country</Translate>
                </Label>
                <AvInput id="driver-license-issuingCountry" type="select" className="form-control" name="issuingCountry.id">
                  <option value="" key="0" />
                  {countries
                    ? countries.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="driver-license-holderImage">
                  <Translate contentKey="gadiApp.driverLicense.holderImage">Holder Image</Translate>
                </Label>
                <AvInput id="driver-license-holderImage" type="select" className="form-control" name="holderImage.id">
                  <option value="" key="0" />
                  {imageContents
                    ? imageContents.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/driver-license" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  addresses: storeState.address.entities,
  genders: storeState.gender.entities,
  eyeColors: storeState.eyeColor.entities,
  hairColors: storeState.hairColor.entities,
  races: storeState.race.entities,
  states: storeState.state.entities,
  countries: storeState.country.entities,
  imageContents: storeState.imageContent.entities,
  driverLicenseEntity: storeState.driverLicense.entity,
  loading: storeState.driverLicense.loading,
  updating: storeState.driverLicense.updating,
  updateSuccess: storeState.driverLicense.updateSuccess,
});

const mapDispatchToProps = {
  getAddresses,
  getGenders,
  getEyeColors,
  getHairColors,
  getRaces,
  getStates,
  getCountries,
  getImageContents,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DriverLicenseUpdate);
