import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './credential-type.reducer';
import { ICredentialType } from 'app/shared/model/credential-type.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICredentialTypeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CredentialTypeDetail = (props: ICredentialTypeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { credentialTypeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gadiApp.credentialType.detail.title">CredentialType</Translate> [<b>{credentialTypeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="gadiApp.credentialType.name">Name</Translate>
            </span>
          </dt>
          <dd>{credentialTypeEntity.name}</dd>
          <dt>
            <span id="identifier">
              <Translate contentKey="gadiApp.credentialType.identifier">Identifier</Translate>
            </span>
          </dt>
          <dd>{credentialTypeEntity.identifier}</dd>
          <dt>
            <span id="active">
              <Translate contentKey="gadiApp.credentialType.active">Active</Translate>
            </span>
          </dt>
          <dd>{credentialTypeEntity.active ? 'true' : 'false'}</dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="gadiApp.credentialType.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{credentialTypeEntity.createdBy}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="gadiApp.credentialType.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>
            {credentialTypeEntity.createdDate ? (
              <TextFormat value={credentialTypeEntity.createdDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="updatedBy">
              <Translate contentKey="gadiApp.credentialType.updatedBy">Updated By</Translate>
            </span>
          </dt>
          <dd>{credentialTypeEntity.updatedBy}</dd>
          <dt>
            <span id="updatedDate">
              <Translate contentKey="gadiApp.credentialType.updatedDate">Updated Date</Translate>
            </span>
          </dt>
          <dd>
            {credentialTypeEntity.updatedDate ? (
              <TextFormat value={credentialTypeEntity.updatedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
        </dl>
        <Button tag={Link} to="/credential-type" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/credential-type/${credentialTypeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ credentialType }: IRootState) => ({
  credentialTypeEntity: credentialType.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CredentialTypeDetail);
