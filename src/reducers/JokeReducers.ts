import {
  CHANGE_INDEX,
  INCREMENT_INDEX,
  DECREMENT_INDEX,
  ZERO_INDEX,
  NEED_REFRESH,
  DONE_REFRESH
} from '../actions/types';

const INITIAL_STATE = {
  cardIndex: 0,
  needRefresh: false
};

// const indexReducer = (state = INITIAL_STATE, action) => {
//   switch(action.type) {
//     case CHANGE_INDEX:
//       return {
//         ...state,
//         cardIndex: action.payload
//       }
//     default:
//       return state;
//   }
// }
const index = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INCREMENT_INDEX:
      return {
        ...state,
        cardIndex: state.cardIndex + 1,
      };
    case DECREMENT_INDEX:
      return {
        ...state,
        cardIndex: state.cardIndex - 1,
      };
    case CHANGE_INDEX:
      return {
        ...state,
        cardIndex: action.payload,
      };
      case ZERO_INDEX:
        return {
          ...state,
          cardIndex: 0
        };
        case NEED_REFRESH:
          return {
            ...state,
            needRefresh: true
          };
          case DONE_REFRESH:
            return {
              ...state,
              needRefresh: false
            };
    default:
      return state;
  }
};

export default index;
