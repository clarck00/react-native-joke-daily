import { CHANGE_INDEX, INCREMENT_INDEX, DECREMENT_INDEX, ZERO_INDEX, NEED_REFRESH, DONE_REFRESH } from './types';

export const changeIndex = (index: number) => {
  return {
    type: CHANGE_INDEX,
    payload: index
  }
}

export const incrementIndex = () =>{
  return {
    type: INCREMENT_INDEX
  }
}

export const decrementIndex = () =>{
  return {
    type: DECREMENT_INDEX
  }
}

export const zeroIndex = () =>{
  return {
    type: ZERO_INDEX
  }
}

export const needRefresh = () =>{
  return {
    type: NEED_REFRESH,
  }
}

export const doneRefresh = () =>{
  return {
    type: DONE_REFRESH,
  }
}