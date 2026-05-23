import { LOADING_OFFICE_BRANCH, STOP_LOADING_OFFICE_BRANCH } from "../../../actions/backoffice/officeBranch/loadingActions"

export const loadingOfficeBranchReducer = (state = false, { type }) => {
    switch (type) {
        case (LOADING_OFFICE_BRANCH): return true
        case (STOP_LOADING_OFFICE_BRANCH): return false
        default: return state
    }
}
