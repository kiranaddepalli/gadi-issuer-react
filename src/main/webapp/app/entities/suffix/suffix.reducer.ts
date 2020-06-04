import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISuffix, defaultValue } from 'app/shared/model/suffix.model';

export const ACTION_TYPES = {
  FETCH_SUFFIX_LIST: 'suffix/FETCH_SUFFIX_LIST',
  FETCH_SUFFIX: 'suffix/FETCH_SUFFIX',
  CREATE_SUFFIX: 'suffix/CREATE_SUFFIX',
  UPDATE_SUFFIX: 'suffix/UPDATE_SUFFIX',
  DELETE_SUFFIX: 'suffix/DELETE_SUFFIX',
  RESET: 'suffix/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISuffix>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type SuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: SuffixState = initialState, action): SuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SUFFIX_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SUFFIX):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_SUFFIX):
    case REQUEST(ACTION_TYPES.UPDATE_SUFFIX):
    case REQUEST(ACTION_TYPES.DELETE_SUFFIX):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_SUFFIX_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SUFFIX):
    case FAILURE(ACTION_TYPES.CREATE_SUFFIX):
    case FAILURE(ACTION_TYPES.UPDATE_SUFFIX):
    case FAILURE(ACTION_TYPES.DELETE_SUFFIX):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_SUFFIX_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_SUFFIX):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_SUFFIX):
    case SUCCESS(ACTION_TYPES.UPDATE_SUFFIX):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_SUFFIX):
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

const apiUrl = 'api/suffixes';

// Actions

export const getEntities: ICrudGetAllAction<ISuffix> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SUFFIX_LIST,
  payload: axios.get<ISuffix>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ISuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SUFFIX,
    payload: axios.get<ISuffix>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ISuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SUFFIX,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SUFFIX,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SUFFIX,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
