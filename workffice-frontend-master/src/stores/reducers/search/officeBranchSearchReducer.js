import { SEARCH_OFFICE_BRANCHES } from "../../actions/search/officeBranchSearchActions";


export const officeBranchSearchReducer = (state = [], { type, payload }) => {
    switch (type) {
        case SEARCH_OFFICE_BRANCHES:
            return payload;
        default:
            return state;
    }
}
