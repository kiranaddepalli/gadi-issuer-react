import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './party-relationship.reducer';
import { IPartyRelationship } from 'app/shared/model/party-relationship.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPartyRelationshipProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const PartyRelationship = (props: IPartyRelationshipProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { partyRelationshipList, match, loading } = props;
  return (
    <div>
      <h2 id="party-relationship-heading">
        <Translate contentKey="gadiApp.partyRelationship.home.title">Party Relationships</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="gadiApp.partyRelationship.home.createLabel">Create new Party Relationship</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {partyRelationshipList && partyRelationshipList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.partyRelationship.fromParty">From Party</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.partyRelationship.toParty">To Party</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.partyRelationship.fromDate">From Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.partyRelationship.partyRole">Party Role</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.partyRelationship.fromPartyType">From Party Type</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.partyRelationship.toPartyType">To Party Type</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {partyRelationshipList.map((partyRelationship, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${partyRelationship.id}`} color="link" size="sm">
                      {partyRelationship.id}
                    </Button>
                  </td>
                  <td>{partyRelationship.fromParty}</td>
                  <td>
                    {partyRelationship.toParty ? (
                      <TextFormat type="date" value={partyRelationship.toParty} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {partyRelationship.fromDate ? (
                      <TextFormat type="date" value={partyRelationship.fromDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {partyRelationship.partyRole ? (
                      <Link to={`party-role/${partyRelationship.partyRole.id}`}>{partyRelationship.partyRole.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {partyRelationship.fromPartyType ? (
                      <Link to={`party-type/${partyRelationship.fromPartyType.id}`}>{partyRelationship.fromPartyType.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {partyRelationship.toPartyType ? (
                      <Link to={`party-type/${partyRelationship.toPartyType.id}`}>{partyRelationship.toPartyType.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${partyRelationship.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${partyRelationship.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${partyRelationship.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="gadiApp.partyRelationship.home.notFound">No Party Relationships found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ partyRelationship }: IRootState) => ({
  partyRelationshipList: partyRelationship.entities,
  loading: partyRelationship.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PartyRelationship);
