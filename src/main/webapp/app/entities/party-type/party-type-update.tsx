import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './party-type.reducer';
import { IPartyType } from 'app/shared/model/party-type.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPartyTypeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PartyTypeUpdate = (props: IPartyTypeUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { partyTypeEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/party-type');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
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
        ...partyTypeEntity,
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
          <h2 id="gadiApp.partyType.home.createOrEditLabel">
            <Translate contentKey="gadiApp.partyType.home.createOrEditLabel">Create or edit a PartyType</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : partyTypeEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="party-type-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="party-type-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="party-type-name">
                  <Translate contentKey="gadiApp.partyType.name">Name</Translate>
                </Label>
                <AvField
                  id="party-type-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="identifierLabel" for="party-type-identifier">
                  <Translate contentKey="gadiApp.partyType.identifier">Identifier</Translate>
                </Label>
                <AvField id="party-type-identifier" type="text" name="identifier" />
              </AvGroup>
              <AvGroup>
                <Label id="orderValueLabel" for="party-type-orderValue">
                  <Translate contentKey="gadiApp.partyType.orderValue">Order Value</Translate>
                </Label>
                <AvField id="party-type-orderValue" type="string" className="form-control" name="orderValue" />
              </AvGroup>
              <AvGroup check>
                <Label id="defaultValueLabel">
                  <AvInput id="party-type-defaultValue" type="checkbox" className="form-check-input" name="defaultValue" />
                  <Translate contentKey="gadiApp.partyType.defaultValue">Default Value</Translate>
                </Label>
              </AvGroup>
              <AvGroup check>
                <Label id="activeLabel">
                  <AvInput id="party-type-active" type="checkbox" className="form-check-input" name="active" />
                  <Translate contentKey="gadiApp.partyType.active">Active</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="party-type-createdBy">
                  <Translate contentKey="gadiApp.partyType.createdBy">Created By</Translate>
                </Label>
                <AvField id="party-type-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="party-type-createdDate">
                  <Translate contentKey="gadiApp.partyType.createdDate">Created Date</Translate>
                </Label>
                <AvInput
                  id="party-type-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.partyTypeEntity.createdDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="updatedByLabel" for="party-type-updatedBy">
                  <Translate contentKey="gadiApp.partyType.updatedBy">Updated By</Translate>
                </Label>
                <AvField id="party-type-updatedBy" type="text" name="updatedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="updatedDateLabel" for="party-type-updatedDate">
                  <Translate contentKey="gadiApp.partyType.updatedDate">Updated Date</Translate>
                </Label>
                <AvInput
                  id="party-type-updatedDate"
                  type="datetime-local"
                  className="form-control"
                  name="updatedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.partyTypeEntity.updatedDate)}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/party-type" replace color="info">
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
  partyTypeEntity: storeState.partyType.entity,
  loading: storeState.partyType.loading,
  updating: storeState.partyType.updating,
  updateSuccess: storeState.partyType.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PartyTypeUpdate);
