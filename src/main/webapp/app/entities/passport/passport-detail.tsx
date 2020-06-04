import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './passport.reducer';
import { IPassport } from 'app/shared/model/passport.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPassportDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PassportDetail = (props: IPassportDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { passportEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gadiApp.passport.detail.title">Passport</Translate> [<b>{passportEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="gadiApp.passport.name">Name</Translate>
            </span>
          </dt>
          <dd>{passportEntity.name}</dd>
          <dt>
            <span id="identifier">
              <Translate contentKey="gadiApp.passport.identifier">Identifier</Translate>
            </span>
          </dt>
          <dd>{passportEntity.identifier}</dd>
          <dt>
            <span id="issuerIdentifier">
              <Translate contentKey="gadiApp.passport.issuerIdentifier">Issuer Identifier</Translate>
            </span>
          </dt>
          <dd>{passportEntity.issuerIdentifier}</dd>
          <dt>
            <span id="issueDate">
              <Translate contentKey="gadiApp.passport.issueDate">Issue Date</Translate>
            </span>
          </dt>
          <dd>{passportEntity.issueDate ? <TextFormat value={passportEntity.issueDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="expirationDate">
              <Translate contentKey="gadiApp.passport.expirationDate">Expiration Date</Translate>
            </span>
          </dt>
          <dd>
            {passportEntity.expirationDate ? (
              <TextFormat value={passportEntity.expirationDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="classCode">
              <Translate contentKey="gadiApp.passport.classCode">Class Code</Translate>
            </span>
          </dt>
          <dd>{passportEntity.classCode}</dd>
          <dt>
            <span id="birthDate">
              <Translate contentKey="gadiApp.passport.birthDate">Birth Date</Translate>
            </span>
          </dt>
          <dd>{passportEntity.birthDate ? <TextFormat value={passportEntity.birthDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="heightFeet">
              <Translate contentKey="gadiApp.passport.heightFeet">Height Feet</Translate>
            </span>
          </dt>
          <dd>{passportEntity.heightFeet}</dd>
          <dt>
            <span id="heightInches">
              <Translate contentKey="gadiApp.passport.heightInches">Height Inches</Translate>
            </span>
          </dt>
          <dd>{passportEntity.heightInches}</dd>
          <dt>
            <span id="active">
              <Translate contentKey="gadiApp.passport.active">Active</Translate>
            </span>
          </dt>
          <dd>{passportEntity.active ? 'true' : 'false'}</dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="gadiApp.passport.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{passportEntity.createdBy}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="gadiApp.passport.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>
            {passportEntity.createdDate ? <TextFormat value={passportEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="updatedBy">
              <Translate contentKey="gadiApp.passport.updatedBy">Updated By</Translate>
            </span>
          </dt>
          <dd>{passportEntity.updatedBy}</dd>
          <dt>
            <span id="updatedDate">
              <Translate contentKey="gadiApp.passport.updatedDate">Updated Date</Translate>
            </span>
          </dt>
          <dd>
            {passportEntity.updatedDate ? <TextFormat value={passportEntity.updatedDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="gadiApp.passport.gender">Gender</Translate>
          </dt>
          <dd>{passportEntity.gender ? passportEntity.gender.id : ''}</dd>
          <dt>
            <Translate contentKey="gadiApp.passport.nationality">Nationality</Translate>
          </dt>
          <dd>{passportEntity.nationality ? passportEntity.nationality.id : ''}</dd>
          <dt>
            <Translate contentKey="gadiApp.passport.holderImage">Holder Image</Translate>
          </dt>
          <dd>{passportEntity.holderImage ? passportEntity.holderImage.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/passport" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/passport/${passportEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ passport }: IRootState) => ({
  passportEntity: passport.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PassportDetail);
