import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEmailType, defaultValue } from 'app/shared/model/email-type.model';

export const ACTION_TYPES = {
  FETCH_EMAILTYPE_LIST: 'emailType/FETCH_EMAILTYPE_LIST',
  FETCH_EMAILTYPE: 'emailType/FETCH_EMAILTYPE',
  CREATE_EMAILTYPE: 'emailType/CREATE_EMAILTYPE',
  UPDATE_EMAILTYPE: 'emailType/UPDATE_EMAILTYPE',
  DELETE_EMAILTYPE: 'emailType/DELETE_EMAILTYPE',
  RESET: 'emailType/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEmailType>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type EmailTypeState = Readonly<typeof initialState>;

// Reducer

export default (state: EmailTypeState = initialState, action): EmailTypeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EMAILTYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EMAILTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_EMAILTYPE):
    case REQUEST(ACTION_TYPES.UPDATE_EMAILTYPE):
    case REQUEST(ACTION_TYPES.DELETE_EMAILTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_EMAILTYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EMAILTYPE):
    case FAILURE(ACTION_TYPES.CREATE_EMAILTYPE):
    case FAILURE(ACTION_TYPES.UPDATE_EMAILTYPE):
    case FAILURE(ACTION_TYPES.DELETE_EMAILTYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMAILTYPE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMAILTYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_EMAILTYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_EMAILTYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_EMAILTYPE):
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

const apiUrl = 'api/email-types';

// Actions

export const getEntities: ICrudGetAllAction<IEmailType> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_EMAILTYPE_LIST,
  payload: axios.get<IEmailType>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IEmailType> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EMAILTYPE,
    payload: axios.get<IEmailType>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IEmailType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EMAILTYPE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEmailType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EMAILTYPE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEmailType> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EMAILTYPE,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
