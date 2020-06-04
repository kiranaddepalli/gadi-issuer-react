import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './gender.reducer';
import { IGender } from 'app/shared/model/gender.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IGenderUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const GenderUpdate = (props: IGenderUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { genderEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/gender');
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
        ...genderEntity,
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
          <h2 id="gadiApp.gender.home.createOrEditLabel">
            <Translate contentKey="gadiApp.gender.home.createOrEditLabel">Create or edit a Gender</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : genderEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="gender-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="gender-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="gender-name">
                  <Translate contentKey="gadiApp.gender.name">Name</Translate>
                </Label>
                <AvField
                  id="gender-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="identifierLabel" for="gender-identifier">
                  <Translate contentKey="gadiApp.gender.identifier">Identifier</Translate>
                </Label>
                <AvField id="gender-identifier" type="text" name="identifier" />
              </AvGroup>
              <AvGroup>
                <Label id="orderValueLabel" for="gender-orderValue">
                  <Translate contentKey="gadiApp.gender.orderValue">Order Value</Translate>
                </Label>
                <AvField id="gender-orderValue" type="string" className="form-control" name="orderValue" />
              </AvGroup>
              <AvGroup check>
                <Label id="defaultValueLabel">
                  <AvInput id="gender-defaultValue" type="checkbox" className="form-check-input" name="defaultValue" />
                  <Translate contentKey="gadiApp.gender.defaultValue">Default Value</Translate>
                </Label>
              </AvGroup>
              <AvGroup check>
                <Label id="activeLabel">
                  <AvInput id="gender-active" type="checkbox" className="form-check-input" name="active" />
                  <Translate contentKey="gadiApp.gender.active">Active</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="gender-createdBy">
                  <Translate contentKey="gadiApp.gender.createdBy">Created By</Translate>
                </Label>
                <AvField id="gender-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="gender-createdDate">
                  <Translate contentKey="gadiApp.gender.createdDate">Created Date</Translate>
                </Label>
                <AvInput
                  id="gender-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.genderEntity.createdDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="updatedByLabel" for="gender-updatedBy">
                  <Translate contentKey="gadiApp.gender.updatedBy">Updated By</Translate>
                </Label>
                <AvField id="gender-updatedBy" type="text" name="updatedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="updatedDateLabel" for="gender-updatedDate">
                  <Translate contentKey="gadiApp.gender.updatedDate">Updated Date</Translate>
                </Label>
                <AvInput
                  id="gender-updatedDate"
                  type="datetime-local"
                  className="form-control"
                  name="updatedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.genderEntity.updatedDate)}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/gender" replace color="info">
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
  genderEntity: storeState.gender.entity,
  loading: storeState.gender.loading,
  updating: storeState.gender.updating,
  updateSuccess: storeState.gender.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GenderUpdate);
