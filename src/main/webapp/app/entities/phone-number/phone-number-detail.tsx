import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './phone-number.reducer';
import { IPhoneNumber } from 'app/shared/model/phone-number.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPhoneNumberDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PhoneNumberDetail = (props: IPhoneNumberDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { phoneNumberEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gadiApp.phoneNumber.detail.title">PhoneNumber</Translate> [<b>{phoneNumberEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="countryCode">
              <Translate contentKey="gadiApp.phoneNumber.countryCode">Country Code</Translate>
            </span>
          </dt>
          <dd>{phoneNumberEntity.countryCode}</dd>
          <dt>
            <span id="areaCode">
              <Translate contentKey="gadiApp.phoneNumber.areaCode">Area Code</Translate>
            </span>
          </dt>
          <dd>{phoneNumberEntity.areaCode}</dd>
          <dt>
            <span id="phoneNumber">
              <Translate contentKey="gadiApp.phoneNumber.phoneNumber">Phone Number</Translate>
            </span>
          </dt>
          <dd>{phoneNumberEntity.phoneNumber}</dd>
          <dt>
            <span id="extension">
              <Translate contentKey="gadiApp.phoneNumber.extension">Extension</Translate>
            </span>
          </dt>
          <dd>{phoneNumberEntity.extension}</dd>
          <dt>
            <span id="active">
              <Translate contentKey="gadiApp.phoneNumber.active">Active</Translate>
            </span>
          </dt>
          <dd>{phoneNumberEntity.active ? 'true' : 'false'}</dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="gadiApp.phoneNumber.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{phoneNumberEntity.createdBy}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="gadiApp.phoneNumber.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>
            {phoneNumberEntity.createdDate ? (
              <TextFormat value={phoneNumberEntity.createdDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="updatedBy">
              <Translate contentKey="gadiApp.phoneNumber.updatedBy">Updated By</Translate>
            </span>
          </dt>
          <dd>{phoneNumberEntity.updatedBy}</dd>
          <dt>
            <span id="updatedDate">
              <Translate contentKey="gadiApp.phoneNumber.updatedDate">Updated Date</Translate>
            </span>
          </dt>
          <dd>
            {phoneNumberEntity.updatedDate ? (
              <TextFormat value={phoneNumberEntity.updatedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="gadiApp.phoneNumber.phoneType">Phone Type</Translate>
          </dt>
          <dd>{phoneNumberEntity.phoneType ? phoneNumberEntity.phoneType.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/phone-number" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/phone-number/${phoneNumberEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ phoneNumber }: IRootState) => ({
  phoneNumberEntity: phoneNumber.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PhoneNumberDetail);
