import { acquireMembershipApi, createMercadoPagoPreferenceApi } from "../../../api/booking/membershipAcquisition"
import { getMembershipAcquisitions } from "../../../infra/api/booking/membershipAcquisition"
import { MEMBERSHIP_ACQUISITION_RESOURCE, setForbiddenAccessAction, setSuccessAccess } from "../errors/permissionActions"
import { setErrorAction, setSuccessAction } from "../notifications/writeNotificationActions"

export const ACQUIRE_MEMBERSHIP = 'ACQUIRE_MEMBERSHIP'

export const acquireMembershipAction = membershipAcquisition => ({
    type: ACQUIRE_MEMBERSHIP,
    payload: membershipAcquisition,
})

export const acquireMembership = membershipId => async dispatch => {
    try {
        dispatch(acquireMembershipAction(await acquireMembershipApi(membershipId)))
        dispatch(setSuccessAction())
    } catch (error) {
        dispatch(setErrorAction(error))
    }
}

export const FETCH_MEMBERSHIP_ACQUISITIONS = 'FETCH_MEMBERSHIP_ACQUISITIONS'

export const fetchMembershipAcquisitionsAction = membershipAcquisitions => ({
    type: FETCH_MEMBERSHIP_ACQUISITIONS,
    payload: membershipAcquisitions,
})

export const fetchMembershipAcquisitions = () => async dispatch => {
    try {
        dispatch(fetchMembershipAcquisitionsAction(await getMembershipAcquisitions()))
        dispatch(setSuccessAccess(MEMBERSHIP_ACQUISITION_RESOURCE))
    } catch (error) {
        dispatch(setForbiddenAccessAction(MEMBERSHIP_ACQUISITION_RESOURCE))
    }
}

export const CREATE_MERCADO_PAGO_PREFERENCE = 'CREATE_MERCADO_PAGO_PREFERENCE'

export const createMercadoPagoPreferenceAction = mpPreferenceId => ({
    type: CREATE_MERCADO_PAGO_PREFERENCE,
    payload: mpPreferenceId,
})

export const createMercadoPagoPreference = membershipAcquisitionId => async dispatch => {
    try {
        dispatch(createMercadoPagoPreferenceAction(await createMercadoPagoPreferenceApi(membershipAcquisitionId)))
    } catch (error) {
        dispatch(setErrorAction(error))
    }
}
