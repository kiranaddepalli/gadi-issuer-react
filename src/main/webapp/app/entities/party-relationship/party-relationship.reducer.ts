import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPartyRelationship, defaultValue } from 'app/shared/model/party-relationship.model';

export const ACTION_TYPES = {
  FETCH_PARTYRELATIONSHIP_LIST: 'partyRelationship/FETCH_PARTYRELATIONSHIP_LIST',
  FETCH_PARTYRELATIONSHIP: 'partyRelationship/FETCH_PARTYRELATIONSHIP',
  CREATE_PARTYRELATIONSHIP: 'partyRelationship/CREATE_PARTYRELATIONSHIP',
  UPDATE_PARTYRELATIONSHIP: 'partyRelationship/UPDATE_PARTYRELATIONSHIP',
  DELETE_PARTYRELATIONSHIP: 'partyRelationship/DELETE_PARTYRELATIONSHIP',
  RESET: 'partyRelationship/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPartyRelationship>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type PartyRelationshipState = Readonly<typeof initialState>;

// Reducer

export default (state: PartyRelationshipState = initialState, action): PartyRelationshipState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PARTYRELATIONSHIP_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PARTYRELATIONSHIP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PARTYRELATIONSHIP):
    case REQUEST(ACTION_TYPES.UPDATE_PARTYRELATIONSHIP):
    case REQUEST(ACTION_TYPES.DELETE_PARTYRELATIONSHIP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PARTYRELATIONSHIP_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PARTYRELATIONSHIP):
    case FAILURE(ACTION_TYPES.CREATE_PARTYRELATIONSHIP):
    case FAILURE(ACTION_TYPES.UPDATE_PARTYRELATIONSHIP):
    case FAILURE(ACTION_TYPES.DELETE_PARTYRELATIONSHIP):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PARTYRELATIONSHIP_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PARTYRELATIONSHIP):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PARTYRELATIONSHIP):
    case SUCCESS(ACTION_TYPES.UPDATE_PARTYRELATIONSHIP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PARTYRELATIONSHIP):
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

const apiUrl = 'api/party-relationships';

// Actions

export const getEntities: ICrudGetAllAction<IPartyRelationship> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PARTYRELATIONSHIP_LIST,
  payload: axios.get<IPartyRelationship>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IPartyRelationship> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PARTYRELATIONSHIP,
    payload: axios.get<IPartyRelationship>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPartyRelationship> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PARTYRELATIONSHIP,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPartyRelationship> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PARTYRELATIONSHIP,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPartyRelationship> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PARTYRELATIONSHIP,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
