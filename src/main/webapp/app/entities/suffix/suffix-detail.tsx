import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './suffix.reducer';
import { ISuffix } from 'app/shared/model/suffix.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SuffixDetail = (props: ISuffixDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { suffixEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gadiApp.suffix.detail.title">Suffix</Translate> [<b>{suffixEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="gadiApp.suffix.name">Name</Translate>
            </span>
          </dt>
          <dd>{suffixEntity.name}</dd>
          <dt>
            <span id="identifier">
              <Translate contentKey="gadiApp.suffix.identifier">Identifier</Translate>
            </span>
          </dt>
          <dd>{suffixEntity.identifier}</dd>
          <dt>
            <span id="orderValue">
              <Translate contentKey="gadiApp.suffix.orderValue">Order Value</Translate>
            </span>
          </dt>
          <dd>{suffixEntity.orderValue}</dd>
          <dt>
            <span id="defaultValue">
              <Translate contentKey="gadiApp.suffix.defaultValue">Default Value</Translate>
            </span>
          </dt>
          <dd>{suffixEntity.defaultValue ? 'true' : 'false'}</dd>
          <dt>
            <span id="active">
              <Translate contentKey="gadiApp.suffix.active">Active</Translate>
            </span>
          </dt>
          <dd>{suffixEntity.active ? 'true' : 'false'}</dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="gadiApp.suffix.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{suffixEntity.createdBy}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="gadiApp.suffix.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>{suffixEntity.createdDate ? <TextFormat value={suffixEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="updatedBy">
              <Translate contentKey="gadiApp.suffix.updatedBy">Updated By</Translate>
            </span>
          </dt>
          <dd>{suffixEntity.updatedBy}</dd>
          <dt>
            <span id="updatedDate">
              <Translate contentKey="gadiApp.suffix.updatedDate">Updated Date</Translate>
            </span>
          </dt>
          <dd>{suffixEntity.updatedDate ? <TextFormat value={suffixEntity.updatedDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
        </dl>
        <Button tag={Link} to="/suffix" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/suffix/${suffixEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ suffix }: IRootState) => ({
  suffixEntity: suffix.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SuffixDetail);
