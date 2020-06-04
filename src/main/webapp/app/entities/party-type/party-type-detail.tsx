import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './party-type.reducer';
import { IPartyType } from 'app/shared/model/party-type.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPartyTypeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PartyTypeDetail = (props: IPartyTypeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { partyTypeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gadiApp.partyType.detail.title">PartyType</Translate> [<b>{partyTypeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="gadiApp.partyType.name">Name</Translate>
            </span>
          </dt>
          <dd>{partyTypeEntity.name}</dd>
          <dt>
            <span id="identifier">
              <Translate contentKey="gadiApp.partyType.identifier">Identifier</Translate>
            </span>
          </dt>
          <dd>{partyTypeEntity.identifier}</dd>
          <dt>
            <span id="orderValue">
              <Translate contentKey="gadiApp.partyType.orderValue">Order Value</Translate>
            </span>
          </dt>
          <dd>{partyTypeEntity.orderValue}</dd>
          <dt>
            <span id="defaultValue">
              <Translate contentKey="gadiApp.partyType.defaultValue">Default Value</Translate>
            </span>
          </dt>
          <dd>{partyTypeEntity.defaultValue ? 'true' : 'false'}</dd>
          <dt>
            <span id="active">
              <Translate contentKey="gadiApp.partyType.active">Active</Translate>
            </span>
          </dt>
          <dd>{partyTypeEntity.active ? 'true' : 'false'}</dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="gadiApp.partyType.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{partyTypeEntity.createdBy}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="gadiApp.partyType.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>
            {partyTypeEntity.createdDate ? <TextFormat value={partyTypeEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="updatedBy">
              <Translate contentKey="gadiApp.partyType.updatedBy">Updated By</Translate>
            </span>
          </dt>
          <dd>{partyTypeEntity.updatedBy}</dd>
          <dt>
            <span id="updatedDate">
              <Translate contentKey="gadiApp.partyType.updatedDate">Updated Date</Translate>
            </span>
          </dt>
          <dd>
            {partyTypeEntity.updatedDate ? <TextFormat value={partyTypeEntity.updatedDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
        </dl>
        <Button tag={Link} to="/party-type" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/party-type/${partyTypeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ partyType }: IRootState) => ({
  partyTypeEntity: partyType.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PartyTypeDetail);
