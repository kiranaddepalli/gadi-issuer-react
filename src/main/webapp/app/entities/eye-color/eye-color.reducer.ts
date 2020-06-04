import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEyeColor, defaultValue } from 'app/shared/model/eye-color.model';

export const ACTION_TYPES = {
  FETCH_EYECOLOR_LIST: 'eyeColor/FETCH_EYECOLOR_LIST',
  FETCH_EYECOLOR: 'eyeColor/FETCH_EYECOLOR',
  CREATE_EYECOLOR: 'eyeColor/CREATE_EYECOLOR',
  UPDATE_EYECOLOR: 'eyeColor/UPDATE_EYECOLOR',
  DELETE_EYECOLOR: 'eyeColor/DELETE_EYECOLOR',
  RESET: 'eyeColor/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEyeColor>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type EyeColorState = Readonly<typeof initialState>;

// Reducer

export default (state: EyeColorState = initialState, action): EyeColorState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EYECOLOR_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EYECOLOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_EYECOLOR):
    case REQUEST(ACTION_TYPES.UPDATE_EYECOLOR):
    case REQUEST(ACTION_TYPES.DELETE_EYECOLOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_EYECOLOR_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EYECOLOR):
    case FAILURE(ACTION_TYPES.CREATE_EYECOLOR):
    case FAILURE(ACTION_TYPES.UPDATE_EYECOLOR):
    case FAILURE(ACTION_TYPES.DELETE_EYECOLOR):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EYECOLOR_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EYECOLOR):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_EYECOLOR):
    case SUCCESS(ACTION_TYPES.UPDATE_EYECOLOR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_EYECOLOR):
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

const apiUrl = 'api/eye-colors';

// Actions

export const getEntities: ICrudGetAllAction<IEyeColor> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_EYECOLOR_LIST,
  payload: axios.get<IEyeColor>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IEyeColor> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EYECOLOR,
    payload: axios.get<IEyeColor>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IEyeColor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EYECOLOR,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEyeColor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EYECOLOR,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEyeColor> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EYECOLOR,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
