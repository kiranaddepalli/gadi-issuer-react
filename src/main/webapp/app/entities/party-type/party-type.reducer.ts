import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPartyType, defaultValue } from 'app/shared/model/party-type.model';

export const ACTION_TYPES = {
  FETCH_PARTYTYPE_LIST: 'partyType/FETCH_PARTYTYPE_LIST',
  FETCH_PARTYTYPE: 'partyType/FETCH_PARTYTYPE',
  CREATE_PARTYTYPE: 'partyType/CREATE_PARTYTYPE',
  UPDATE_PARTYTYPE: 'partyType/UPDATE_PARTYTYPE',
  DELETE_PARTYTYPE: 'partyType/DELETE_PARTYTYPE',
  RESET: 'partyType/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPartyType>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type PartyTypeState = Readonly<typeof initialState>;

// Reducer

export default (state: PartyTypeState = initialState, action): PartyTypeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PARTYTYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PARTYTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PARTYTYPE):
    case REQUEST(ACTION_TYPES.UPDATE_PARTYTYPE):
    case REQUEST(ACTION_TYPES.DELETE_PARTYTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PARTYTYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PARTYTYPE):
    case FAILURE(ACTION_TYPES.CREATE_PARTYTYPE):
    case FAILURE(ACTION_TYPES.UPDATE_PARTYTYPE):
    case FAILURE(ACTION_TYPES.DELETE_PARTYTYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PARTYTYPE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PARTYTYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PARTYTYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_PARTYTYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PARTYTYPE):
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

const apiUrl = 'api/party-types';

// Actions

export const getEntities: ICrudGetAllAction<IPartyType> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PARTYTYPE_LIST,
  payload: axios.get<IPartyType>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IPartyType> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PARTYTYPE,
    payload: axios.get<IPartyType>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPartyType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PARTYTYPE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPartyType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PARTYTYPE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPartyType> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PARTYTYPE,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
