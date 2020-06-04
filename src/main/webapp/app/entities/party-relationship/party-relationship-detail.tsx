import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './party-relationship.reducer';
import { IPartyRelationship } from 'app/shared/model/party-relationship.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPartyRelationshipDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PartyRelationshipDetail = (props: IPartyRelationshipDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { partyRelationshipEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gadiApp.partyRelationship.detail.title">PartyRelationship</Translate> [<b>{partyRelationshipEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="fromParty">
              <Translate contentKey="gadiApp.partyRelationship.fromParty">From Party</Translate>
            </span>
          </dt>
          <dd>{partyRelationshipEntity.fromParty}</dd>
          <dt>
            <span id="toParty">
              <Translate contentKey="gadiApp.partyRelationship.toParty">To Party</Translate>
            </span>
          </dt>
          <dd>
            {partyRelationshipEntity.toParty ? (
              <TextFormat value={partyRelationshipEntity.toParty} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="fromDate">
              <Translate contentKey="gadiApp.partyRelationship.fromDate">From Date</Translate>
            </span>
          </dt>
          <dd>
            {partyRelationshipEntity.fromDate ? (
              <TextFormat value={partyRelationshipEntity.fromDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="gadiApp.partyRelationship.partyRole">Party Role</Translate>
          </dt>
          <dd>{partyRelationshipEntity.partyRole ? partyRelationshipEntity.partyRole.id : ''}</dd>
          <dt>
            <Translate contentKey="gadiApp.partyRelationship.fromPartyType">From Party Type</Translate>
          </dt>
          <dd>{partyRelationshipEntity.fromPartyType ? partyRelationshipEntity.fromPartyType.id : ''}</dd>
          <dt>
            <Translate contentKey="gadiApp.partyRelationship.toPartyType">To Party Type</Translate>
          </dt>
          <dd>{partyRelationshipEntity.toPartyType ? partyRelationshipEntity.toPartyType.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/party-relationship" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/party-relationship/${partyRelationshipEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ partyRelationship }: IRootState) => ({
  partyRelationshipEntity: partyRelationship.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PartyRelationshipDetail);
