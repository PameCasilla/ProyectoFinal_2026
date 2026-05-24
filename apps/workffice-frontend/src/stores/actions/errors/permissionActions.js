export const OFFICE_RESOURCE = "OFFICE_RESOURCE"
export const ROLE_RESOURCE = "ROLE_RESOURCE"
export const COLLABORATOR_RESOURCE = "COLLABORATOR_RESOURCE"
export const REPORT_RESOURCE = "REPORT_RESOURCE"
export const BOOKING_RESOURCE = "BOOKING_RESOURCE"
export const MEMBERSHIP_RESOURCE = "MEMBERSHIP_RESOURCE"
export const MEMBERSHIP_ACQUISITION_RESOURCE = "MEMBERSHIP_ACQUISITION_RESOURCE"


export const SET_FORBIDDEN_ACCESS = "SET_FORBIDDEN_ACCESS"
export const SET_SUCCESS_ACCESS = "SET_SUCCESS_ACCESS"


export const setForbiddenAccessAction = resource => ({
    type: SET_FORBIDDEN_ACCESS,
    payload: resource
})


export const setSuccessAccess = resource => ({
    type: SET_SUCCESS_ACCESS,
    payload: resource
})
