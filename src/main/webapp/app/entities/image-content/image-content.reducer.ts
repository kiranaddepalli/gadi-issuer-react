import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IImageContent, defaultValue } from 'app/shared/model/image-content.model';

export const ACTION_TYPES = {
  FETCH_IMAGECONTENT_LIST: 'imageContent/FETCH_IMAGECONTENT_LIST',
  FETCH_IMAGECONTENT: 'imageContent/FETCH_IMAGECONTENT',
  CREATE_IMAGECONTENT: 'imageContent/CREATE_IMAGECONTENT',
  UPDATE_IMAGECONTENT: 'imageContent/UPDATE_IMAGECONTENT',
  DELETE_IMAGECONTENT: 'imageContent/DELETE_IMAGECONTENT',
  SET_BLOB: 'imageContent/SET_BLOB',
  RESET: 'imageContent/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IImageContent>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type ImageContentState = Readonly<typeof initialState>;

// Reducer

export default (state: ImageContentState = initialState, action): ImageContentState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_IMAGECONTENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_IMAGECONTENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_IMAGECONTENT):
    case REQUEST(ACTION_TYPES.UPDATE_IMAGECONTENT):
    case REQUEST(ACTION_TYPES.DELETE_IMAGECONTENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_IMAGECONTENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_IMAGECONTENT):
    case FAILURE(ACTION_TYPES.CREATE_IMAGECONTENT):
    case FAILURE(ACTION_TYPES.UPDATE_IMAGECONTENT):
    case FAILURE(ACTION_TYPES.DELETE_IMAGECONTENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_IMAGECONTENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_IMAGECONTENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_IMAGECONTENT):
    case SUCCESS(ACTION_TYPES.UPDATE_IMAGECONTENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_IMAGECONTENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType,
        },
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/image-contents';

// Actions

export const getEntities: ICrudGetAllAction<IImageContent> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_IMAGECONTENT_LIST,
  payload: axios.get<IImageContent>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IImageContent> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_IMAGECONTENT,
    payload: axios.get<IImageContent>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IImageContent> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_IMAGECONTENT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IImageContent> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_IMAGECONTENT,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IImageContent> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_IMAGECONTENT,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType,
  },
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
