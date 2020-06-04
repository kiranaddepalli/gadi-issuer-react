import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './education.reducer';
import { IEducation } from 'app/shared/model/education.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEducationProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Education = (props: IEducationProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { educationList, match, loading } = props;
  return (
    <div>
      <h2 id="education-heading">
        <Translate contentKey="gadiApp.education.home.title">Educations</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="gadiApp.education.home.createLabel">Create new Education</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {educationList && educationList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.education.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.education.identifier">Identifier</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.education.issuerIdentifier">Issuer Identifier</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.education.issueDate">Issue Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.education.expirationDate">Expiration Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.education.completed">Completed</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.education.start">Start</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.education.end">End</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.education.active">Active</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.education.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.education.createdDate">Created Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.education.updatedBy">Updated By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.education.updatedDate">Updated Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.education.tenure">Tenure</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {educationList.map((education, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${education.id}`} color="link" size="sm">
                      {education.id}
                    </Button>
                  </td>
                  <td>{education.name}</td>
                  <td>{education.identifier}</td>
                  <td>{education.issuerIdentifier}</td>
                  <td>{education.issueDate ? <TextFormat type="date" value={education.issueDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>
                    {education.expirationDate ? <TextFormat type="date" value={education.expirationDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{education.completed ? 'true' : 'false'}</td>
                  <td>{education.start ? <TextFormat type="date" value={education.start} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{education.end ? <TextFormat type="date" value={education.end} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{education.active ? 'true' : 'false'}</td>
                  <td>{education.createdBy}</td>
                  <td>
                    {education.createdDate ? <TextFormat type="date" value={education.createdDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{education.updatedBy}</td>
                  <td>
                    {education.updatedDate ? <TextFormat type="date" value={education.updatedDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{education.tenure ? <Link to={`tenure-type/${education.tenure.id}`}>{education.tenure.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${education.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${education.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${education.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="gadiApp.education.home.notFound">No Educations found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ education }: IRootState) => ({
  educationList: education.entities,
  loading: education.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Education);
