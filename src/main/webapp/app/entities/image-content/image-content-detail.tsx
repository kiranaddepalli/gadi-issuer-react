import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './image-content.reducer';
import { IImageContent } from 'app/shared/model/image-content.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IImageContentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ImageContentDetail = (props: IImageContentDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { imageContentEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gadiApp.imageContent.detail.title">ImageContent</Translate> [<b>{imageContentEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="gadiApp.imageContent.name">Name</Translate>
            </span>
          </dt>
          <dd>{imageContentEntity.name}</dd>
          <dt>
            <span id="external">
              <Translate contentKey="gadiApp.imageContent.external">External</Translate>
            </span>
          </dt>
          <dd>{imageContentEntity.external ? 'true' : 'false'}</dd>
          <dt>
            <span id="imageUrl">
              <Translate contentKey="gadiApp.imageContent.imageUrl">Image Url</Translate>
            </span>
          </dt>
          <dd>{imageContentEntity.imageUrl}</dd>
          <dt>
            <span id="size">
              <Translate contentKey="gadiApp.imageContent.size">Size</Translate>
            </span>
          </dt>
          <dd>{imageContentEntity.size}</dd>
          <dt>
            <span id="keywords">
              <Translate contentKey="gadiApp.imageContent.keywords">Keywords</Translate>
            </span>
          </dt>
          <dd>{imageContentEntity.keywords}</dd>
          <dt>
            <span id="content">
              <Translate contentKey="gadiApp.imageContent.content">Content</Translate>
            </span>
          </dt>
          <dd>
            {imageContentEntity.content ? (
              <div>
                {imageContentEntity.contentContentType ? (
                  <a onClick={openFile(imageContentEntity.contentContentType, imageContentEntity.content)}>
                    <img
                      src={`data:${imageContentEntity.contentContentType};base64,${imageContentEntity.content}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                ) : null}
                <span>
                  {imageContentEntity.contentContentType}, {byteSize(imageContentEntity.content)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="active">
              <Translate contentKey="gadiApp.imageContent.active">Active</Translate>
            </span>
          </dt>
          <dd>{imageContentEntity.active ? 'true' : 'false'}</dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="gadiApp.imageContent.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{imageContentEntity.createdBy}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="gadiApp.imageContent.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>
            {imageContentEntity.createdDate ? (
              <TextFormat value={imageContentEntity.createdDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="updatedBy">
              <Translate contentKey="gadiApp.imageContent.updatedBy">Updated By</Translate>
            </span>
          </dt>
          <dd>{imageContentEntity.updatedBy}</dd>
          <dt>
            <span id="updatedDate">
              <Translate contentKey="gadiApp.imageContent.updatedDate">Updated Date</Translate>
            </span>
          </dt>
          <dd>
            {imageContentEntity.updatedDate ? (
              <TextFormat value={imageContentEntity.updatedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="gadiApp.imageContent.imageType">Image Type</Translate>
          </dt>
          <dd>{imageContentEntity.imageType ? imageContentEntity.imageType.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/image-content" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/image-content/${imageContentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ imageContent }: IRootState) => ({
  imageContentEntity: imageContent.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ImageContentDetail);
