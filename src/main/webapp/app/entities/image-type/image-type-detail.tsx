import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './image-type.reducer';
import { IImageType } from 'app/shared/model/image-type.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IImageTypeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ImageTypeDetail = (props: IImageTypeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { imageTypeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gadiApp.imageType.detail.title">ImageType</Translate> [<b>{imageTypeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="gadiApp.imageType.name">Name</Translate>
            </span>
          </dt>
          <dd>{imageTypeEntity.name}</dd>
          <dt>
            <span id="mimeType">
              <Translate contentKey="gadiApp.imageType.mimeType">Mime Type</Translate>
            </span>
          </dt>
          <dd>{imageTypeEntity.mimeType}</dd>
          <dt>
            <span id="orderValue">
              <Translate contentKey="gadiApp.imageType.orderValue">Order Value</Translate>
            </span>
          </dt>
          <dd>{imageTypeEntity.orderValue}</dd>
          <dt>
            <span id="defaultValue">
              <Translate contentKey="gadiApp.imageType.defaultValue">Default Value</Translate>
            </span>
          </dt>
          <dd>{imageTypeEntity.defaultValue ? 'true' : 'false'}</dd>
          <dt>
            <span id="active">
              <Translate contentKey="gadiApp.imageType.active">Active</Translate>
            </span>
          </dt>
          <dd>{imageTypeEntity.active ? 'true' : 'false'}</dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="gadiApp.imageType.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{imageTypeEntity.createdBy}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="gadiApp.imageType.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>
            {imageTypeEntity.createdDate ? <TextFormat value={imageTypeEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="updatedBy">
              <Translate contentKey="gadiApp.imageType.updatedBy">Updated By</Translate>
            </span>
          </dt>
          <dd>{imageTypeEntity.updatedBy}</dd>
          <dt>
            <span id="updatedDate">
              <Translate contentKey="gadiApp.imageType.updatedDate">Updated Date</Translate>
            </span>
          </dt>
          <dd>
            {imageTypeEntity.updatedDate ? <TextFormat value={imageTypeEntity.updatedDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
        </dl>
        <Button tag={Link} to="/image-type" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/image-type/${imageTypeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ imageType }: IRootState) => ({
  imageTypeEntity: imageType.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ImageTypeDetail);
