import { FETCH_REGISTER } from '../../actions/auth/registerActions';

const initialState = null;

export const registerReducer = (state = initialState, { type, payload }) => {
  let currentState = state;
  switch (type) {
    case FETCH_REGISTER:
      return currentState = payload;
    default:
      return currentState;
  }
};
