import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IState } from 'app/shared/model/state.model';
import { getEntities as getStates } from 'app/entities/state/state.reducer';
import { IAddressType } from 'app/shared/model/address-type.model';
import { getEntities as getAddressTypes } from 'app/entities/address-type/address-type.reducer';
import { getEntity, updateEntity, createEntity, reset } from './address.reducer';
import { IAddress } from 'app/shared/model/address.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAddressUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AddressUpdate = (props: IAddressUpdateProps) => {
  const [stateId, setStateId] = useState('0');
  const [addressTypeId, setAddressTypeId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { addressEntity, states, addressTypes, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/address');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getStates();
    props.getAddressTypes();
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
        ...addressEntity,
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
          <h2 id="gadiApp.address.home.createOrEditLabel">
            <Translate contentKey="gadiApp.address.home.createOrEditLabel">Create or edit a Address</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : addressEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="address-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="address-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="addressLine1Label" for="address-addressLine1">
                  <Translate contentKey="gadiApp.address.addressLine1">Address Line 1</Translate>
                </Label>
                <AvField id="address-addressLine1" type="text" name="addressLine1" />
              </AvGroup>
              <AvGroup>
                <Label id="addressLine2Label" for="address-addressLine2">
                  <Translate contentKey="gadiApp.address.addressLine2">Address Line 2</Translate>
                </Label>
                <AvField id="address-addressLine2" type="text" name="addressLine2" />
              </AvGroup>
              <AvGroup>
                <Label id="cityLabel" for="address-city">
                  <Translate contentKey="gadiApp.address.city">City</Translate>
                </Label>
                <AvField id="address-city" type="text" name="city" />
              </AvGroup>
              <AvGroup>
                <Label id="zipcodeLabel" for="address-zipcode">
                  <Translate contentKey="gadiApp.address.zipcode">Zipcode</Translate>
                </Label>
                <AvField id="address-zipcode" type="text" name="zipcode" />
              </AvGroup>
              <AvGroup>
                <Label id="latitudeLabel" for="address-latitude">
                  <Translate contentKey="gadiApp.address.latitude">Latitude</Translate>
                </Label>
                <AvField id="address-latitude" type="string" className="form-control" name="latitude" />
              </AvGroup>
              <AvGroup>
                <Label id="longitudeLabel" for="address-longitude">
                  <Translate contentKey="gadiApp.address.longitude">Longitude</Translate>
                </Label>
                <AvField id="address-longitude" type="string" className="form-control" name="longitude" />
              </AvGroup>
              <AvGroup check>
                <Label id="activeLabel">
                  <AvInput id="address-active" type="checkbox" className="form-check-input" name="active" />
                  <Translate contentKey="gadiApp.address.active">Active</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="address-createdBy">
                  <Translate contentKey="gadiApp.address.createdBy">Created By</Translate>
                </Label>
                <AvField id="address-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="address-createdDate">
                  <Translate contentKey="gadiApp.address.createdDate">Created Date</Translate>
                </Label>
                <AvInput
                  id="address-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.addressEntity.createdDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="updatedByLabel" for="address-updatedBy">
                  <Translate contentKey="gadiApp.address.updatedBy">Updated By</Translate>
                </Label>
                <AvField id="address-updatedBy" type="text" name="updatedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="updatedDateLabel" for="address-updatedDate">
                  <Translate contentKey="gadiApp.address.updatedDate">Updated Date</Translate>
                </Label>
                <AvInput
                  id="address-updatedDate"
                  type="datetime-local"
                  className="form-control"
                  name="updatedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.addressEntity.updatedDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label for="address-state">
                  <Translate contentKey="gadiApp.address.state">State</Translate>
                </Label>
                <AvInput id="address-state" type="select" className="form-control" name="state.id">
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
                <Label for="address-addressType">
                  <Translate contentKey="gadiApp.address.addressType">Address Type</Translate>
                </Label>
                <AvInput id="address-addressType" type="select" className="form-control" name="addressType.id">
                  <option value="" key="0" />
                  {addressTypes
                    ? addressTypes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/address" replace color="info">
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
  states: storeState.state.entities,
  addressTypes: storeState.addressType.entities,
  addressEntity: storeState.address.entity,
  loading: storeState.address.loading,
  updating: storeState.address.updating,
  updateSuccess: storeState.address.updateSuccess,
});

const mapDispatchToProps = {
  getStates,
  getAddressTypes,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AddressUpdate);
