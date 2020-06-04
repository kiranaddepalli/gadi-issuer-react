import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IImageType, defaultValue } from 'app/shared/model/image-type.model';

export const ACTION_TYPES = {
  FETCH_IMAGETYPE_LIST: 'imageType/FETCH_IMAGETYPE_LIST',
  FETCH_IMAGETYPE: 'imageType/FETCH_IMAGETYPE',
  CREATE_IMAGETYPE: 'imageType/CREATE_IMAGETYPE',
  UPDATE_IMAGETYPE: 'imageType/UPDATE_IMAGETYPE',
  DELETE_IMAGETYPE: 'imageType/DELETE_IMAGETYPE',
  RESET: 'imageType/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IImageType>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type ImageTypeState = Readonly<typeof initialState>;

// Reducer

export default (state: ImageTypeState = initialState, action): ImageTypeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_IMAGETYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_IMAGETYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_IMAGETYPE):
    case REQUEST(ACTION_TYPES.UPDATE_IMAGETYPE):
    case REQUEST(ACTION_TYPES.DELETE_IMAGETYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_IMAGETYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_IMAGETYPE):
    case FAILURE(ACTION_TYPES.CREATE_IMAGETYPE):
    case FAILURE(ACTION_TYPES.UPDATE_IMAGETYPE):
    case FAILURE(ACTION_TYPES.DELETE_IMAGETYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_IMAGETYPE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_IMAGETYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_IMAGETYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_IMAGETYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_IMAGETYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/image-types';

// Actions

export const getEntities: ICrudGetAllAction<IImageType> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_IMAGETYPE_LIST,
  payload: axios.get<IImageType>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IImageType> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_IMAGETYPE,
    payload: axios.get<IImageType>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IImageType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_IMAGETYPE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IImageType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_IMAGETYPE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IImageType> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_IMAGETYPE,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
