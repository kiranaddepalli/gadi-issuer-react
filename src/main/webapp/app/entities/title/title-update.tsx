import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './title.reducer';
import { ITitle } from 'app/shared/model/title.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITitleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TitleUpdate = (props: ITitleUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { titleEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/title');
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
        ...titleEntity,
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
          <h2 id="gadiApp.title.home.createOrEditLabel">
            <Translate contentKey="gadiApp.title.home.createOrEditLabel">Create or edit a Title</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : titleEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="title-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="title-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="title-name">
                  <Translate contentKey="gadiApp.title.name">Name</Translate>
                </Label>
                <AvField
                  id="title-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="identifierLabel" for="title-identifier">
                  <Translate contentKey="gadiApp.title.identifier">Identifier</Translate>
                </Label>
                <AvField id="title-identifier" type="text" name="identifier" />
              </AvGroup>
              <AvGroup>
                <Label id="orderValueLabel" for="title-orderValue">
                  <Translate contentKey="gadiApp.title.orderValue">Order Value</Translate>
                </Label>
                <AvField id="title-orderValue" type="string" className="form-control" name="orderValue" />
              </AvGroup>
              <AvGroup check>
                <Label id="defaultValueLabel">
                  <AvInput id="title-defaultValue" type="checkbox" className="form-check-input" name="defaultValue" />
                  <Translate contentKey="gadiApp.title.defaultValue">Default Value</Translate>
                </Label>
              </AvGroup>
              <AvGroup check>
                <Label id="activeLabel">
                  <AvInput id="title-active" type="checkbox" className="form-check-input" name="active" />
                  <Translate contentKey="gadiApp.title.active">Active</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="title-createdBy">
                  <Translate contentKey="gadiApp.title.createdBy">Created By</Translate>
                </Label>
                <AvField id="title-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="title-createdDate">
                  <Translate contentKey="gadiApp.title.createdDate">Created Date</Translate>
                </Label>
                <AvInput
                  id="title-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.titleEntity.createdDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="updatedByLabel" for="title-updatedBy">
                  <Translate contentKey="gadiApp.title.updatedBy">Updated By</Translate>
                </Label>
                <AvField id="title-updatedBy" type="text" name="updatedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="updatedDateLabel" for="title-updatedDate">
                  <Translate contentKey="gadiApp.title.updatedDate">Updated Date</Translate>
                </Label>
                <AvInput
                  id="title-updatedDate"
                  type="datetime-local"
                  className="form-control"
                  name="updatedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.titleEntity.updatedDate)}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/title" replace color="info">
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
  titleEntity: storeState.title.entity,
  loading: storeState.title.loading,
  updating: storeState.title.updating,
  updateSuccess: storeState.title.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TitleUpdate);
