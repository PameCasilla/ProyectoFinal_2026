import { FETCH_CONFIRM_PASSWORD } from "../../actions/auth/confirmationPasswordActions";


const initialState = null;

export const activatePasswordReducer = (state = initialState, { type, payload }) => {
    let currentState = state;
    if (type === FETCH_CONFIRM_PASSWORD) {
        currentState = payload;
    }
    return currentState

}