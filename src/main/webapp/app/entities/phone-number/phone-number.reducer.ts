import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPhoneNumber, defaultValue } from 'app/shared/model/phone-number.model';

export const ACTION_TYPES = {
  FETCH_PHONENUMBER_LIST: 'phoneNumber/FETCH_PHONENUMBER_LIST',
  FETCH_PHONENUMBER: 'phoneNumber/FETCH_PHONENUMBER',
  CREATE_PHONENUMBER: 'phoneNumber/CREATE_PHONENUMBER',
  UPDATE_PHONENUMBER: 'phoneNumber/UPDATE_PHONENUMBER',
  DELETE_PHONENUMBER: 'phoneNumber/DELETE_PHONENUMBER',
  RESET: 'phoneNumber/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPhoneNumber>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type PhoneNumberState = Readonly<typeof initialState>;

// Reducer

export default (state: PhoneNumberState = initialState, action): PhoneNumberState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PHONENUMBER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PHONENUMBER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PHONENUMBER):
    case REQUEST(ACTION_TYPES.UPDATE_PHONENUMBER):
    case REQUEST(ACTION_TYPES.DELETE_PHONENUMBER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PHONENUMBER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PHONENUMBER):
    case FAILURE(ACTION_TYPES.CREATE_PHONENUMBER):
    case FAILURE(ACTION_TYPES.UPDATE_PHONENUMBER):
    case FAILURE(ACTION_TYPES.DELETE_PHONENUMBER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PHONENUMBER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PHONENUMBER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PHONENUMBER):
    case SUCCESS(ACTION_TYPES.UPDATE_PHONENUMBER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PHONENUMBER):
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

const apiUrl = 'api/phone-numbers';

// Actions

export const getEntities: ICrudGetAllAction<IPhoneNumber> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PHONENUMBER_LIST,
  payload: axios.get<IPhoneNumber>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IPhoneNumber> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PHONENUMBER,
    payload: axios.get<IPhoneNumber>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPhoneNumber> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PHONENUMBER,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPhoneNumber> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PHONENUMBER,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPhoneNumber> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PHONENUMBER,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
