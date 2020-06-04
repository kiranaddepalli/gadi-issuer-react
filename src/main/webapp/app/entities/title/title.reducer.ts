import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITitle, defaultValue } from 'app/shared/model/title.model';

export const ACTION_TYPES = {
  FETCH_TITLE_LIST: 'title/FETCH_TITLE_LIST',
  FETCH_TITLE: 'title/FETCH_TITLE',
  CREATE_TITLE: 'title/CREATE_TITLE',
  UPDATE_TITLE: 'title/UPDATE_TITLE',
  DELETE_TITLE: 'title/DELETE_TITLE',
  RESET: 'title/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITitle>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type TitleState = Readonly<typeof initialState>;

// Reducer

export default (state: TitleState = initialState, action): TitleState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TITLE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TITLE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_TITLE):
    case REQUEST(ACTION_TYPES.UPDATE_TITLE):
    case REQUEST(ACTION_TYPES.DELETE_TITLE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_TITLE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TITLE):
    case FAILURE(ACTION_TYPES.CREATE_TITLE):
    case FAILURE(ACTION_TYPES.UPDATE_TITLE):
    case FAILURE(ACTION_TYPES.DELETE_TITLE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TITLE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TITLE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_TITLE):
    case SUCCESS(ACTION_TYPES.UPDATE_TITLE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_TITLE):
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

const apiUrl = 'api/titles';

// Actions

export const getEntities: ICrudGetAllAction<ITitle> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TITLE_LIST,
  payload: axios.get<ITitle>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ITitle> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TITLE,
    payload: axios.get<ITitle>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ITitle> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TITLE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITitle> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TITLE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITitle> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TITLE,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
