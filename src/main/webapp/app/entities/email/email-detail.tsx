import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './email.reducer';
import { IEmail } from 'app/shared/model/email.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmailDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmailDetail = (props: IEmailDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { emailEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gadiApp.email.detail.title">Email</Translate> [<b>{emailEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="address">
              <Translate contentKey="gadiApp.email.address">Address</Translate>
            </span>
          </dt>
          <dd>{emailEntity.address}</dd>
          <dt>
            <span id="active">
              <Translate contentKey="gadiApp.email.active">Active</Translate>
            </span>
          </dt>
          <dd>{emailEntity.active ? 'true' : 'false'}</dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="gadiApp.email.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{emailEntity.createdBy}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="gadiApp.email.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>{emailEntity.createdDate ? <TextFormat value={emailEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="updatedBy">
              <Translate contentKey="gadiApp.email.updatedBy">Updated By</Translate>
            </span>
          </dt>
          <dd>{emailEntity.updatedBy}</dd>
          <dt>
            <span id="updatedDate">
              <Translate contentKey="gadiApp.email.updatedDate">Updated Date</Translate>
            </span>
          </dt>
          <dd>{emailEntity.updatedDate ? <TextFormat value={emailEntity.updatedDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <Translate contentKey="gadiApp.email.emailType">Email Type</Translate>
          </dt>
          <dd>{emailEntity.emailType ? emailEntity.emailType.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/email" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/email/${emailEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ email }: IRootState) => ({
  emailEntity: email.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmailDetail);
