import { CREATE_ROLE, DELETE_ROLE, FETCH_COLLABORATOR_ROLES, FETCH_ROLES } from "../../actions/backoffice/rolesAction";

const initialState = [];

export const rolesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_ROLES:
            return payload;
        case CREATE_ROLE:
            return state
        case DELETE_ROLE:
            return state.filter(role => role.id !== payload)
        default:
            return state;
    }
}

const collaboratorRolesInitialState = {}

export const collaboratorRolesReducer = (state = collaboratorRolesInitialState, { type, payload }) => {
    switch (type) {
        case FETCH_COLLABORATOR_ROLES: {
            return { ...state, ...payload };
        }
        default:
            return state;
    }
}
