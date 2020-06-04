import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './experience.reducer';
import { IExperience } from 'app/shared/model/experience.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IExperienceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ExperienceDetail = (props: IExperienceDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { experienceEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gadiApp.experience.detail.title">Experience</Translate> [<b>{experienceEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="gadiApp.experience.name">Name</Translate>
            </span>
          </dt>
          <dd>{experienceEntity.name}</dd>
          <dt>
            <span id="identifier">
              <Translate contentKey="gadiApp.experience.identifier">Identifier</Translate>
            </span>
          </dt>
          <dd>{experienceEntity.identifier}</dd>
          <dt>
            <span id="issuerIdentifier">
              <Translate contentKey="gadiApp.experience.issuerIdentifier">Issuer Identifier</Translate>
            </span>
          </dt>
          <dd>{experienceEntity.issuerIdentifier}</dd>
          <dt>
            <span id="issueDate">
              <Translate contentKey="gadiApp.experience.issueDate">Issue Date</Translate>
            </span>
          </dt>
          <dd>
            {experienceEntity.issueDate ? <TextFormat value={experienceEntity.issueDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="expirationDate">
              <Translate contentKey="gadiApp.experience.expirationDate">Expiration Date</Translate>
            </span>
          </dt>
          <dd>
            {experienceEntity.expirationDate ? (
              <TextFormat value={experienceEntity.expirationDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="title">
              <Translate contentKey="gadiApp.experience.title">Title</Translate>
            </span>
          </dt>
          <dd>{experienceEntity.title}</dd>
          <dt>
            <span id="start">
              <Translate contentKey="gadiApp.experience.start">Start</Translate>
            </span>
          </dt>
          <dd>{experienceEntity.start ? <TextFormat value={experienceEntity.start} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="end">
              <Translate contentKey="gadiApp.experience.end">End</Translate>
            </span>
          </dt>
          <dd>{experienceEntity.end ? <TextFormat value={experienceEntity.end} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="active">
              <Translate contentKey="gadiApp.experience.active">Active</Translate>
            </span>
          </dt>
          <dd>{experienceEntity.active ? 'true' : 'false'}</dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="gadiApp.experience.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{experienceEntity.createdBy}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="gadiApp.experience.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>
            {experienceEntity.createdDate ? <TextFormat value={experienceEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="updatedBy">
              <Translate contentKey="gadiApp.experience.updatedBy">Updated By</Translate>
            </span>
          </dt>
          <dd>{experienceEntity.updatedBy}</dd>
          <dt>
            <span id="updatedDate">
              <Translate contentKey="gadiApp.experience.updatedDate">Updated Date</Translate>
            </span>
          </dt>
          <dd>
            {experienceEntity.updatedDate ? <TextFormat value={experienceEntity.updatedDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
        </dl>
        <Button tag={Link} to="/experience" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/experience/${experienceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ experience }: IRootState) => ({
  experienceEntity: experience.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ExperienceDetail);
