import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITenureType, defaultValue } from 'app/shared/model/tenure-type.model';

export const ACTION_TYPES = {
  FETCH_TENURETYPE_LIST: 'tenureType/FETCH_TENURETYPE_LIST',
  FETCH_TENURETYPE: 'tenureType/FETCH_TENURETYPE',
  CREATE_TENURETYPE: 'tenureType/CREATE_TENURETYPE',
  UPDATE_TENURETYPE: 'tenureType/UPDATE_TENURETYPE',
  DELETE_TENURETYPE: 'tenureType/DELETE_TENURETYPE',
  RESET: 'tenureType/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITenureType>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type TenureTypeState = Readonly<typeof initialState>;

// Reducer

export default (state: TenureTypeState = initialState, action): TenureTypeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TENURETYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TENURETYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_TENURETYPE):
    case REQUEST(ACTION_TYPES.UPDATE_TENURETYPE):
    case REQUEST(ACTION_TYPES.DELETE_TENURETYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_TENURETYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TENURETYPE):
    case FAILURE(ACTION_TYPES.CREATE_TENURETYPE):
    case FAILURE(ACTION_TYPES.UPDATE_TENURETYPE):
    case FAILURE(ACTION_TYPES.DELETE_TENURETYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TENURETYPE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TENURETYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_TENURETYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_TENURETYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_TENURETYPE):
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

const apiUrl = 'api/tenure-types';

// Actions

export const getEntities: ICrudGetAllAction<ITenureType> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TENURETYPE_LIST,
  payload: axios.get<ITenureType>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ITenureType> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TENURETYPE,
    payload: axios.get<ITenureType>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ITenureType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TENURETYPE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITenureType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TENURETYPE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITenureType> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TENURETYPE,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
