import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './party-role.reducer';
import { IPartyRole } from 'app/shared/model/party-role.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPartyRoleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PartyRoleUpdate = (props: IPartyRoleUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { partyRoleEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/party-role');
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
        ...partyRoleEntity,
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
          <h2 id="gadiApp.partyRole.home.createOrEditLabel">
            <Translate contentKey="gadiApp.partyRole.home.createOrEditLabel">Create or edit a PartyRole</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : partyRoleEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="party-role-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="party-role-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="party-role-name">
                  <Translate contentKey="gadiApp.partyRole.name">Name</Translate>
                </Label>
                <AvField
                  id="party-role-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="identifierLabel" for="party-role-identifier">
                  <Translate contentKey="gadiApp.partyRole.identifier">Identifier</Translate>
                </Label>
                <AvField id="party-role-identifier" type="text" name="identifier" />
              </AvGroup>
              <AvGroup>
                <Label id="orderValueLabel" for="party-role-orderValue">
                  <Translate contentKey="gadiApp.partyRole.orderValue">Order Value</Translate>
                </Label>
                <AvField id="party-role-orderValue" type="string" className="form-control" name="orderValue" />
              </AvGroup>
              <AvGroup check>
                <Label id="defaultValueLabel">
                  <AvInput id="party-role-defaultValue" type="checkbox" className="form-check-input" name="defaultValue" />
                  <Translate contentKey="gadiApp.partyRole.defaultValue">Default Value</Translate>
                </Label>
              </AvGroup>
              <AvGroup check>
                <Label id="activeLabel">
                  <AvInput id="party-role-active" type="checkbox" className="form-check-input" name="active" />
                  <Translate contentKey="gadiApp.partyRole.active">Active</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="party-role-createdBy">
                  <Translate contentKey="gadiApp.partyRole.createdBy">Created By</Translate>
                </Label>
                <AvField id="party-role-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="party-role-createdDate">
                  <Translate contentKey="gadiApp.partyRole.createdDate">Created Date</Translate>
                </Label>
                <AvInput
                  id="party-role-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.partyRoleEntity.createdDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="updatedByLabel" for="party-role-updatedBy">
                  <Translate contentKey="gadiApp.partyRole.updatedBy">Updated By</Translate>
                </Label>
                <AvField id="party-role-updatedBy" type="text" name="updatedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="updatedDateLabel" for="party-role-updatedDate">
                  <Translate contentKey="gadiApp.partyRole.updatedDate">Updated Date</Translate>
                </Label>
                <AvInput
                  id="party-role-updatedDate"
                  type="datetime-local"
                  className="form-control"
                  name="updatedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.partyRoleEntity.updatedDate)}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/party-role" replace color="info">
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
  partyRoleEntity: storeState.partyRole.entity,
  loading: storeState.partyRole.loading,
  updating: storeState.partyRole.updating,
  updateSuccess: storeState.partyRole.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PartyRoleUpdate);
