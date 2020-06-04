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
import { IPhoneNumber } from 'app/shared/model/phone-number.model';
import { getEntities as getPhoneNumbers } from 'app/entities/phone-number/phone-number.reducer';
import { IEmail } from 'app/shared/model/email.model';
import { getEntities as getEmails } from 'app/entities/email/email.reducer';
import { getEntity, updateEntity, createEntity, reset } from './person.reducer';
import { IPerson } from 'app/shared/model/person.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPersonUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PersonUpdate = (props: IPersonUpdateProps) => {
  const [addressId, setAddressId] = useState('0');
  const [homePhoneId, setHomePhoneId] = useState('0');
  const [workPhoneId, setWorkPhoneId] = useState('0');
  const [mobilePhoneId, setMobilePhoneId] = useState('0');
  const [emailId, setEmailId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { personEntity, addresses, phoneNumbers, emails, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/person');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getAddresses();
    props.getPhoneNumbers();
    props.getEmails();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.createdDate = convertDateTimeToServer(values.createdDate);
    values.updatedDate = convertDateTimeToServer(values.updatedDate);

    if (errors.length === 0) {
      const entity = {
        ...personEntity,
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
          <h2 id="gadiApp.person.home.createOrEditLabel">
            <Translate contentKey="gadiApp.person.home.createOrEditLabel">Create or edit a Person</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : personEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="person-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="person-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="person-name">
                  <Translate contentKey="gadiApp.person.name">Name</Translate>
                </Label>
                <AvField
                  id="person-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="identifierLabel" for="person-identifier">
                  <Translate contentKey="gadiApp.person.identifier">Identifier</Translate>
                </Label>
                <AvField id="person-identifier" type="text" name="identifier" />
              </AvGroup>
              <AvGroup>
                <Label id="firstNameLabel" for="person-firstName">
                  <Translate contentKey="gadiApp.person.firstName">First Name</Translate>
                </Label>
                <AvField
                  id="person-firstName"
                  type="text"
                  name="firstName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="middleNameLabel" for="person-middleName">
                  <Translate contentKey="gadiApp.person.middleName">Middle Name</Translate>
                </Label>
                <AvField id="person-middleName" type="text" name="middleName" />
              </AvGroup>
              <AvGroup>
                <Label id="lastNameLabel" for="person-lastName">
                  <Translate contentKey="gadiApp.person.lastName">Last Name</Translate>
                </Label>
                <AvField
                  id="person-lastName"
                  type="text"
                  name="lastName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup check>
                <Label id="activeLabel">
                  <AvInput id="person-active" type="checkbox" className="form-check-input" name="active" />
                  <Translate contentKey="gadiApp.person.active">Active</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="person-createdBy">
                  <Translate contentKey="gadiApp.person.createdBy">Created By</Translate>
                </Label>
                <AvField id="person-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="person-createdDate">
                  <Translate contentKey="gadiApp.person.createdDate">Created Date</Translate>
                </Label>
                <AvInput
                  id="person-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.personEntity.createdDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="updatedByLabel" for="person-updatedBy">
                  <Translate contentKey="gadiApp.person.updatedBy">Updated By</Translate>
                </Label>
                <AvField id="person-updatedBy" type="text" name="updatedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="updatedDateLabel" for="person-updatedDate">
                  <Translate contentKey="gadiApp.person.updatedDate">Updated Date</Translate>
                </Label>
                <AvInput
                  id="person-updatedDate"
                  type="datetime-local"
                  className="form-control"
                  name="updatedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.personEntity.updatedDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label for="person-address">
                  <Translate contentKey="gadiApp.person.address">Address</Translate>
                </Label>
                <AvInput id="person-address" type="select" className="form-control" name="address.id">
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
                <Label for="person-homePhone">
                  <Translate contentKey="gadiApp.person.homePhone">Home Phone</Translate>
                </Label>
                <AvInput id="person-homePhone" type="select" className="form-control" name="homePhone.id">
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
                <Label for="person-workPhone">
                  <Translate contentKey="gadiApp.person.workPhone">Work Phone</Translate>
                </Label>
                <AvInput id="person-workPhone" type="select" className="form-control" name="workPhone.id">
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
                <Label for="person-mobilePhone">
                  <Translate contentKey="gadiApp.person.mobilePhone">Mobile Phone</Translate>
                </Label>
                <AvInput id="person-mobilePhone" type="select" className="form-control" name="mobilePhone.id">
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
                <Label for="person-email">
                  <Translate contentKey="gadiApp.person.email">Email</Translate>
                </Label>
                <AvInput id="person-email" type="select" className="form-control" name="email.id">
                  <option value="" key="0" />
                  {emails
                    ? emails.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/person" replace color="info">
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
  phoneNumbers: storeState.phoneNumber.entities,
  emails: storeState.email.entities,
  personEntity: storeState.person.entity,
  loading: storeState.person.loading,
  updating: storeState.person.updating,
  updateSuccess: storeState.person.updateSuccess,
});

const mapDispatchToProps = {
  getAddresses,
  getPhoneNumbers,
  getEmails,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PersonUpdate);
