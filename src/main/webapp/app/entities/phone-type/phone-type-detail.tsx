import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './phone-type.reducer';
import { IPhoneType } from 'app/shared/model/phone-type.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPhoneTypeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PhoneTypeDetail = (props: IPhoneTypeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { phoneTypeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gadiApp.phoneType.detail.title">PhoneType</Translate> [<b>{phoneTypeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="gadiApp.phoneType.name">Name</Translate>
            </span>
          </dt>
          <dd>{phoneTypeEntity.name}</dd>
          <dt>
            <span id="identifier">
              <Translate contentKey="gadiApp.phoneType.identifier">Identifier</Translate>
            </span>
          </dt>
          <dd>{phoneTypeEntity.identifier}</dd>
          <dt>
            <span id="orderValue">
              <Translate contentKey="gadiApp.phoneType.orderValue">Order Value</Translate>
            </span>
          </dt>
          <dd>{phoneTypeEntity.orderValue}</dd>
          <dt>
            <span id="defaultValue">
              <Translate contentKey="gadiApp.phoneType.defaultValue">Default Value</Translate>
            </span>
          </dt>
          <dd>{phoneTypeEntity.defaultValue ? 'true' : 'false'}</dd>
          <dt>
            <span id="active">
              <Translate contentKey="gadiApp.phoneType.active">Active</Translate>
            </span>
          </dt>
          <dd>{phoneTypeEntity.active ? 'true' : 'false'}</dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="gadiApp.phoneType.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{phoneTypeEntity.createdBy}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="gadiApp.phoneType.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>
            {phoneTypeEntity.createdDate ? <TextFormat value={phoneTypeEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="updatedBy">
              <Translate contentKey="gadiApp.phoneType.updatedBy">Updated By</Translate>
            </span>
          </dt>
          <dd>{phoneTypeEntity.updatedBy}</dd>
          <dt>
            <span id="updatedDate">
              <Translate contentKey="gadiApp.phoneType.updatedDate">Updated Date</Translate>
            </span>
          </dt>
          <dd>
            {phoneTypeEntity.updatedDate ? <TextFormat value={phoneTypeEntity.updatedDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
        </dl>
        <Button tag={Link} to="/phone-type" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/phone-type/${phoneTypeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ phoneType }: IRootState) => ({
  phoneTypeEntity: phoneType.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PhoneTypeDetail);
