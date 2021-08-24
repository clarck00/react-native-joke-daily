import {combineReducers} from 'redux';
import {user, profile} from './AuthReducers';
import index from './JokeReducers';
import appStatus from './AppReducers'

export default combineReducers({
  user,
  profile,
  index,
  appStatus
});
