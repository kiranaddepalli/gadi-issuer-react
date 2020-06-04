import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAddressType, defaultValue } from 'app/shared/model/address-type.model';

export const ACTION_TYPES = {
  FETCH_ADDRESSTYPE_LIST: 'addressType/FETCH_ADDRESSTYPE_LIST',
  FETCH_ADDRESSTYPE: 'addressType/FETCH_ADDRESSTYPE',
  CREATE_ADDRESSTYPE: 'addressType/CREATE_ADDRESSTYPE',
  UPDATE_ADDRESSTYPE: 'addressType/UPDATE_ADDRESSTYPE',
  DELETE_ADDRESSTYPE: 'addressType/DELETE_ADDRESSTYPE',
  RESET: 'addressType/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAddressType>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type AddressTypeState = Readonly<typeof initialState>;

// Reducer

export default (state: AddressTypeState = initialState, action): AddressTypeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ADDRESSTYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ADDRESSTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_ADDRESSTYPE):
    case REQUEST(ACTION_TYPES.UPDATE_ADDRESSTYPE):
    case REQUEST(ACTION_TYPES.DELETE_ADDRESSTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_ADDRESSTYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ADDRESSTYPE):
    case FAILURE(ACTION_TYPES.CREATE_ADDRESSTYPE):
    case FAILURE(ACTION_TYPES.UPDATE_ADDRESSTYPE):
    case FAILURE(ACTION_TYPES.DELETE_ADDRESSTYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ADDRESSTYPE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ADDRESSTYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_ADDRESSTYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_ADDRESSTYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_ADDRESSTYPE):
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

const apiUrl = 'api/address-types';

// Actions

export const getEntities: ICrudGetAllAction<IAddressType> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ADDRESSTYPE_LIST,
  payload: axios.get<IAddressType>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IAddressType> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ADDRESSTYPE,
    payload: axios.get<IAddressType>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IAddressType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ADDRESSTYPE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAddressType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ADDRESSTYPE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAddressType> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ADDRESSTYPE,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
