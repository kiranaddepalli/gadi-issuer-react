import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEmailType } from 'app/shared/model/email-type.model';
import { getEntities as getEmailTypes } from 'app/entities/email-type/email-type.reducer';
import { getEntity, updateEntity, createEntity, reset } from './email.reducer';
import { IEmail } from 'app/shared/model/email.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEmailUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmailUpdate = (props: IEmailUpdateProps) => {
  const [emailTypeId, setEmailTypeId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { emailEntity, emailTypes, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/email');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getEmailTypes();
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
        ...emailEntity,
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
          <h2 id="gadiApp.email.home.createOrEditLabel">
            <Translate contentKey="gadiApp.email.home.createOrEditLabel">Create or edit a Email</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : emailEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="email-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="email-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="addressLabel" for="email-address">
                  <Translate contentKey="gadiApp.email.address">Address</Translate>
                </Label>
                <AvField id="email-address" type="string" className="form-control" name="address" />
              </AvGroup>
              <AvGroup check>
                <Label id="activeLabel">
                  <AvInput id="email-active" type="checkbox" className="form-check-input" name="active" />
                  <Translate contentKey="gadiApp.email.active">Active</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="email-createdBy">
                  <Translate contentKey="gadiApp.email.createdBy">Created By</Translate>
                </Label>
                <AvField id="email-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="email-createdDate">
                  <Translate contentKey="gadiApp.email.createdDate">Created Date</Translate>
                </Label>
                <AvInput
                  id="email-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.emailEntity.createdDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="updatedByLabel" for="email-updatedBy">
                  <Translate contentKey="gadiApp.email.updatedBy">Updated By</Translate>
                </Label>
                <AvField id="email-updatedBy" type="text" name="updatedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="updatedDateLabel" for="email-updatedDate">
                  <Translate contentKey="gadiApp.email.updatedDate">Updated Date</Translate>
                </Label>
                <AvInput
                  id="email-updatedDate"
                  type="datetime-local"
                  className="form-control"
                  name="updatedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.emailEntity.updatedDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label for="email-emailType">
                  <Translate contentKey="gadiApp.email.emailType">Email Type</Translate>
                </Label>
                <AvInput id="email-emailType" type="select" className="form-control" name="emailType.id">
                  <option value="" key="0" />
                  {emailTypes
                    ? emailTypes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/email" replace color="info">
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
  emailTypes: storeState.emailType.entities,
  emailEntity: storeState.email.entity,
  loading: storeState.email.loading,
  updating: storeState.email.updating,
  updateSuccess: storeState.email.updateSuccess,
});

const mapDispatchToProps = {
  getEmailTypes,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmailUpdate);
