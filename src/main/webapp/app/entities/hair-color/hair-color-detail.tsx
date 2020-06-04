import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './hair-color.reducer';
import { IHairColor } from 'app/shared/model/hair-color.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IHairColorDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const HairColorDetail = (props: IHairColorDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { hairColorEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gadiApp.hairColor.detail.title">HairColor</Translate> [<b>{hairColorEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="gadiApp.hairColor.name">Name</Translate>
            </span>
          </dt>
          <dd>{hairColorEntity.name}</dd>
          <dt>
            <span id="identifier">
              <Translate contentKey="gadiApp.hairColor.identifier">Identifier</Translate>
            </span>
          </dt>
          <dd>{hairColorEntity.identifier}</dd>
          <dt>
            <span id="orderValue">
              <Translate contentKey="gadiApp.hairColor.orderValue">Order Value</Translate>
            </span>
          </dt>
          <dd>{hairColorEntity.orderValue}</dd>
          <dt>
            <span id="defaultValue">
              <Translate contentKey="gadiApp.hairColor.defaultValue">Default Value</Translate>
            </span>
          </dt>
          <dd>{hairColorEntity.defaultValue ? 'true' : 'false'}</dd>
          <dt>
            <span id="active">
              <Translate contentKey="gadiApp.hairColor.active">Active</Translate>
            </span>
          </dt>
          <dd>{hairColorEntity.active ? 'true' : 'false'}</dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="gadiApp.hairColor.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{hairColorEntity.createdBy}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="gadiApp.hairColor.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>
            {hairColorEntity.createdDate ? <TextFormat value={hairColorEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="updatedBy">
              <Translate contentKey="gadiApp.hairColor.updatedBy">Updated By</Translate>
            </span>
          </dt>
          <dd>{hairColorEntity.updatedBy}</dd>
          <dt>
            <span id="updatedDate">
              <Translate contentKey="gadiApp.hairColor.updatedDate">Updated Date</Translate>
            </span>
          </dt>
          <dd>
            {hairColorEntity.updatedDate ? <TextFormat value={hairColorEntity.updatedDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
        </dl>
        <Button tag={Link} to="/hair-color" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/hair-color/${hairColorEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ hairColor }: IRootState) => ({
  hairColorEntity: hairColor.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(HairColorDetail);
