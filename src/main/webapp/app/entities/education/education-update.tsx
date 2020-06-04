import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITenureType } from 'app/shared/model/tenure-type.model';
import { getEntities as getTenureTypes } from 'app/entities/tenure-type/tenure-type.reducer';
import { getEntity, updateEntity, createEntity, reset } from './education.reducer';
import { IEducation } from 'app/shared/model/education.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEducationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EducationUpdate = (props: IEducationUpdateProps) => {
  const [tenureId, setTenureId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { educationEntity, tenureTypes, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/education');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getTenureTypes();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.issueDate = convertDateTimeToServer(values.issueDate);
    values.expirationDate = convertDateTimeToServer(values.expirationDate);
    values.start = convertDateTimeToServer(values.start);
    values.end = convertDateTimeToServer(values.end);
    values.createdDate = convertDateTimeToServer(values.createdDate);
    values.updatedDate = convertDateTimeToServer(values.updatedDate);

    if (errors.length === 0) {
      const entity = {
        ...educationEntity,
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
          <h2 id="gadiApp.education.home.createOrEditLabel">
            <Translate contentKey="gadiApp.education.home.createOrEditLabel">Create or edit a Education</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : educationEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="education-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="education-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="education-name">
                  <Translate contentKey="gadiApp.education.name">Name</Translate>
                </Label>
                <AvField
                  id="education-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="identifierLabel" for="education-identifier">
                  <Translate contentKey="gadiApp.education.identifier">Identifier</Translate>
                </Label>
                <AvField id="education-identifier" type="text" name="identifier" />
              </AvGroup>
              <AvGroup>
                <Label id="issuerIdentifierLabel" for="education-issuerIdentifier">
                  <Translate contentKey="gadiApp.education.issuerIdentifier">Issuer Identifier</Translate>
                </Label>
                <AvField id="education-issuerIdentifier" type="text" name="issuerIdentifier" />
              </AvGroup>
              <AvGroup>
                <Label id="issueDateLabel" for="education-issueDate">
                  <Translate contentKey="gadiApp.education.issueDate">Issue Date</Translate>
                </Label>
                <AvInput
                  id="education-issueDate"
                  type="datetime-local"
                  className="form-control"
                  name="issueDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.educationEntity.issueDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="expirationDateLabel" for="education-expirationDate">
                  <Translate contentKey="gadiApp.education.expirationDate">Expiration Date</Translate>
                </Label>
                <AvInput
                  id="education-expirationDate"
                  type="datetime-local"
                  className="form-control"
                  name="expirationDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.educationEntity.expirationDate)}
                />
              </AvGroup>
              <AvGroup check>
                <Label id="completedLabel">
                  <AvInput id="education-completed" type="checkbox" className="form-check-input" name="completed" />
                  <Translate contentKey="gadiApp.education.completed">Completed</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="startLabel" for="education-start">
                  <Translate contentKey="gadiApp.education.start">Start</Translate>
                </Label>
                <AvInput
                  id="education-start"
                  type="datetime-local"
                  className="form-control"
                  name="start"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.educationEntity.start)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="endLabel" for="education-end">
                  <Translate contentKey="gadiApp.education.end">End</Translate>
                </Label>
                <AvInput
                  id="education-end"
                  type="datetime-local"
                  className="form-control"
                  name="end"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.educationEntity.end)}
                />
              </AvGroup>
              <AvGroup check>
                <Label id="activeLabel">
                  <AvInput id="education-active" type="checkbox" className="form-check-input" name="active" />
                  <Translate contentKey="gadiApp.education.active">Active</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="education-createdBy">
                  <Translate contentKey="gadiApp.education.createdBy">Created By</Translate>
                </Label>
                <AvField id="education-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="education-createdDate">
                  <Translate contentKey="gadiApp.education.createdDate">Created Date</Translate>
                </Label>
                <AvInput
                  id="education-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.educationEntity.createdDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="updatedByLabel" for="education-updatedBy">
                  <Translate contentKey="gadiApp.education.updatedBy">Updated By</Translate>
                </Label>
                <AvField id="education-updatedBy" type="text" name="updatedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="updatedDateLabel" for="education-updatedDate">
                  <Translate contentKey="gadiApp.education.updatedDate">Updated Date</Translate>
                </Label>
                <AvInput
                  id="education-updatedDate"
                  type="datetime-local"
                  className="form-control"
                  name="updatedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.educationEntity.updatedDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label for="education-tenure">
                  <Translate contentKey="gadiApp.education.tenure">Tenure</Translate>
                </Label>
                <AvInput id="education-tenure" type="select" className="form-control" name="tenure.id">
                  <option value="" key="0" />
                  {tenureTypes
                    ? tenureTypes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/education" replace color="info">
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
  tenureTypes: storeState.tenureType.entities,
  educationEntity: storeState.education.entity,
  loading: storeState.education.loading,
  updating: storeState.education.updating,
  updateSuccess: storeState.education.updateSuccess,
});

const mapDispatchToProps = {
  getTenureTypes,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EducationUpdate);
