import { LOADING_COLLABORATOR, STOP_LOADING_COLLABORATOR } from "../../../actions/backoffice/collaborator/loadingActions";

export const loadingCollaboratorReducer = (state = false, { type }) => {
    switch (type) {
        case (LOADING_COLLABORATOR): return true
        case (STOP_LOADING_COLLABORATOR): return false
        default: return state
    }
}
