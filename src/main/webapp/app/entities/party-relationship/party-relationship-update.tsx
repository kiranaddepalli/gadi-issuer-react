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
import { IPartyType } from 'app/shared/model/party-type.model';
import { getEntities as getPartyTypes } from 'app/entities/party-type/party-type.reducer';
import { getEntity, updateEntity, createEntity, reset } from './party-relationship.reducer';
import { IPartyRelationship } from 'app/shared/model/party-relationship.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPartyRelationshipUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PartyRelationshipUpdate = (props: IPartyRelationshipUpdateProps) => {
  const [partyRoleId, setPartyRoleId] = useState('0');
  const [fromPartyTypeId, setFromPartyTypeId] = useState('0');
  const [toPartyTypeId, setToPartyTypeId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { partyRelationshipEntity, partyRoles, partyTypes, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/party-relationship');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getPartyRoles();
    props.getPartyTypes();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.toParty = convertDateTimeToServer(values.toParty);
    values.fromDate = convertDateTimeToServer(values.fromDate);

    if (errors.length === 0) {
      const entity = {
        ...partyRelationshipEntity,
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
          <h2 id="gadiApp.partyRelationship.home.createOrEditLabel">
            <Translate contentKey="gadiApp.partyRelationship.home.createOrEditLabel">Create or edit a PartyRelationship</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : partyRelationshipEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="party-relationship-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="party-relationship-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="fromPartyLabel" for="party-relationship-fromParty">
                  <Translate contentKey="gadiApp.partyRelationship.fromParty">From Party</Translate>
                </Label>
                <AvField id="party-relationship-fromParty" type="string" className="form-control" name="fromParty" />
              </AvGroup>
              <AvGroup>
                <Label id="toPartyLabel" for="party-relationship-toParty">
                  <Translate contentKey="gadiApp.partyRelationship.toParty">To Party</Translate>
                </Label>
                <AvInput
                  id="party-relationship-toParty"
                  type="datetime-local"
                  className="form-control"
                  name="toParty"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.partyRelationshipEntity.toParty)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="fromDateLabel" for="party-relationship-fromDate">
                  <Translate contentKey="gadiApp.partyRelationship.fromDate">From Date</Translate>
                </Label>
                <AvInput
                  id="party-relationship-fromDate"
                  type="datetime-local"
                  className="form-control"
                  name="fromDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.partyRelationshipEntity.fromDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label for="party-relationship-partyRole">
                  <Translate contentKey="gadiApp.partyRelationship.partyRole">Party Role</Translate>
                </Label>
                <AvInput id="party-relationship-partyRole" type="select" className="form-control" name="partyRole.id">
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
                <Label for="party-relationship-fromPartyType">
                  <Translate contentKey="gadiApp.partyRelationship.fromPartyType">From Party Type</Translate>
                </Label>
                <AvInput id="party-relationship-fromPartyType" type="select" className="form-control" name="fromPartyType.id">
                  <option value="" key="0" />
                  {partyTypes
                    ? partyTypes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="party-relationship-toPartyType">
                  <Translate contentKey="gadiApp.partyRelationship.toPartyType">To Party Type</Translate>
                </Label>
                <AvInput id="party-relationship-toPartyType" type="select" className="form-control" name="toPartyType.id">
                  <option value="" key="0" />
                  {partyTypes
                    ? partyTypes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/party-relationship" replace color="info">
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
  partyTypes: storeState.partyType.entities,
  partyRelationshipEntity: storeState.partyRelationship.entity,
  loading: storeState.partyRelationship.loading,
  updating: storeState.partyRelationship.updating,
  updateSuccess: storeState.partyRelationship.updateSuccess,
});

const mapDispatchToProps = {
  getPartyRoles,
  getPartyTypes,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PartyRelationshipUpdate);
