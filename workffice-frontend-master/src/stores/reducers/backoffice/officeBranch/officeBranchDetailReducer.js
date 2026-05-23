import { FETCH_OFFICE_BRANCH_DETAIL } from "../../../actions/backoffice/officeBranch/officeBranchDetailActions";

export const officeBranchDetailReducer = (state = null, { type, payload }) => {
    switch (type) {
        case FETCH_OFFICE_BRANCH_DETAIL:
            return payload;
        default: return state
    }
}
