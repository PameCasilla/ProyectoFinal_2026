import { CREATE_COLLABORATOR, DELETE_COLLABORATOR, UPDATE_COLLABORATOR } from "../../../actions/backoffice/collaborator/collaboratorAction"
import { FETCH_COLLABORATORS } from "../../../actions/backoffice/collaborator/collaboratorsAction"

const initialState = null

export const collaboratorsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_COLLABORATORS:
            return [...payload]
        case CREATE_COLLABORATOR:
            return state
        case UPDATE_COLLABORATOR:
            return state
        case DELETE_COLLABORATOR:
            return state.filter(collaborator => collaborator.id !== payload)
        default:
            return state
    }
}
