import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './eye-color.reducer';
import { IEyeColor } from 'app/shared/model/eye-color.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEyeColorDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EyeColorDetail = (props: IEyeColorDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { eyeColorEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gadiApp.eyeColor.detail.title">EyeColor</Translate> [<b>{eyeColorEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="gadiApp.eyeColor.name">Name</Translate>
            </span>
          </dt>
          <dd>{eyeColorEntity.name}</dd>
          <dt>
            <span id="identifier">
              <Translate contentKey="gadiApp.eyeColor.identifier">Identifier</Translate>
            </span>
          </dt>
          <dd>{eyeColorEntity.identifier}</dd>
          <dt>
            <span id="orderValue">
              <Translate contentKey="gadiApp.eyeColor.orderValue">Order Value</Translate>
            </span>
          </dt>
          <dd>{eyeColorEntity.orderValue}</dd>
          <dt>
            <span id="defaultValue">
              <Translate contentKey="gadiApp.eyeColor.defaultValue">Default Value</Translate>
            </span>
          </dt>
          <dd>{eyeColorEntity.defaultValue ? 'true' : 'false'}</dd>
          <dt>
            <span id="active">
              <Translate contentKey="gadiApp.eyeColor.active">Active</Translate>
            </span>
          </dt>
          <dd>{eyeColorEntity.active ? 'true' : 'false'}</dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="gadiApp.eyeColor.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{eyeColorEntity.createdBy}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="gadiApp.eyeColor.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>
            {eyeColorEntity.createdDate ? <TextFormat value={eyeColorEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="updatedBy">
              <Translate contentKey="gadiApp.eyeColor.updatedBy">Updated By</Translate>
            </span>
          </dt>
          <dd>{eyeColorEntity.updatedBy}</dd>
          <dt>
            <span id="updatedDate">
              <Translate contentKey="gadiApp.eyeColor.updatedDate">Updated Date</Translate>
            </span>
          </dt>
          <dd>
            {eyeColorEntity.updatedDate ? <TextFormat value={eyeColorEntity.updatedDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
        </dl>
        <Button tag={Link} to="/eye-color" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/eye-color/${eyeColorEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ eyeColor }: IRootState) => ({
  eyeColorEntity: eyeColor.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EyeColorDetail);
