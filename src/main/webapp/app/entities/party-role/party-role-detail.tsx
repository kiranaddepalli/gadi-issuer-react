import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './party-role.reducer';
import { IPartyRole } from 'app/shared/model/party-role.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPartyRoleDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PartyRoleDetail = (props: IPartyRoleDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { partyRoleEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gadiApp.partyRole.detail.title">PartyRole</Translate> [<b>{partyRoleEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="gadiApp.partyRole.name">Name</Translate>
            </span>
          </dt>
          <dd>{partyRoleEntity.name}</dd>
          <dt>
            <span id="identifier">
              <Translate contentKey="gadiApp.partyRole.identifier">Identifier</Translate>
            </span>
          </dt>
          <dd>{partyRoleEntity.identifier}</dd>
          <dt>
            <span id="orderValue">
              <Translate contentKey="gadiApp.partyRole.orderValue">Order Value</Translate>
            </span>
          </dt>
          <dd>{partyRoleEntity.orderValue}</dd>
          <dt>
            <span id="defaultValue">
              <Translate contentKey="gadiApp.partyRole.defaultValue">Default Value</Translate>
            </span>
          </dt>
          <dd>{partyRoleEntity.defaultValue ? 'true' : 'false'}</dd>
          <dt>
            <span id="active">
              <Translate contentKey="gadiApp.partyRole.active">Active</Translate>
            </span>
          </dt>
          <dd>{partyRoleEntity.active ? 'true' : 'false'}</dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="gadiApp.partyRole.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{partyRoleEntity.createdBy}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="gadiApp.partyRole.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>
            {partyRoleEntity.createdDate ? <TextFormat value={partyRoleEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="updatedBy">
              <Translate contentKey="gadiApp.partyRole.updatedBy">Updated By</Translate>
            </span>
          </dt>
          <dd>{partyRoleEntity.updatedBy}</dd>
          <dt>
            <span id="updatedDate">
              <Translate contentKey="gadiApp.partyRole.updatedDate">Updated Date</Translate>
            </span>
          </dt>
          <dd>
            {partyRoleEntity.updatedDate ? <TextFormat value={partyRoleEntity.updatedDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
        </dl>
        <Button tag={Link} to="/party-role" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/party-role/${partyRoleEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ partyRole }: IRootState) => ({
  partyRoleEntity: partyRole.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PartyRoleDetail);
