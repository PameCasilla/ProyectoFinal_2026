import { FETCH_LOGIN } from "../../actions/auth/loginActions";

const initialState = null;

export const loginReducer = (state = initialState, { type, payload }) => {
  let currentState = state;
  switch (type) {
    case FETCH_LOGIN:
      return currentState = payload;
    default:
      return currentState;
  }
}