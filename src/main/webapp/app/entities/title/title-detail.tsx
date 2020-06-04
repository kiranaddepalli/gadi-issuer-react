import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './title.reducer';
import { ITitle } from 'app/shared/model/title.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITitleDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TitleDetail = (props: ITitleDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { titleEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gadiApp.title.detail.title">Title</Translate> [<b>{titleEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="gadiApp.title.name">Name</Translate>
            </span>
          </dt>
          <dd>{titleEntity.name}</dd>
          <dt>
            <span id="identifier">
              <Translate contentKey="gadiApp.title.identifier">Identifier</Translate>
            </span>
          </dt>
          <dd>{titleEntity.identifier}</dd>
          <dt>
            <span id="orderValue">
              <Translate contentKey="gadiApp.title.orderValue">Order Value</Translate>
            </span>
          </dt>
          <dd>{titleEntity.orderValue}</dd>
          <dt>
            <span id="defaultValue">
              <Translate contentKey="gadiApp.title.defaultValue">Default Value</Translate>
            </span>
          </dt>
          <dd>{titleEntity.defaultValue ? 'true' : 'false'}</dd>
          <dt>
            <span id="active">
              <Translate contentKey="gadiApp.title.active">Active</Translate>
            </span>
          </dt>
          <dd>{titleEntity.active ? 'true' : 'false'}</dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="gadiApp.title.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{titleEntity.createdBy}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="gadiApp.title.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>{titleEntity.createdDate ? <TextFormat value={titleEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="updatedBy">
              <Translate contentKey="gadiApp.title.updatedBy">Updated By</Translate>
            </span>
          </dt>
          <dd>{titleEntity.updatedBy}</dd>
          <dt>
            <span id="updatedDate">
              <Translate contentKey="gadiApp.title.updatedDate">Updated Date</Translate>
            </span>
          </dt>
          <dd>{titleEntity.updatedDate ? <TextFormat value={titleEntity.updatedDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
        </dl>
        <Button tag={Link} to="/title" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/title/${titleEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ title }: IRootState) => ({
  titleEntity: title.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TitleDetail);
