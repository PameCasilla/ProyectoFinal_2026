import { FETCH_AMOUNT_PER_OFFICE, FETCH_AMOUNT_PER_YEAR, FETCH_OFFICE_BOOKING } from "../../actions/backoffice/reports/reportsActions";


export const revenuePerOfficeReducer = (state = [], { type, payload }) => {
    switch (type) {
        case FETCH_AMOUNT_PER_OFFICE:
            return payload
        default: return state
    }
}

export const revenuePerMonthReducer = (state = [], { type, payload }) => {
    switch (type) {
        case FETCH_AMOUNT_PER_YEAR:
            return payload
        default: return state
    }
}

export const bookingsQuantityPerOfficeReducer = (state = [], { type, payload }) => {
    switch (type) {
        case FETCH_OFFICE_BOOKING:
            return payload
        default: return state
    }
}
