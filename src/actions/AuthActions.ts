import {SWITCH_USER, UPDATE_PROFILE, DELETE_PROFILE } from './types';

// when user sign in / out 
const switchUser = (user: any) => { 
  return {
    type: SWITCH_USER,
    user 
  }
}

// when user update profile
const updateProfile = (profile: any) => {
  return {
    type: UPDATE_PROFILE,
    profile
  }
}

// when user sign out
const deleteProfile = () => {
  return { 
    type: DELETE_PROFILE }
}

export { SWITCH_USER, UPDATE_PROFILE, DELETE_PROFILE }
export { switchUser, updateProfile, deleteProfile }