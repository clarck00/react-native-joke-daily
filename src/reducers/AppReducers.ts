import {
APP_ACTIVE,
APP_INACTIVE
} from '../actions/types';

const INITIAL_STATE = {
  isAppActive: true
};

const appStatus = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case APP_ACTIVE:
      return {
        ...state,
        isAppActive: true
      };
      case APP_INACTIVE:
        return {
          ...state,
          isAppActive: false
        };
    default:
      return state;
  }
};

export default appStatus
