import { CREATE_MEMBERSHIP, DELETE_MEMBERSHIP, FETCH_ALL_MEMBERSHIP, UPDATE_MEMBERSHIP } from "../../../actions/backoffice/membership/membership";

const initialState = {
    membershipList: [],
    membership: null
};

export const membershipReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CREATE_MEMBERSHIP: return { ...state, membership: payload.data };
        case DELETE_MEMBERSHIP: return { ...state, membership: payload.data };
        case UPDATE_MEMBERSHIP: return { ...state, membership: payload.data };
        case FETCH_ALL_MEMBERSHIP: return { ...state, membershipList: payload.data };
        default: return state;
    }
}
