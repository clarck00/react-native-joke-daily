import {UPDATE_PROFILE, DELETE_PROFILE, SWITCH_USER} from '../actions/types';

const INITIAL_STATE = {
  userReceipt: '',
  loginIsLoading: false,
};

export function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SWITCH_USER:
      return action.user;
    default:
      return state;
  }
}

export function profile(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_PROFILE:
      return Object.assign({}, state, action.profile);
    case DELETE_PROFILE:
      return {};
    default:
      return state;
  }
}
