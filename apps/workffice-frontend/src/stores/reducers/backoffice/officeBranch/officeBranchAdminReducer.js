import {
    CLEAN_OFFICE_BRANCH,
    CREATE_OFFICE_BRANCH,
    FETCH_EDIT_OFFICEBRANCH,
    FETCH_OFFICEBRANCH_ID,
} from "../../../actions/backoffice/officeBranch/officeBranchAdminActions";


export const officeBranchAdminReducer = (state = null, { type, payload }) => {
    switch (type) {
        case CREATE_OFFICE_BRANCH:
            return state;
        case FETCH_OFFICEBRANCH_ID:
            return payload;
        case FETCH_EDIT_OFFICEBRANCH:
            return state;
        case CLEAN_OFFICE_BRANCH:
            return null;
        default:
            return state;
    }
}
