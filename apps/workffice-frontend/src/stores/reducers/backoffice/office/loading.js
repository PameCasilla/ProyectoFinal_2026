import { LOADING_OFFICE, STOP_LOADING_OFFICE } from "../../../actions/backoffice/office/loadingActions";

export const loadingOfficeReducer = (state = false, { type }) => {
    switch (type) {
        case (LOADING_OFFICE): return true
        case (STOP_LOADING_OFFICE): return false
        default: return state
    }
}
