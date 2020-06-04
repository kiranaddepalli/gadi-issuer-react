import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IGender } from 'app/shared/model/gender.model';
import { getEntities as getGenders } from 'app/entities/gender/gender.reducer';
import { ICountry } from 'app/shared/model/country.model';
import { getEntities as getCountries } from 'app/entities/country/country.reducer';
import { IImageContent } from 'app/shared/model/image-content.model';
import { getEntities as getImageContents } from 'app/entities/image-content/image-content.reducer';
import { getEntity, updateEntity, createEntity, reset } from './passport.reducer';
import { IPassport } from 'app/shared/model/passport.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPassportUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PassportUpdate = (props: IPassportUpdateProps) => {
  const [genderId, setGenderId] = useState('0');
  const [nationalityId, setNationalityId] = useState('0');
  const [holderImageId, setHolderImageId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { passportEntity, genders, countries, imageContents, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/passport');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getGenders();
    props.getCountries();
    props.getImageContents();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.issueDate = convertDateTimeToServer(values.issueDate);
    values.expirationDate = convertDateTimeToServer(values.expirationDate);
    values.birthDate = convertDateTimeToServer(values.birthDate);
    values.createdDate = convertDateTimeToServer(values.createdDate);
    values.updatedDate = convertDateTimeToServer(values.updatedDate);

    if (errors.length === 0) {
      const entity = {
        ...passportEntity,
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
          <h2 id="gadiApp.passport.home.createOrEditLabel">
            <Translate contentKey="gadiApp.passport.home.createOrEditLabel">Create or edit a Passport</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : passportEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="passport-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="passport-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="passport-name">
                  <Translate contentKey="gadiApp.passport.name">Name</Translate>
                </Label>
                <AvField
                  id="passport-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="identifierLabel" for="passport-identifier">
                  <Translate contentKey="gadiApp.passport.identifier">Identifier</Translate>
                </Label>
                <AvField id="passport-identifier" type="text" name="identifier" />
              </AvGroup>
              <AvGroup>
                <Label id="issuerIdentifierLabel" for="passport-issuerIdentifier">
                  <Translate contentKey="gadiApp.passport.issuerIdentifier">Issuer Identifier</Translate>
                </Label>
                <AvField id="passport-issuerIdentifier" type="text" name="issuerIdentifier" />
              </AvGroup>
              <AvGroup>
                <Label id="issueDateLabel" for="passport-issueDate">
                  <Translate contentKey="gadiApp.passport.issueDate">Issue Date</Translate>
                </Label>
                <AvInput
                  id="passport-issueDate"
                  type="datetime-local"
                  className="form-control"
                  name="issueDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.passportEntity.issueDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="expirationDateLabel" for="passport-expirationDate">
                  <Translate contentKey="gadiApp.passport.expirationDate">Expiration Date</Translate>
                </Label>
                <AvInput
                  id="passport-expirationDate"
                  type="datetime-local"
                  className="form-control"
                  name="expirationDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.passportEntity.expirationDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="classCodeLabel" for="passport-classCode">
                  <Translate contentKey="gadiApp.passport.classCode">Class Code</Translate>
                </Label>
                <AvField id="passport-classCode" type="text" name="classCode" />
              </AvGroup>
              <AvGroup>
                <Label id="birthDateLabel" for="passport-birthDate">
                  <Translate contentKey="gadiApp.passport.birthDate">Birth Date</Translate>
                </Label>
                <AvInput
                  id="passport-birthDate"
                  type="datetime-local"
                  className="form-control"
                  name="birthDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.passportEntity.birthDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="heightFeetLabel" for="passport-heightFeet">
                  <Translate contentKey="gadiApp.passport.heightFeet">Height Feet</Translate>
                </Label>
                <AvField id="passport-heightFeet" type="string" className="form-control" name="heightFeet" />
              </AvGroup>
              <AvGroup>
                <Label id="heightInchesLabel" for="passport-heightInches">
                  <Translate contentKey="gadiApp.passport.heightInches">Height Inches</Translate>
                </Label>
                <AvField id="passport-heightInches" type="string" className="form-control" name="heightInches" />
              </AvGroup>
              <AvGroup check>
                <Label id="activeLabel">
                  <AvInput id="passport-active" type="checkbox" className="form-check-input" name="active" />
                  <Translate contentKey="gadiApp.passport.active">Active</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="passport-createdBy">
                  <Translate contentKey="gadiApp.passport.createdBy">Created By</Translate>
                </Label>
                <AvField id="passport-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="passport-createdDate">
                  <Translate contentKey="gadiApp.passport.createdDate">Created Date</Translate>
                </Label>
                <AvInput
                  id="passport-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.passportEntity.createdDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="updatedByLabel" for="passport-updatedBy">
                  <Translate contentKey="gadiApp.passport.updatedBy">Updated By</Translate>
                </Label>
                <AvField id="passport-updatedBy" type="text" name="updatedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="updatedDateLabel" for="passport-updatedDate">
                  <Translate contentKey="gadiApp.passport.updatedDate">Updated Date</Translate>
                </Label>
                <AvInput
                  id="passport-updatedDate"
                  type="datetime-local"
                  className="form-control"
                  name="updatedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.passportEntity.updatedDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label for="passport-gender">
                  <Translate contentKey="gadiApp.passport.gender">Gender</Translate>
                </Label>
                <AvInput id="passport-gender" type="select" className="form-control" name="gender.id">
                  <option value="" key="0" />
                  {genders
                    ? genders.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="passport-nationality">
                  <Translate contentKey="gadiApp.passport.nationality">Nationality</Translate>
                </Label>
                <AvInput id="passport-nationality" type="select" className="form-control" name="nationality.id">
                  <option value="" key="0" />
                  {countries
                    ? countries.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="passport-holderImage">
                  <Translate contentKey="gadiApp.passport.holderImage">Holder Image</Translate>
                </Label>
                <AvInput id="passport-holderImage" type="select" className="form-control" name="holderImage.id">
                  <option value="" key="0" />
                  {imageContents
                    ? imageContents.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/passport" replace color="info">
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
  genders: storeState.gender.entities,
  countries: storeState.country.entities,
  imageContents: storeState.imageContent.entities,
  passportEntity: storeState.passport.entity,
  loading: storeState.passport.loading,
  updating: storeState.passport.updating,
  updateSuccess: storeState.passport.updateSuccess,
});

const mapDispatchToProps = {
  getGenders,
  getCountries,
  getImageContents,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PassportUpdate);
