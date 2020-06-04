import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './tenure-type.reducer';
import { ITenureType } from 'app/shared/model/tenure-type.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITenureTypeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TenureTypeDetail = (props: ITenureTypeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { tenureTypeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gadiApp.tenureType.detail.title">TenureType</Translate> [<b>{tenureTypeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="gadiApp.tenureType.name">Name</Translate>
            </span>
          </dt>
          <dd>{tenureTypeEntity.name}</dd>
          <dt>
            <span id="identifier">
              <Translate contentKey="gadiApp.tenureType.identifier">Identifier</Translate>
            </span>
          </dt>
          <dd>{tenureTypeEntity.identifier}</dd>
          <dt>
            <span id="orderValue">
              <Translate contentKey="gadiApp.tenureType.orderValue">Order Value</Translate>
            </span>
          </dt>
          <dd>{tenureTypeEntity.orderValue}</dd>
          <dt>
            <span id="defaultValue">
              <Translate contentKey="gadiApp.tenureType.defaultValue">Default Value</Translate>
            </span>
          </dt>
          <dd>{tenureTypeEntity.defaultValue ? 'true' : 'false'}</dd>
          <dt>
            <span id="active">
              <Translate contentKey="gadiApp.tenureType.active">Active</Translate>
            </span>
          </dt>
          <dd>{tenureTypeEntity.active ? 'true' : 'false'}</dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="gadiApp.tenureType.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{tenureTypeEntity.createdBy}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="gadiApp.tenureType.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>
            {tenureTypeEntity.createdDate ? <TextFormat value={tenureTypeEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="updatedBy">
              <Translate contentKey="gadiApp.tenureType.updatedBy">Updated By</Translate>
            </span>
          </dt>
          <dd>{tenureTypeEntity.updatedBy}</dd>
          <dt>
            <span id="updatedDate">
              <Translate contentKey="gadiApp.tenureType.updatedDate">Updated Date</Translate>
            </span>
          </dt>
          <dd>
            {tenureTypeEntity.updatedDate ? <TextFormat value={tenureTypeEntity.updatedDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
        </dl>
        <Button tag={Link} to="/tenure-type" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/tenure-type/${tenureTypeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ tenureType }: IRootState) => ({
  tenureTypeEntity: tenureType.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TenureTypeDetail);
