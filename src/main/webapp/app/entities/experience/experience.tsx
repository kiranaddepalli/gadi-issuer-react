import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './experience.reducer';
import { IExperience } from 'app/shared/model/experience.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IExperienceProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Experience = (props: IExperienceProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { experienceList, match, loading } = props;
  return (
    <div>
      <h2 id="experience-heading">
        <Translate contentKey="gadiApp.experience.home.title">Experiences</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="gadiApp.experience.home.createLabel">Create new Experience</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {experienceList && experienceList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.experience.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.experience.identifier">Identifier</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.experience.issuerIdentifier">Issuer Identifier</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.experience.issueDate">Issue Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.experience.expirationDate">Expiration Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.experience.title">Title</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.experience.start">Start</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.experience.end">End</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.experience.active">Active</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.experience.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.experience.createdDate">Created Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.experience.updatedBy">Updated By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.experience.updatedDate">Updated Date</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {experienceList.map((experience, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${experience.id}`} color="link" size="sm">
                      {experience.id}
                    </Button>
                  </td>
                  <td>{experience.name}</td>
                  <td>{experience.identifier}</td>
                  <td>{experience.issuerIdentifier}</td>
                  <td>{experience.issueDate ? <TextFormat type="date" value={experience.issueDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>
                    {experience.expirationDate ? (
                      <TextFormat type="date" value={experience.expirationDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{experience.title}</td>
                  <td>{experience.start ? <TextFormat type="date" value={experience.start} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{experience.end ? <TextFormat type="date" value={experience.end} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{experience.active ? 'true' : 'false'}</td>
                  <td>{experience.createdBy}</td>
                  <td>
                    {experience.createdDate ? <TextFormat type="date" value={experience.createdDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{experience.updatedBy}</td>
                  <td>
                    {experience.updatedDate ? <TextFormat type="date" value={experience.updatedDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${experience.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${experience.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${experience.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="gadiApp.experience.home.notFound">No Experiences found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ experience }: IRootState) => ({
  experienceList: experience.entities,
  loading: experience.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Experience);
