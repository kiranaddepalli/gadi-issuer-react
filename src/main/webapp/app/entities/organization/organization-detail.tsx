import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './organization.reducer';
import { IOrganization } from 'app/shared/model/organization.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOrganizationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OrganizationDetail = (props: IOrganizationDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { organizationEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gadiApp.organization.detail.title">Organization</Translate> [<b>{organizationEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="gadiApp.organization.name">Name</Translate>
            </span>
          </dt>
          <dd>{organizationEntity.name}</dd>
          <dt>
            <span id="identifier">
              <Translate contentKey="gadiApp.organization.identifier">Identifier</Translate>
            </span>
          </dt>
          <dd>{organizationEntity.identifier}</dd>
          <dt>
            <span id="businessName">
              <Translate contentKey="gadiApp.organization.businessName">Business Name</Translate>
            </span>
          </dt>
          <dd>{organizationEntity.businessName}</dd>
          <dt>
            <span id="dbaName">
              <Translate contentKey="gadiApp.organization.dbaName">Dba Name</Translate>
            </span>
          </dt>
          <dd>{organizationEntity.dbaName}</dd>
          <dt>
            <span id="fein">
              <Translate contentKey="gadiApp.organization.fein">Fein</Translate>
            </span>
          </dt>
          <dd>{organizationEntity.fein}</dd>
          <dt>
            <span id="startDate">
              <Translate contentKey="gadiApp.organization.startDate">Start Date</Translate>
            </span>
          </dt>
          <dd>
            {organizationEntity.startDate ? <TextFormat value={organizationEntity.startDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="active">
              <Translate contentKey="gadiApp.organization.active">Active</Translate>
            </span>
          </dt>
          <dd>{organizationEntity.active ? 'true' : 'false'}</dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="gadiApp.organization.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{organizationEntity.createdBy}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="gadiApp.organization.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>
            {organizationEntity.createdDate ? (
              <TextFormat value={organizationEntity.createdDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="updatedBy">
              <Translate contentKey="gadiApp.organization.updatedBy">Updated By</Translate>
            </span>
          </dt>
          <dd>{organizationEntity.updatedBy}</dd>
          <dt>
            <span id="updatedDate">
              <Translate contentKey="gadiApp.organization.updatedDate">Updated Date</Translate>
            </span>
          </dt>
          <dd>
            {organizationEntity.updatedDate ? (
              <TextFormat value={organizationEntity.updatedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="gadiApp.organization.partyRole">Party Role</Translate>
          </dt>
          <dd>{organizationEntity.partyRole ? organizationEntity.partyRole.id : ''}</dd>
          <dt>
            <Translate contentKey="gadiApp.organization.incorporatedState">Incorporated State</Translate>
          </dt>
          <dd>{organizationEntity.incorporatedState ? organizationEntity.incorporatedState.id : ''}</dd>
          <dt>
            <Translate contentKey="gadiApp.organization.country">Country</Translate>
          </dt>
          <dd>{organizationEntity.country ? organizationEntity.country.id : ''}</dd>
          <dt>
            <Translate contentKey="gadiApp.organization.address">Address</Translate>
          </dt>
          <dd>{organizationEntity.address ? organizationEntity.address.id : ''}</dd>
          <dt>
            <Translate contentKey="gadiApp.organization.mainPhone">Main Phone</Translate>
          </dt>
          <dd>{organizationEntity.mainPhone ? organizationEntity.mainPhone.id : ''}</dd>
          <dt>
            <Translate contentKey="gadiApp.organization.secondaryPhone">Secondary Phone</Translate>
          </dt>
          <dd>{organizationEntity.secondaryPhone ? organizationEntity.secondaryPhone.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/organization" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/organization/${organizationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ organization }: IRootState) => ({
  organizationEntity: organization.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationDetail);
