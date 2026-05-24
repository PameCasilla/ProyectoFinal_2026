import { FETCH_RECOVERY } from "../../actions/auth/recoveryPasswordActions";

const initialState = null;

export const recoveryReducer = (state = initialState, { type, payload }) => {
    let currentState = state;
    if (type === FETCH_RECOVERY) { currentState = payload; }
    return currentState
}