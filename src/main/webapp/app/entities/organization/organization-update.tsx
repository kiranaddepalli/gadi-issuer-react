import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPartyRole } from 'app/shared/model/party-role.model';
import { getEntities as getPartyRoles } from 'app/entities/party-role/party-role.reducer';
import { IState } from 'app/shared/model/state.model';
import { getEntities as getStates } from 'app/entities/state/state.reducer';
import { ICountry } from 'app/shared/model/country.model';
import { getEntities as getCountries } from 'app/entities/country/country.reducer';
import { IAddress } from 'app/shared/model/address.model';
import { getEntities as getAddresses } from 'app/entities/address/address.reducer';
import { IPhoneNumber } from 'app/shared/model/phone-number.model';
import { getEntities as getPhoneNumbers } from 'app/entities/phone-number/phone-number.reducer';
import { getEntity, updateEntity, createEntity, reset } from './organization.reducer';
import { IOrganization } from 'app/shared/model/organization.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IOrganizationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OrganizationUpdate = (props: IOrganizationUpdateProps) => {
  const [partyRoleId, setPartyRoleId] = useState('0');
  const [incorporatedStateId, setIncorporatedStateId] = useState('0');
  const [countryId, setCountryId] = useState('0');
  const [addressId, setAddressId] = useState('0');
  const [mainPhoneId, setMainPhoneId] = useState('0');
  const [secondaryPhoneId, setSecondaryPhoneId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { organizationEntity, partyRoles, states, countries, addresses, phoneNumbers, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/organization');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getPartyRoles();
    props.getStates();
    props.getCountries();
    props.getAddresses();
    props.getPhoneNumbers();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.startDate = convertDateTimeToServer(values.startDate);
    values.createdDate = convertDateTimeToServer(values.createdDate);
    values.updatedDate = convertDateTimeToServer(values.updatedDate);

    if (errors.length === 0) {
      const entity = {
        ...organizationEntity,
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
          <h2 id="gadiApp.organization.home.createOrEditLabel">
            <Translate contentKey="gadiApp.organization.home.createOrEditLabel">Create or edit a Organization</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : organizationEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="organization-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="organization-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="organization-name">
                  <Translate contentKey="gadiApp.organization.name">Name</Translate>
                </Label>
                <AvField
                  id="organization-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="identifierLabel" for="organization-identifier">
                  <Translate contentKey="gadiApp.organization.identifier">Identifier</Translate>
                </Label>
                <AvField id="organization-identifier" type="text" name="identifier" />
              </AvGroup>
              <AvGroup>
                <Label id="businessNameLabel" for="organization-businessName">
                  <Translate contentKey="gadiApp.organization.businessName">Business Name</Translate>
                </Label>
                <AvField
                  id="organization-businessName"
                  type="text"
                  name="businessName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="dbaNameLabel" for="organization-dbaName">
                  <Translate contentKey="gadiApp.organization.dbaName">Dba Name</Translate>
                </Label>
                <AvField id="organization-dbaName" type="text" name="dbaName" />
              </AvGroup>
              <AvGroup>
                <Label id="feinLabel" for="organization-fein">
                  <Translate contentKey="gadiApp.organization.fein">Fein</Translate>
                </Label>
                <AvField id="organization-fein" type="text" name="fein" />
              </AvGroup>
              <AvGroup>
                <Label id="startDateLabel" for="organization-startDate">
                  <Translate contentKey="gadiApp.organization.startDate">Start Date</Translate>
                </Label>
                <AvInput
                  id="organization-startDate"
                  type="datetime-local"
                  className="form-control"
                  name="startDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.organizationEntity.startDate)}
                />
              </AvGroup>
              <AvGroup check>
                <Label id="activeLabel">
                  <AvInput id="organization-active" type="checkbox" className="form-check-input" name="active" />
                  <Translate contentKey="gadiApp.organization.active">Active</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="organization-createdBy">
                  <Translate contentKey="gadiApp.organization.createdBy">Created By</Translate>
                </Label>
                <AvField id="organization-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="organization-createdDate">
                  <Translate contentKey="gadiApp.organization.createdDate">Created Date</Translate>
                </Label>
                <AvInput
                  id="organization-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.organizationEntity.createdDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="updatedByLabel" for="organization-updatedBy">
                  <Translate contentKey="gadiApp.organization.updatedBy">Updated By</Translate>
                </Label>
                <AvField id="organization-updatedBy" type="text" name="updatedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="updatedDateLabel" for="organization-updatedDate">
                  <Translate contentKey="gadiApp.organization.updatedDate">Updated Date</Translate>
                </Label>
                <AvInput
                  id="organization-updatedDate"
                  type="datetime-local"
                  className="form-control"
                  name="updatedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.organizationEntity.updatedDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label for="organization-partyRole">
                  <Translate contentKey="gadiApp.organization.partyRole">Party Role</Translate>
                </Label>
                <AvInput id="organization-partyRole" type="select" className="form-control" name="partyRole.id">
                  <option value="" key="0" />
                  {partyRoles
                    ? partyRoles.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="organization-incorporatedState">
                  <Translate contentKey="gadiApp.organization.incorporatedState">Incorporated State</Translate>
                </Label>
                <AvInput id="organization-incorporatedState" type="select" className="form-control" name="incorporatedState.id">
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
                <Label for="organization-country">
                  <Translate contentKey="gadiApp.organization.country">Country</Translate>
                </Label>
                <AvInput id="organization-country" type="select" className="form-control" name="country.id">
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
                <Label for="organization-address">
                  <Translate contentKey="gadiApp.organization.address">Address</Translate>
                </Label>
                <AvInput id="organization-address" type="select" className="form-control" name="address.id">
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
                <Label for="organization-mainPhone">
                  <Translate contentKey="gadiApp.organization.mainPhone">Main Phone</Translate>
                </Label>
                <AvInput id="organization-mainPhone" type="select" className="form-control" name="mainPhone.id">
                  <option value="" key="0" />
                  {phoneNumbers
                    ? phoneNumbers.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="organization-secondaryPhone">
                  <Translate contentKey="gadiApp.organization.secondaryPhone">Secondary Phone</Translate>
                </Label>
                <AvInput id="organization-secondaryPhone" type="select" className="form-control" name="secondaryPhone.id">
                  <option value="" key="0" />
                  {phoneNumbers
                    ? phoneNumbers.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/organization" replace color="info">
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
  partyRoles: storeState.partyRole.entities,
  states: storeState.state.entities,
  countries: storeState.country.entities,
  addresses: storeState.address.entities,
  phoneNumbers: storeState.phoneNumber.entities,
  organizationEntity: storeState.organization.entity,
  loading: storeState.organization.loading,
  updating: storeState.organization.updating,
  updateSuccess: storeState.organization.updateSuccess,
});

const mapDispatchToProps = {
  getPartyRoles,
  getStates,
  getCountries,
  getAddresses,
  getPhoneNumbers,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationUpdate);
