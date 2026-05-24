import { acquireMembership, createMercadoPagoPreference, getMembershipAcquisitions } from "../../infra/api/booking/membershipAcquisition"

export const acquireMembershipApi = membershipId => {
    return Promise.resolve(acquireMembership(membershipId))
}

export const getMembershipAcquisitionsApi = () => {
    return Promise.resolve(getMembershipAcquisitions())
}

export const createMercadoPagoPreferenceApi = membershipAcquisitionId => {
    return Promise.resolve(createMercadoPagoPreference(membershipAcquisitionId))
}
