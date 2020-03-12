import { RECEIVE_ENTRIES, ADD_ENTRY } from '../actions/index';
export const entries = (state = {}, action) => {
  switch (action.type) {
    case ADD_ENTRY:
      return {
        ...state,
        ...action.entry
      };
    case RECEIVE_ENTRIES:
      return {
        ...state,
        ...action.entries
      };
    default:
      break;
  }
};
