import { LOADING_BOOKING, STOP_LOADING_BOOKING } from "../../actions/booking/loadingActions"

export const loadingBookingReducer = (state = false, { type }) => {
    switch (type) {
        case (LOADING_BOOKING): return true
        case (STOP_LOADING_BOOKING): return false
        default: return state
    }
}
