import { SUCCESS_LOGOUT } from "../../actions/auth/logoutActions";
import { UPDATE_USER } from "../../actions/backoffice/userActions";
import { FETCH_ME } from "../../actions/backoffice/userActions";


const initialState = null;

export const userMeReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_ME:
            return payload
        case UPDATE_USER:
            return state
        case SUCCESS_LOGOUT:
            state = null;
            return state
        default:
            return state;
    }
}
