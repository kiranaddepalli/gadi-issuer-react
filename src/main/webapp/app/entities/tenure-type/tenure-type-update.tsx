import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './tenure-type.reducer';
import { ITenureType } from 'app/shared/model/tenure-type.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITenureTypeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TenureTypeUpdate = (props: ITenureTypeUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { tenureTypeEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/tenure-type');
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
        ...tenureTypeEntity,
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
          <h2 id="gadiApp.tenureType.home.createOrEditLabel">
            <Translate contentKey="gadiApp.tenureType.home.createOrEditLabel">Create or edit a TenureType</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : tenureTypeEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="tenure-type-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="tenure-type-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="tenure-type-name">
                  <Translate contentKey="gadiApp.tenureType.name">Name</Translate>
                </Label>
                <AvField
                  id="tenure-type-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="identifierLabel" for="tenure-type-identifier">
                  <Translate contentKey="gadiApp.tenureType.identifier">Identifier</Translate>
                </Label>
                <AvField id="tenure-type-identifier" type="text" name="identifier" />
              </AvGroup>
              <AvGroup>
                <Label id="orderValueLabel" for="tenure-type-orderValue">
                  <Translate contentKey="gadiApp.tenureType.orderValue">Order Value</Translate>
                </Label>
                <AvField id="tenure-type-orderValue" type="string" className="form-control" name="orderValue" />
              </AvGroup>
              <AvGroup check>
                <Label id="defaultValueLabel">
                  <AvInput id="tenure-type-defaultValue" type="checkbox" className="form-check-input" name="defaultValue" />
                  <Translate contentKey="gadiApp.tenureType.defaultValue">Default Value</Translate>
                </Label>
              </AvGroup>
              <AvGroup check>
                <Label id="activeLabel">
                  <AvInput id="tenure-type-active" type="checkbox" className="form-check-input" name="active" />
                  <Translate contentKey="gadiApp.tenureType.active">Active</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="tenure-type-createdBy">
                  <Translate contentKey="gadiApp.tenureType.createdBy">Created By</Translate>
                </Label>
                <AvField id="tenure-type-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="tenure-type-createdDate">
                  <Translate contentKey="gadiApp.tenureType.createdDate">Created Date</Translate>
                </Label>
                <AvInput
                  id="tenure-type-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.tenureTypeEntity.createdDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="updatedByLabel" for="tenure-type-updatedBy">
                  <Translate contentKey="gadiApp.tenureType.updatedBy">Updated By</Translate>
                </Label>
                <AvField id="tenure-type-updatedBy" type="text" name="updatedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="updatedDateLabel" for="tenure-type-updatedDate">
                  <Translate contentKey="gadiApp.tenureType.updatedDate">Updated Date</Translate>
                </Label>
                <AvInput
                  id="tenure-type-updatedDate"
                  type="datetime-local"
                  className="form-control"
                  name="updatedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.tenureTypeEntity.updatedDate)}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/tenure-type" replace color="info">
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
  tenureTypeEntity: storeState.tenureType.entity,
  loading: storeState.tenureType.loading,
  updating: storeState.tenureType.updating,
  updateSuccess: storeState.tenureType.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TenureTypeUpdate);
