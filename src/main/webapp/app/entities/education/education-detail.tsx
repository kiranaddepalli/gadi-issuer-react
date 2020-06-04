import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './education.reducer';
import { IEducation } from 'app/shared/model/education.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEducationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EducationDetail = (props: IEducationDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { educationEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gadiApp.education.detail.title">Education</Translate> [<b>{educationEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="gadiApp.education.name">Name</Translate>
            </span>
          </dt>
          <dd>{educationEntity.name}</dd>
          <dt>
            <span id="identifier">
              <Translate contentKey="gadiApp.education.identifier">Identifier</Translate>
            </span>
          </dt>
          <dd>{educationEntity.identifier}</dd>
          <dt>
            <span id="issuerIdentifier">
              <Translate contentKey="gadiApp.education.issuerIdentifier">Issuer Identifier</Translate>
            </span>
          </dt>
          <dd>{educationEntity.issuerIdentifier}</dd>
          <dt>
            <span id="issueDate">
              <Translate contentKey="gadiApp.education.issueDate">Issue Date</Translate>
            </span>
          </dt>
          <dd>
            {educationEntity.issueDate ? <TextFormat value={educationEntity.issueDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="expirationDate">
              <Translate contentKey="gadiApp.education.expirationDate">Expiration Date</Translate>
            </span>
          </dt>
          <dd>
            {educationEntity.expirationDate ? (
              <TextFormat value={educationEntity.expirationDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="completed">
              <Translate contentKey="gadiApp.education.completed">Completed</Translate>
            </span>
          </dt>
          <dd>{educationEntity.completed ? 'true' : 'false'}</dd>
          <dt>
            <span id="start">
              <Translate contentKey="gadiApp.education.start">Start</Translate>
            </span>
          </dt>
          <dd>{educationEntity.start ? <TextFormat value={educationEntity.start} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="end">
              <Translate contentKey="gadiApp.education.end">End</Translate>
            </span>
          </dt>
          <dd>{educationEntity.end ? <TextFormat value={educationEntity.end} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="active">
              <Translate contentKey="gadiApp.education.active">Active</Translate>
            </span>
          </dt>
          <dd>{educationEntity.active ? 'true' : 'false'}</dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="gadiApp.education.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{educationEntity.createdBy}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="gadiApp.education.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>
            {educationEntity.createdDate ? <TextFormat value={educationEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="updatedBy">
              <Translate contentKey="gadiApp.education.updatedBy">Updated By</Translate>
            </span>
          </dt>
          <dd>{educationEntity.updatedBy}</dd>
          <dt>
            <span id="updatedDate">
              <Translate contentKey="gadiApp.education.updatedDate">Updated Date</Translate>
            </span>
          </dt>
          <dd>
            {educationEntity.updatedDate ? <TextFormat value={educationEntity.updatedDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="gadiApp.education.tenure">Tenure</Translate>
          </dt>
          <dd>{educationEntity.tenure ? educationEntity.tenure.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/education" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/education/${educationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ education }: IRootState) => ({
  educationEntity: education.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EducationDetail);
