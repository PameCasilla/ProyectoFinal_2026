import { includes } from 'lodash';
import {
    FETCH_COLLABORATOR_OFFICE_BRANCHES,
    FETCH_OFFICEBRANCHES_LIST
} from "../../../actions/backoffice/officeBranch/officeBranchesAdminActions";


export const officeBranchesReducer = (state = [], { type, payload }) => {
    switch (type) {
        case FETCH_OFFICEBRANCHES_LIST:
            return [...payload.map(officeBranch => ({ ...officeBranch, collaborator: false }))]
        case FETCH_COLLABORATOR_OFFICE_BRANCHES: {
            const officeBranchIds = payload.map(officeBranch => officeBranch.id)
            return [
                ...state.filter(officeBranch => !includes(officeBranchIds, officeBranch.id)),
                ...payload.map(officeBranch => ({ ...officeBranch, collaborator: true }))
            ]
        }
        default:
            return state
    }
}
