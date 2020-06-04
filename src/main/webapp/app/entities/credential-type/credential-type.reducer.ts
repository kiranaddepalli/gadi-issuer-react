import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICredentialType, defaultValue } from 'app/shared/model/credential-type.model';

export const ACTION_TYPES = {
  FETCH_CREDENTIALTYPE_LIST: 'credentialType/FETCH_CREDENTIALTYPE_LIST',
  FETCH_CREDENTIALTYPE: 'credentialType/FETCH_CREDENTIALTYPE',
  CREATE_CREDENTIALTYPE: 'credentialType/CREATE_CREDENTIALTYPE',
  UPDATE_CREDENTIALTYPE: 'credentialType/UPDATE_CREDENTIALTYPE',
  DELETE_CREDENTIALTYPE: 'credentialType/DELETE_CREDENTIALTYPE',
  RESET: 'credentialType/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICredentialType>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type CredentialTypeState = Readonly<typeof initialState>;

// Reducer

export default (state: CredentialTypeState = initialState, action): CredentialTypeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CREDENTIALTYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CREDENTIALTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_CREDENTIALTYPE):
    case REQUEST(ACTION_TYPES.UPDATE_CREDENTIALTYPE):
    case REQUEST(ACTION_TYPES.DELETE_CREDENTIALTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_CREDENTIALTYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CREDENTIALTYPE):
    case FAILURE(ACTION_TYPES.CREATE_CREDENTIALTYPE):
    case FAILURE(ACTION_TYPES.UPDATE_CREDENTIALTYPE):
    case FAILURE(ACTION_TYPES.DELETE_CREDENTIALTYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CREDENTIALTYPE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CREDENTIALTYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_CREDENTIALTYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_CREDENTIALTYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_CREDENTIALTYPE):
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

const apiUrl = 'api/credential-types';

// Actions

export const getEntities: ICrudGetAllAction<ICredentialType> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CREDENTIALTYPE_LIST,
  payload: axios.get<ICredentialType>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ICredentialType> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CREDENTIALTYPE,
    payload: axios.get<ICredentialType>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ICredentialType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CREDENTIALTYPE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICredentialType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CREDENTIALTYPE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICredentialType> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CREDENTIALTYPE,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
