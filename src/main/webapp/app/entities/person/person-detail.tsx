import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './person.reducer';
import { IPerson } from 'app/shared/model/person.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPersonDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PersonDetail = (props: IPersonDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { personEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gadiApp.person.detail.title">Person</Translate> [<b>{personEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="gadiApp.person.name">Name</Translate>
            </span>
          </dt>
          <dd>{personEntity.name}</dd>
          <dt>
            <span id="identifier">
              <Translate contentKey="gadiApp.person.identifier">Identifier</Translate>
            </span>
          </dt>
          <dd>{personEntity.identifier}</dd>
          <dt>
            <span id="firstName">
              <Translate contentKey="gadiApp.person.firstName">First Name</Translate>
            </span>
          </dt>
          <dd>{personEntity.firstName}</dd>
          <dt>
            <span id="middleName">
              <Translate contentKey="gadiApp.person.middleName">Middle Name</Translate>
            </span>
          </dt>
          <dd>{personEntity.middleName}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="gadiApp.person.lastName">Last Name</Translate>
            </span>
          </dt>
          <dd>{personEntity.lastName}</dd>
          <dt>
            <span id="active">
              <Translate contentKey="gadiApp.person.active">Active</Translate>
            </span>
          </dt>
          <dd>{personEntity.active ? 'true' : 'false'}</dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="gadiApp.person.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{personEntity.createdBy}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="gadiApp.person.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>{personEntity.createdDate ? <TextFormat value={personEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="updatedBy">
              <Translate contentKey="gadiApp.person.updatedBy">Updated By</Translate>
            </span>
          </dt>
          <dd>{personEntity.updatedBy}</dd>
          <dt>
            <span id="updatedDate">
              <Translate contentKey="gadiApp.person.updatedDate">Updated Date</Translate>
            </span>
          </dt>
          <dd>{personEntity.updatedDate ? <TextFormat value={personEntity.updatedDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <Translate contentKey="gadiApp.person.address">Address</Translate>
          </dt>
          <dd>{personEntity.address ? personEntity.address.id : ''}</dd>
          <dt>
            <Translate contentKey="gadiApp.person.homePhone">Home Phone</Translate>
          </dt>
          <dd>{personEntity.homePhone ? personEntity.homePhone.id : ''}</dd>
          <dt>
            <Translate contentKey="gadiApp.person.workPhone">Work Phone</Translate>
          </dt>
          <dd>{personEntity.workPhone ? personEntity.workPhone.id : ''}</dd>
          <dt>
            <Translate contentKey="gadiApp.person.mobilePhone">Mobile Phone</Translate>
          </dt>
          <dd>{personEntity.mobilePhone ? personEntity.mobilePhone.id : ''}</dd>
          <dt>
            <Translate contentKey="gadiApp.person.email">Email</Translate>
          </dt>
          <dd>{personEntity.email ? personEntity.email.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/person" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/person/${personEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ person }: IRootState) => ({
  personEntity: person.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PersonDetail);
