import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IExperience, defaultValue } from 'app/shared/model/experience.model';

export const ACTION_TYPES = {
  FETCH_EXPERIENCE_LIST: 'experience/FETCH_EXPERIENCE_LIST',
  FETCH_EXPERIENCE: 'experience/FETCH_EXPERIENCE',
  CREATE_EXPERIENCE: 'experience/CREATE_EXPERIENCE',
  UPDATE_EXPERIENCE: 'experience/UPDATE_EXPERIENCE',
  DELETE_EXPERIENCE: 'experience/DELETE_EXPERIENCE',
  RESET: 'experience/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IExperience>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type ExperienceState = Readonly<typeof initialState>;

// Reducer

export default (state: ExperienceState = initialState, action): ExperienceState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EXPERIENCE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EXPERIENCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_EXPERIENCE):
    case REQUEST(ACTION_TYPES.UPDATE_EXPERIENCE):
    case REQUEST(ACTION_TYPES.DELETE_EXPERIENCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_EXPERIENCE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EXPERIENCE):
    case FAILURE(ACTION_TYPES.CREATE_EXPERIENCE):
    case FAILURE(ACTION_TYPES.UPDATE_EXPERIENCE):
    case FAILURE(ACTION_TYPES.DELETE_EXPERIENCE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EXPERIENCE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EXPERIENCE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_EXPERIENCE):
    case SUCCESS(ACTION_TYPES.UPDATE_EXPERIENCE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_EXPERIENCE):
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

const apiUrl = 'api/experiences';

// Actions

export const getEntities: ICrudGetAllAction<IExperience> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_EXPERIENCE_LIST,
  payload: axios.get<IExperience>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IExperience> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EXPERIENCE,
    payload: axios.get<IExperience>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IExperience> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EXPERIENCE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IExperience> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EXPERIENCE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IExperience> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EXPERIENCE,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
