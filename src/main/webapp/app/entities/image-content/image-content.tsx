import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { openFile, byteSize, Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './image-content.reducer';
import { IImageContent } from 'app/shared/model/image-content.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IImageContentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ImageContent = (props: IImageContentProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { imageContentList, match, loading } = props;
  return (
    <div>
      <h2 id="image-content-heading">
        <Translate contentKey="gadiApp.imageContent.home.title">Image Contents</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="gadiApp.imageContent.home.createLabel">Create new Image Content</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {imageContentList && imageContentList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.imageContent.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.imageContent.external">External</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.imageContent.imageUrl">Image Url</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.imageContent.size">Size</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.imageContent.keywords">Keywords</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.imageContent.content">Content</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.imageContent.active">Active</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.imageContent.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.imageContent.createdDate">Created Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.imageContent.updatedBy">Updated By</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.imageContent.updatedDate">Updated Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gadiApp.imageContent.imageType">Image Type</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {imageContentList.map((imageContent, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${imageContent.id}`} color="link" size="sm">
                      {imageContent.id}
                    </Button>
                  </td>
                  <td>{imageContent.name}</td>
                  <td>{imageContent.external ? 'true' : 'false'}</td>
                  <td>{imageContent.imageUrl}</td>
                  <td>{imageContent.size}</td>
                  <td>{imageContent.keywords}</td>
                  <td>
                    {imageContent.content ? (
                      <div>
                        {imageContent.contentContentType ? (
                          <a onClick={openFile(imageContent.contentContentType, imageContent.content)}>
                            <img
                              src={`data:${imageContent.contentContentType};base64,${imageContent.content}`}
                              style={{ maxHeight: '30px' }}
                            />
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {imageContent.contentContentType}, {byteSize(imageContent.content)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{imageContent.active ? 'true' : 'false'}</td>
                  <td>{imageContent.createdBy}</td>
                  <td>
                    {imageContent.createdDate ? <TextFormat type="date" value={imageContent.createdDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{imageContent.updatedBy}</td>
                  <td>
                    {imageContent.updatedDate ? <TextFormat type="date" value={imageContent.updatedDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {imageContent.imageType ? <Link to={`image-type/${imageContent.imageType.id}`}>{imageContent.imageType.id}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${imageContent.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${imageContent.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${imageContent.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="gadiApp.imageContent.home.notFound">No Image Contents found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ imageContent }: IRootState) => ({
  imageContentList: imageContent.entities,
  loading: imageContent.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ImageContent);
