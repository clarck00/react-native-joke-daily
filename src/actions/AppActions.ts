import { APP_ACTIVE, APP_INACTIVE } from './types';

export const appActive = () => {
  return {
    type: APP_ACTIVE,
  }
}

export const appInactive = () => {
  return {
    type: APP_INACTIVE,
  }
}