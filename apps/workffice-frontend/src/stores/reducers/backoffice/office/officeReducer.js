import { CREATE_OFFICE, FETCH_OFFICE, UPDATE_OFFICE } from "../../../actions/backoffice/office/officeActions";


export const officeReducer = (state = null, { type, payload }) => {
    switch (type) {
        case CREATE_OFFICE:
            return state;
        case FETCH_OFFICE:
            return payload;
        case UPDATE_OFFICE:
            return state;
        default:
            return state;
    }
}
