import { ACQUIRE_MEMBERSHIP, CREATE_MERCADO_PAGO_PREFERENCE, FETCH_MEMBERSHIP_ACQUISITIONS } from "../../actions/booking/membershipAcquisitionActions"

export const membershipAcquisitionReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case (ACQUIRE_MEMBERSHIP): return ({ id: payload })
        default: return state
    }
}


export const membershipAcquisitionsReducer = (state = [], { type, payload }) => {
    switch (type) {
        case (FETCH_MEMBERSHIP_ACQUISITIONS): return payload
        default: return state
    }
}

export const mercadoPagoPreferenceReducer = (state = null, { type, payload }) => {
    switch (type) {
        case (CREATE_MERCADO_PAGO_PREFERENCE): return payload
        default: return state
    }
}
