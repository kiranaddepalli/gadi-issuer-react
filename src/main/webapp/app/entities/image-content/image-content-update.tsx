import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IImageType } from 'app/shared/model/image-type.model';
import { getEntities as getImageTypes } from 'app/entities/image-type/image-type.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './image-content.reducer';
import { IImageContent } from 'app/shared/model/image-content.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IImageContentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ImageContentUpdate = (props: IImageContentUpdateProps) => {
  const [imageTypeId, setImageTypeId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { imageContentEntity, imageTypes, loading, updating } = props;

  const { content, contentContentType } = imageContentEntity;

  const handleClose = () => {
    props.history.push('/image-content');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getImageTypes();
  }, []);

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

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
        ...imageContentEntity,
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
          <h2 id="gadiApp.imageContent.home.createOrEditLabel">
            <Translate contentKey="gadiApp.imageContent.home.createOrEditLabel">Create or edit a ImageContent</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : imageContentEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="image-content-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="image-content-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="image-content-name">
                  <Translate contentKey="gadiApp.imageContent.name">Name</Translate>
                </Label>
                <AvField id="image-content-name" type="text" name="name" />
              </AvGroup>
              <AvGroup check>
                <Label id="externalLabel">
                  <AvInput id="image-content-external" type="checkbox" className="form-check-input" name="external" />
                  <Translate contentKey="gadiApp.imageContent.external">External</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="imageUrlLabel" for="image-content-imageUrl">
                  <Translate contentKey="gadiApp.imageContent.imageUrl">Image Url</Translate>
                </Label>
                <AvField id="image-content-imageUrl" type="text" name="imageUrl" />
              </AvGroup>
              <AvGroup>
                <Label id="sizeLabel" for="image-content-size">
                  <Translate contentKey="gadiApp.imageContent.size">Size</Translate>
                </Label>
                <AvField id="image-content-size" type="string" className="form-control" name="size" />
              </AvGroup>
              <AvGroup>
                <Label id="keywordsLabel" for="image-content-keywords">
                  <Translate contentKey="gadiApp.imageContent.keywords">Keywords</Translate>
                </Label>
                <AvField id="image-content-keywords" type="text" name="keywords" />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="contentLabel" for="content">
                    <Translate contentKey="gadiApp.imageContent.content">Content</Translate>
                  </Label>
                  <br />
                  {content ? (
                    <div>
                      {contentContentType ? (
                        <a onClick={openFile(contentContentType, content)}>
                          <img src={`data:${contentContentType};base64,${content}`} style={{ maxHeight: '100px' }} />
                        </a>
                      ) : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {contentContentType}, {byteSize(content)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('content')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_content" type="file" onChange={onBlobChange(true, 'content')} accept="image/*" />
                  <AvInput type="hidden" name="content" value={content} />
                </AvGroup>
              </AvGroup>
              <AvGroup check>
                <Label id="activeLabel">
                  <AvInput id="image-content-active" type="checkbox" className="form-check-input" name="active" />
                  <Translate contentKey="gadiApp.imageContent.active">Active</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="image-content-createdBy">
                  <Translate contentKey="gadiApp.imageContent.createdBy">Created By</Translate>
                </Label>
                <AvField id="image-content-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="image-content-createdDate">
                  <Translate contentKey="gadiApp.imageContent.createdDate">Created Date</Translate>
                </Label>
                <AvInput
                  id="image-content-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.imageContentEntity.createdDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="updatedByLabel" for="image-content-updatedBy">
                  <Translate contentKey="gadiApp.imageContent.updatedBy">Updated By</Translate>
                </Label>
                <AvField id="image-content-updatedBy" type="text" name="updatedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="updatedDateLabel" for="image-content-updatedDate">
                  <Translate contentKey="gadiApp.imageContent.updatedDate">Updated Date</Translate>
                </Label>
                <AvInput
                  id="image-content-updatedDate"
                  type="datetime-local"
                  className="form-control"
                  name="updatedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.imageContentEntity.updatedDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label for="image-content-imageType">
                  <Translate contentKey="gadiApp.imageContent.imageType">Image Type</Translate>
                </Label>
                <AvInput id="image-content-imageType" type="select" className="form-control" name="imageType.id">
                  <option value="" key="0" />
                  {imageTypes
                    ? imageTypes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/image-content" replace color="info">
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
  imageTypes: storeState.imageType.entities,
  imageContentEntity: storeState.imageContent.entity,
  loading: storeState.imageContent.loading,
  updating: storeState.imageContent.updating,
  updateSuccess: storeState.imageContent.updateSuccess,
});

const mapDispatchToProps = {
  getImageTypes,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ImageContentUpdate);
