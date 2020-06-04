import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPhoneType, defaultValue } from 'app/shared/model/phone-type.model';

export const ACTION_TYPES = {
  FETCH_PHONETYPE_LIST: 'phoneType/FETCH_PHONETYPE_LIST',
  FETCH_PHONETYPE: 'phoneType/FETCH_PHONETYPE',
  CREATE_PHONETYPE: 'phoneType/CREATE_PHONETYPE',
  UPDATE_PHONETYPE: 'phoneType/UPDATE_PHONETYPE',
  DELETE_PHONETYPE: 'phoneType/DELETE_PHONETYPE',
  RESET: 'phoneType/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPhoneType>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type PhoneTypeState = Readonly<typeof initialState>;

// Reducer

export default (state: PhoneTypeState = initialState, action): PhoneTypeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PHONETYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PHONETYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PHONETYPE):
    case REQUEST(ACTION_TYPES.UPDATE_PHONETYPE):
    case REQUEST(ACTION_TYPES.DELETE_PHONETYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PHONETYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PHONETYPE):
    case FAILURE(ACTION_TYPES.CREATE_PHONETYPE):
    case FAILURE(ACTION_TYPES.UPDATE_PHONETYPE):
    case FAILURE(ACTION_TYPES.DELETE_PHONETYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PHONETYPE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PHONETYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PHONETYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_PHONETYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PHONETYPE):
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

const apiUrl = 'api/phone-types';

// Actions

export const getEntities: ICrudGetAllAction<IPhoneType> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PHONETYPE_LIST,
  payload: axios.get<IPhoneType>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IPhoneType> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PHONETYPE,
    payload: axios.get<IPhoneType>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPhoneType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PHONETYPE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPhoneType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PHONETYPE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPhoneType> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PHONETYPE,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
