import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IHairColor, defaultValue } from 'app/shared/model/hair-color.model';

export const ACTION_TYPES = {
  FETCH_HAIRCOLOR_LIST: 'hairColor/FETCH_HAIRCOLOR_LIST',
  FETCH_HAIRCOLOR: 'hairColor/FETCH_HAIRCOLOR',
  CREATE_HAIRCOLOR: 'hairColor/CREATE_HAIRCOLOR',
  UPDATE_HAIRCOLOR: 'hairColor/UPDATE_HAIRCOLOR',
  DELETE_HAIRCOLOR: 'hairColor/DELETE_HAIRCOLOR',
  RESET: 'hairColor/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IHairColor>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type HairColorState = Readonly<typeof initialState>;

// Reducer

export default (state: HairColorState = initialState, action): HairColorState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_HAIRCOLOR_LIST):
    case REQUEST(ACTION_TYPES.FETCH_HAIRCOLOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_HAIRCOLOR):
    case REQUEST(ACTION_TYPES.UPDATE_HAIRCOLOR):
    case REQUEST(ACTION_TYPES.DELETE_HAIRCOLOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_HAIRCOLOR_LIST):
    case FAILURE(ACTION_TYPES.FETCH_HAIRCOLOR):
    case FAILURE(ACTION_TYPES.CREATE_HAIRCOLOR):
    case FAILURE(ACTION_TYPES.UPDATE_HAIRCOLOR):
    case FAILURE(ACTION_TYPES.DELETE_HAIRCOLOR):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_HAIRCOLOR_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_HAIRCOLOR):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_HAIRCOLOR):
    case SUCCESS(ACTION_TYPES.UPDATE_HAIRCOLOR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_HAIRCOLOR):
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

const apiUrl = 'api/hair-colors';

// Actions

export const getEntities: ICrudGetAllAction<IHairColor> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_HAIRCOLOR_LIST,
  payload: axios.get<IHairColor>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IHairColor> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_HAIRCOLOR,
    payload: axios.get<IHairColor>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IHairColor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_HAIRCOLOR,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IHairColor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_HAIRCOLOR,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IHairColor> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_HAIRCOLOR,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
