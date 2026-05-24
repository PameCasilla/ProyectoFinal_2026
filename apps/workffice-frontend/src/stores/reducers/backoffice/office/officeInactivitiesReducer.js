import { FETCH_OFFICE_INACTIVITIES } from "../../../actions/backoffice/office/officeInactivitiesAction";

export const officeInactivitiesReducer = (state = [], { type, payload }) => {
    switch (type) {
        case (FETCH_OFFICE_INACTIVITIES): return payload
        default: return state
    }
}
