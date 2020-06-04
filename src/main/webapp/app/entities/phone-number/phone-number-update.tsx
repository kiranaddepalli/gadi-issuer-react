import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPhoneType } from 'app/shared/model/phone-type.model';
import { getEntities as getPhoneTypes } from 'app/entities/phone-type/phone-type.reducer';
import { getEntity, updateEntity, createEntity, reset } from './phone-number.reducer';
import { IPhoneNumber } from 'app/shared/model/phone-number.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPhoneNumberUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PhoneNumberUpdate = (props: IPhoneNumberUpdateProps) => {
  const [phoneTypeId, setPhoneTypeId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { phoneNumberEntity, phoneTypes, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/phone-number');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getPhoneTypes();
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
        ...phoneNumberEntity,
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
          <h2 id="gadiApp.phoneNumber.home.createOrEditLabel">
            <Translate contentKey="gadiApp.phoneNumber.home.createOrEditLabel">Create or edit a PhoneNumber</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : phoneNumberEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="phone-number-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="phone-number-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="countryCodeLabel" for="phone-number-countryCode">
                  <Translate contentKey="gadiApp.phoneNumber.countryCode">Country Code</Translate>
                </Label>
                <AvField id="phone-number-countryCode" type="string" className="form-control" name="countryCode" />
              </AvGroup>
              <AvGroup>
                <Label id="areaCodeLabel" for="phone-number-areaCode">
                  <Translate contentKey="gadiApp.phoneNumber.areaCode">Area Code</Translate>
                </Label>
                <AvField id="phone-number-areaCode" type="string" className="form-control" name="areaCode" />
              </AvGroup>
              <AvGroup>
                <Label id="phoneNumberLabel" for="phone-number-phoneNumber">
                  <Translate contentKey="gadiApp.phoneNumber.phoneNumber">Phone Number</Translate>
                </Label>
                <AvField id="phone-number-phoneNumber" type="text" name="phoneNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="extensionLabel" for="phone-number-extension">
                  <Translate contentKey="gadiApp.phoneNumber.extension">Extension</Translate>
                </Label>
                <AvField id="phone-number-extension" type="string" className="form-control" name="extension" />
              </AvGroup>
              <AvGroup check>
                <Label id="activeLabel">
                  <AvInput id="phone-number-active" type="checkbox" className="form-check-input" name="active" />
                  <Translate contentKey="gadiApp.phoneNumber.active">Active</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="phone-number-createdBy">
                  <Translate contentKey="gadiApp.phoneNumber.createdBy">Created By</Translate>
                </Label>
                <AvField id="phone-number-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="phone-number-createdDate">
                  <Translate contentKey="gadiApp.phoneNumber.createdDate">Created Date</Translate>
                </Label>
                <AvInput
                  id="phone-number-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.phoneNumberEntity.createdDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="updatedByLabel" for="phone-number-updatedBy">
                  <Translate contentKey="gadiApp.phoneNumber.updatedBy">Updated By</Translate>
                </Label>
                <AvField id="phone-number-updatedBy" type="text" name="updatedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="updatedDateLabel" for="phone-number-updatedDate">
                  <Translate contentKey="gadiApp.phoneNumber.updatedDate">Updated Date</Translate>
                </Label>
                <AvInput
                  id="phone-number-updatedDate"
                  type="datetime-local"
                  className="form-control"
                  name="updatedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.phoneNumberEntity.updatedDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label for="phone-number-phoneType">
                  <Translate contentKey="gadiApp.phoneNumber.phoneType">Phone Type</Translate>
                </Label>
                <AvInput id="phone-number-phoneType" type="select" className="form-control" name="phoneType.id">
                  <option value="" key="0" />
                  {phoneTypes
                    ? phoneTypes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/phone-number" replace color="info">
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
  phoneTypes: storeState.phoneType.entities,
  phoneNumberEntity: storeState.phoneNumber.entity,
  loading: storeState.phoneNumber.loading,
  updating: storeState.phoneNumber.updating,
  updateSuccess: storeState.phoneNumber.updateSuccess,
});

const mapDispatchToProps = {
  getPhoneTypes,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PhoneNumberUpdate);
