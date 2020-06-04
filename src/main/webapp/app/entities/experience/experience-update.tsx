import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './experience.reducer';
import { IExperience } from 'app/shared/model/experience.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IExperienceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ExperienceUpdate = (props: IExperienceUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { experienceEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/experience');
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
    values.issueDate = convertDateTimeToServer(values.issueDate);
    values.expirationDate = convertDateTimeToServer(values.expirationDate);
    values.start = convertDateTimeToServer(values.start);
    values.end = convertDateTimeToServer(values.end);
    values.createdDate = convertDateTimeToServer(values.createdDate);
    values.updatedDate = convertDateTimeToServer(values.updatedDate);

    if (errors.length === 0) {
      const entity = {
        ...experienceEntity,
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
          <h2 id="gadiApp.experience.home.createOrEditLabel">
            <Translate contentKey="gadiApp.experience.home.createOrEditLabel">Create or edit a Experience</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : experienceEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="experience-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="experience-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="experience-name">
                  <Translate contentKey="gadiApp.experience.name">Name</Translate>
                </Label>
                <AvField
                  id="experience-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="identifierLabel" for="experience-identifier">
                  <Translate contentKey="gadiApp.experience.identifier">Identifier</Translate>
                </Label>
                <AvField id="experience-identifier" type="text" name="identifier" />
              </AvGroup>
              <AvGroup>
                <Label id="issuerIdentifierLabel" for="experience-issuerIdentifier">
                  <Translate contentKey="gadiApp.experience.issuerIdentifier">Issuer Identifier</Translate>
                </Label>
                <AvField id="experience-issuerIdentifier" type="text" name="issuerIdentifier" />
              </AvGroup>
              <AvGroup>
                <Label id="issueDateLabel" for="experience-issueDate">
                  <Translate contentKey="gadiApp.experience.issueDate">Issue Date</Translate>
                </Label>
                <AvInput
                  id="experience-issueDate"
                  type="datetime-local"
                  className="form-control"
                  name="issueDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.experienceEntity.issueDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="expirationDateLabel" for="experience-expirationDate">
                  <Translate contentKey="gadiApp.experience.expirationDate">Expiration Date</Translate>
                </Label>
                <AvInput
                  id="experience-expirationDate"
                  type="datetime-local"
                  className="form-control"
                  name="expirationDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.experienceEntity.expirationDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="titleLabel" for="experience-title">
                  <Translate contentKey="gadiApp.experience.title">Title</Translate>
                </Label>
                <AvField id="experience-title" type="text" name="title" />
              </AvGroup>
              <AvGroup>
                <Label id="startLabel" for="experience-start">
                  <Translate contentKey="gadiApp.experience.start">Start</Translate>
                </Label>
                <AvInput
                  id="experience-start"
                  type="datetime-local"
                  className="form-control"
                  name="start"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.experienceEntity.start)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="endLabel" for="experience-end">
                  <Translate contentKey="gadiApp.experience.end">End</Translate>
                </Label>
                <AvInput
                  id="experience-end"
                  type="datetime-local"
                  className="form-control"
                  name="end"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.experienceEntity.end)}
                />
              </AvGroup>
              <AvGroup check>
                <Label id="activeLabel">
                  <AvInput id="experience-active" type="checkbox" className="form-check-input" name="active" />
                  <Translate contentKey="gadiApp.experience.active">Active</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="experience-createdBy">
                  <Translate contentKey="gadiApp.experience.createdBy">Created By</Translate>
                </Label>
                <AvField id="experience-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="experience-createdDate">
                  <Translate contentKey="gadiApp.experience.createdDate">Created Date</Translate>
                </Label>
                <AvInput
                  id="experience-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.experienceEntity.createdDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="updatedByLabel" for="experience-updatedBy">
                  <Translate contentKey="gadiApp.experience.updatedBy">Updated By</Translate>
                </Label>
                <AvField id="experience-updatedBy" type="text" name="updatedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="updatedDateLabel" for="experience-updatedDate">
                  <Translate contentKey="gadiApp.experience.updatedDate">Updated Date</Translate>
                </Label>
                <AvInput
                  id="experience-updatedDate"
                  type="datetime-local"
                  className="form-control"
                  name="updatedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.experienceEntity.updatedDate)}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/experience" replace color="info">
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
  experienceEntity: storeState.experience.entity,
  loading: storeState.experience.loading,
  updating: storeState.experience.updating,
  updateSuccess: storeState.experience.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ExperienceUpdate);
