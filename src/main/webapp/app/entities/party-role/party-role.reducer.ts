import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPartyRole, defaultValue } from 'app/shared/model/party-role.model';

export const ACTION_TYPES = {
  FETCH_PARTYROLE_LIST: 'partyRole/FETCH_PARTYROLE_LIST',
  FETCH_PARTYROLE: 'partyRole/FETCH_PARTYROLE',
  CREATE_PARTYROLE: 'partyRole/CREATE_PARTYROLE',
  UPDATE_PARTYROLE: 'partyRole/UPDATE_PARTYROLE',
  DELETE_PARTYROLE: 'partyRole/DELETE_PARTYROLE',
  RESET: 'partyRole/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPartyRole>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type PartyRoleState = Readonly<typeof initialState>;

// Reducer

export default (state: PartyRoleState = initialState, action): PartyRoleState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PARTYROLE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PARTYROLE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PARTYROLE):
    case REQUEST(ACTION_TYPES.UPDATE_PARTYROLE):
    case REQUEST(ACTION_TYPES.DELETE_PARTYROLE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PARTYROLE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PARTYROLE):
    case FAILURE(ACTION_TYPES.CREATE_PARTYROLE):
    case FAILURE(ACTION_TYPES.UPDATE_PARTYROLE):
    case FAILURE(ACTION_TYPES.DELETE_PARTYROLE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PARTYROLE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PARTYROLE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PARTYROLE):
    case SUCCESS(ACTION_TYPES.UPDATE_PARTYROLE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PARTYROLE):
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

const apiUrl = 'api/party-roles';

// Actions

export const getEntities: ICrudGetAllAction<IPartyRole> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PARTYROLE_LIST,
  payload: axios.get<IPartyRole>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IPartyRole> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PARTYROLE,
    payload: axios.get<IPartyRole>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPartyRole> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PARTYROLE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPartyRole> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PARTYROLE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPartyRole> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PARTYROLE,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
