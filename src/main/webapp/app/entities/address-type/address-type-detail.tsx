import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './address-type.reducer';
import { IAddressType } from 'app/shared/model/address-type.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAddressTypeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AddressTypeDetail = (props: IAddressTypeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { addressTypeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gadiApp.addressType.detail.title">AddressType</Translate> [<b>{addressTypeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="gadiApp.addressType.name">Name</Translate>
            </span>
          </dt>
          <dd>{addressTypeEntity.name}</dd>
          <dt>
            <span id="identifier">
              <Translate contentKey="gadiApp.addressType.identifier">Identifier</Translate>
            </span>
          </dt>
          <dd>{addressTypeEntity.identifier}</dd>
          <dt>
            <span id="orderValue">
              <Translate contentKey="gadiApp.addressType.orderValue">Order Value</Translate>
            </span>
          </dt>
          <dd>{addressTypeEntity.orderValue}</dd>
          <dt>
            <span id="defaultValue">
              <Translate contentKey="gadiApp.addressType.defaultValue">Default Value</Translate>
            </span>
          </dt>
          <dd>{addressTypeEntity.defaultValue ? 'true' : 'false'}</dd>
          <dt>
            <span id="active">
              <Translate contentKey="gadiApp.addressType.active">Active</Translate>
            </span>
          </dt>
          <dd>{addressTypeEntity.active ? 'true' : 'false'}</dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="gadiApp.addressType.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{addressTypeEntity.createdBy}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="gadiApp.addressType.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>
            {addressTypeEntity.createdDate ? (
              <TextFormat value={addressTypeEntity.createdDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="updatedBy">
              <Translate contentKey="gadiApp.addressType.updatedBy">Updated By</Translate>
            </span>
          </dt>
          <dd>{addressTypeEntity.updatedBy}</dd>
          <dt>
            <span id="updatedDate">
              <Translate contentKey="gadiApp.addressType.updatedDate">Updated Date</Translate>
            </span>
          </dt>
          <dd>
            {addressTypeEntity.updatedDate ? (
              <TextFormat value={addressTypeEntity.updatedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
        </dl>
        <Button tag={Link} to="/address-type" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/address-type/${addressTypeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ addressType }: IRootState) => ({
  addressTypeEntity: addressType.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AddressTypeDetail);
