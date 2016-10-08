import * as types from '../constants/types';

const initialState = {
  data: {},
  status: 'IDLE'
};


export default function user(state = initialState, action) {
  switch (action.type) {
  case types.SET_STATUS:
    return {
      ...state,
      status: action.status,
    };
  default:
    return state;
  }
}

