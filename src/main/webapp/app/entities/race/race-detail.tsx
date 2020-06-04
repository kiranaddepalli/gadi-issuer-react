import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './race.reducer';
import { IRace } from 'app/shared/model/race.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRaceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RaceDetail = (props: IRaceDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { raceEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gadiApp.race.detail.title">Race</Translate> [<b>{raceEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="gadiApp.race.name">Name</Translate>
            </span>
          </dt>
          <dd>{raceEntity.name}</dd>
          <dt>
            <span id="identifier">
              <Translate contentKey="gadiApp.race.identifier">Identifier</Translate>
            </span>
          </dt>
          <dd>{raceEntity.identifier}</dd>
          <dt>
            <span id="orderValue">
              <Translate contentKey="gadiApp.race.orderValue">Order Value</Translate>
            </span>
          </dt>
          <dd>{raceEntity.orderValue}</dd>
          <dt>
            <span id="defaultValue">
              <Translate contentKey="gadiApp.race.defaultValue">Default Value</Translate>
            </span>
          </dt>
          <dd>{raceEntity.defaultValue ? 'true' : 'false'}</dd>
          <dt>
            <span id="active">
              <Translate contentKey="gadiApp.race.active">Active</Translate>
            </span>
          </dt>
          <dd>{raceEntity.active ? 'true' : 'false'}</dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="gadiApp.race.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{raceEntity.createdBy}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="gadiApp.race.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>{raceEntity.createdDate ? <TextFormat value={raceEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="updatedBy">
              <Translate contentKey="gadiApp.race.updatedBy">Updated By</Translate>
            </span>
          </dt>
          <dd>{raceEntity.updatedBy}</dd>
          <dt>
            <span id="updatedDate">
              <Translate contentKey="gadiApp.race.updatedDate">Updated Date</Translate>
            </span>
          </dt>
          <dd>{raceEntity.updatedDate ? <TextFormat value={raceEntity.updatedDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
        </dl>
        <Button tag={Link} to="/race" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/race/${raceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ race }: IRootState) => ({
  raceEntity: race.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RaceDetail);
