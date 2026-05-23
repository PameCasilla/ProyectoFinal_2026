import { FETCH_CONFIRM_ACCOUNT } from "../../actions/auth/confirmationAccountActions";

const initialState = null;

export const activateAccountReducer = (state = initialState, { type, payload }) => {
    let currentState = state;
    if (type === FETCH_CONFIRM_ACCOUNT){
        currentState = payload;
    }
    return currentState

}