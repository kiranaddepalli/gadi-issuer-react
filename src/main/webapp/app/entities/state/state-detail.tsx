import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './state.reducer';
import { IState } from 'app/shared/model/state.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStateDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const StateDetail = (props: IStateDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { stateEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gadiApp.state.detail.title">State</Translate> [<b>{stateEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="gadiApp.state.name">Name</Translate>
            </span>
          </dt>
          <dd>{stateEntity.name}</dd>
          <dt>
            <span id="identifier">
              <Translate contentKey="gadiApp.state.identifier">Identifier</Translate>
            </span>
          </dt>
          <dd>{stateEntity.identifier}</dd>
          <dt>
            <span id="orderValue">
              <Translate contentKey="gadiApp.state.orderValue">Order Value</Translate>
            </span>
          </dt>
          <dd>{stateEntity.orderValue}</dd>
          <dt>
            <span id="defaultValue">
              <Translate contentKey="gadiApp.state.defaultValue">Default Value</Translate>
            </span>
          </dt>
          <dd>{stateEntity.defaultValue ? 'true' : 'false'}</dd>
          <dt>
            <span id="active">
              <Translate contentKey="gadiApp.state.active">Active</Translate>
            </span>
          </dt>
          <dd>{stateEntity.active ? 'true' : 'false'}</dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="gadiApp.state.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{stateEntity.createdBy}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="gadiApp.state.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>{stateEntity.createdDate ? <TextFormat value={stateEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="updatedBy">
              <Translate contentKey="gadiApp.state.updatedBy">Updated By</Translate>
            </span>
          </dt>
          <dd>{stateEntity.updatedBy}</dd>
          <dt>
            <span id="updatedDate">
              <Translate contentKey="gadiApp.state.updatedDate">Updated Date</Translate>
            </span>
          </dt>
          <dd>{stateEntity.updatedDate ? <TextFormat value={stateEntity.updatedDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
        </dl>
        <Button tag={Link} to="/state" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/state/${stateEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ state }: IRootState) => ({
  stateEntity: state.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StateDetail);
