import { LOADING_OFFICE_BRANCH_SEARCH, STOP_LOADING_OFFICE_BRANCH_SEARCH } from "../../actions/search/loadingActions"

export const loadingOfficeBranchSearchReducer = (state = false, { type }) => {
    switch (type) {
        case (LOADING_OFFICE_BRANCH_SEARCH): return true
        case (STOP_LOADING_OFFICE_BRANCH_SEARCH): return false
        default: return state
    }
}
