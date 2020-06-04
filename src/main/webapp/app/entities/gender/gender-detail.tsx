import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './gender.reducer';
import { IGender } from 'app/shared/model/gender.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IGenderDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const GenderDetail = (props: IGenderDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { genderEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gadiApp.gender.detail.title">Gender</Translate> [<b>{genderEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="gadiApp.gender.name">Name</Translate>
            </span>
          </dt>
          <dd>{genderEntity.name}</dd>
          <dt>
            <span id="identifier">
              <Translate contentKey="gadiApp.gender.identifier">Identifier</Translate>
            </span>
          </dt>
          <dd>{genderEntity.identifier}</dd>
          <dt>
            <span id="orderValue">
              <Translate contentKey="gadiApp.gender.orderValue">Order Value</Translate>
            </span>
          </dt>
          <dd>{genderEntity.orderValue}</dd>
          <dt>
            <span id="defaultValue">
              <Translate contentKey="gadiApp.gender.defaultValue">Default Value</Translate>
            </span>
          </dt>
          <dd>{genderEntity.defaultValue ? 'true' : 'false'}</dd>
          <dt>
            <span id="active">
              <Translate contentKey="gadiApp.gender.active">Active</Translate>
            </span>
          </dt>
          <dd>{genderEntity.active ? 'true' : 'false'}</dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="gadiApp.gender.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{genderEntity.createdBy}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="gadiApp.gender.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>{genderEntity.createdDate ? <TextFormat value={genderEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="updatedBy">
              <Translate contentKey="gadiApp.gender.updatedBy">Updated By</Translate>
            </span>
          </dt>
          <dd>{genderEntity.updatedBy}</dd>
          <dt>
            <span id="updatedDate">
              <Translate contentKey="gadiApp.gender.updatedDate">Updated Date</Translate>
            </span>
          </dt>
          <dd>{genderEntity.updatedDate ? <TextFormat value={genderEntity.updatedDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
        </dl>
        <Button tag={Link} to="/gender" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/gender/${genderEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ gender }: IRootState) => ({
  genderEntity: gender.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GenderDetail);
