import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './email-type.reducer';
import { IEmailType } from 'app/shared/model/email-type.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmailTypeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmailTypeDetail = (props: IEmailTypeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { emailTypeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gadiApp.emailType.detail.title">EmailType</Translate> [<b>{emailTypeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="gadiApp.emailType.name">Name</Translate>
            </span>
          </dt>
          <dd>{emailTypeEntity.name}</dd>
          <dt>
            <span id="identifier">
              <Translate contentKey="gadiApp.emailType.identifier">Identifier</Translate>
            </span>
          </dt>
          <dd>{emailTypeEntity.identifier}</dd>
          <dt>
            <span id="orderValue">
              <Translate contentKey="gadiApp.emailType.orderValue">Order Value</Translate>
            </span>
          </dt>
          <dd>{emailTypeEntity.orderValue}</dd>
          <dt>
            <span id="defaultValue">
              <Translate contentKey="gadiApp.emailType.defaultValue">Default Value</Translate>
            </span>
          </dt>
          <dd>{emailTypeEntity.defaultValue ? 'true' : 'false'}</dd>
          <dt>
            <span id="active">
              <Translate contentKey="gadiApp.emailType.active">Active</Translate>
            </span>
          </dt>
          <dd>{emailTypeEntity.active ? 'true' : 'false'}</dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="gadiApp.emailType.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{emailTypeEntity.createdBy}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="gadiApp.emailType.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>
            {emailTypeEntity.createdDate ? <TextFormat value={emailTypeEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="updatedBy">
              <Translate contentKey="gadiApp.emailType.updatedBy">Updated By</Translate>
            </span>
          </dt>
          <dd>{emailTypeEntity.updatedBy}</dd>
          <dt>
            <span id="updatedDate">
              <Translate contentKey="gadiApp.emailType.updatedDate">Updated Date</Translate>
            </span>
          </dt>
          <dd>
            {emailTypeEntity.updatedDate ? <TextFormat value={emailTypeEntity.updatedDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
        </dl>
        <Button tag={Link} to="/email-type" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/email-type/${emailTypeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ emailType }: IRootState) => ({
  emailTypeEntity: emailType.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmailTypeDetail);
