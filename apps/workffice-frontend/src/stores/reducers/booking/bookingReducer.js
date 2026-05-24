import {
    BOOK_OFFICE,
    CREATE_MERCADO_PAGO_PREFERENCE,
    FETCH_BOOKING,
    FETCH_OFFICE_BOOKINGS,
    FETCH_USER_CURRENT_BOOKINGS,
    FETCH_USER_PAST_BOOKINGS
} from "../../actions/booking/bookingActions";

export const bookingReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case (BOOK_OFFICE): return ({ id: payload })
        case (FETCH_BOOKING): return payload
        default: return state
    }
}


export const mercadoPagoPreferenceReducer = (state = null, { type, payload }) => {
    switch (type) {
        case (CREATE_MERCADO_PAGO_PREFERENCE): return payload
        default: return state
    }
}


export const userBookingsReducer = (state = { data: [], pagination: {} }, { type, payload }) => {
    switch (type) {
        case (FETCH_USER_CURRENT_BOOKINGS): return payload
        case (FETCH_USER_PAST_BOOKINGS): return payload
        default: return state
    }
}

export const officeBookingsReducer = (state = [], { type, payload }) => {
    switch (type) {
        case (FETCH_OFFICE_BOOKINGS): return payload
        default: return state
    }
}
