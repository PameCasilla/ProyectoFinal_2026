import { bookOfficeApi, createMercadoPagoPreferenceApi, getBookingApi, getOfficeBookingsApi, getUserCurrentBookingsApi, getUserPastBookingsApi } from '../../../api/booking/booking'
import { OFFICE_ENTITY, setFoundEntity, setNotFoundEntity } from '../errors/notFoundActions'
import { BOOKING_RESOURCE, setForbiddenAccessAction, setSuccessAccess } from '../errors/permissionActions'
import { setErrorAction, setSuccessAction } from '../notifications/writeNotificationActions'
import { loadingBookingAction, stopLoadingBookingAction } from './loadingActions'

export const BOOK_OFFICE = 'BOOK_OFFICE'

export const bookOfficeAction = booking => ({
    type: BOOK_OFFICE,
    payload: booking,
})

export const bookOffice = (officeId, bookingBody) => async dispatch => {
    try {
        dispatch(bookOfficeAction(await bookOfficeApi(officeId, bookingBody)))
        dispatch(setSuccessAction())
    } catch (error) {
        dispatch(setErrorAction(error))
    }
}


export const FETCH_BOOKING = 'FETCH_BOOKING'

export const fetchBookingAction = booking => ({
    type: FETCH_BOOKING,
    payload: booking,
})

export const fetchBooking = bookingId => async dispatch => {
    try {
        dispatch(fetchBookingAction(await getBookingApi(bookingId)))
        dispatch(setSuccessAccess(BOOKING_RESOURCE))
    } catch (error) {
        if (error.error === "FORBIDDEN")
            dispatch(setForbiddenAccessAction(BOOKING_RESOURCE))
    }
}


export const CREATE_MERCADO_PAGO_PREFERENCE = 'CREATE_MERCADO_PAGO_PREFERENCE'

export const createMercadoPagoPreferenceAction = mpPreferenceId => ({
    type: CREATE_MERCADO_PAGO_PREFERENCE,
    payload: mpPreferenceId,
})

export const createMercadoPagoPreference = bookingId => async dispatch => {
    try {
        dispatch(createMercadoPagoPreferenceAction(await createMercadoPagoPreferenceApi(bookingId)))
    } catch (error) {
        dispatch(setErrorAction(error))
    }
}


export const FETCH_USER_CURRENT_BOOKINGS = 'FETCH_USER_CURRENT_BOOKINGS'

export const fetchUserCurrentBookingsAction = bookings => ({
    type: FETCH_USER_CURRENT_BOOKINGS,
    payload: bookings
})

export const fetchUserCurrentBookings = (userEmail, page = 0) => async dispatch => {
    dispatch(loadingBookingAction())
    try {
        dispatch(fetchUserCurrentBookingsAction(await getUserCurrentBookingsApi(userEmail, page)))
        dispatch(setSuccessAccess(BOOKING_RESOURCE))
    } catch (error) {
        if (error.code === "FORBIDDEN")
            dispatch(setForbiddenAccessAction(BOOKING_RESOURCE))
    } finally {
        dispatch(stopLoadingBookingAction())
    }
}


export const FETCH_USER_PAST_BOOKINGS = 'FETCH_USER_PAST_BOOKINGS'

export const fetchUserPastBookingsAction = bookings => ({
    type: FETCH_USER_PAST_BOOKINGS,
    payload: bookings
})

export const fetchUserPastBookings = (userEmail, page = 0) => async dispatch => {
    dispatch(loadingBookingAction())
    try {
        dispatch(fetchUserPastBookingsAction(await getUserPastBookingsApi(userEmail, page)))
        dispatch(setSuccessAccess(BOOKING_RESOURCE))
    } catch (error) {
        if (error.code === "FORBIDDEN")
            dispatch(setForbiddenAccessAction(BOOKING_RESOURCE))
    } finally {
        dispatch(stopLoadingBookingAction())
    }
}


export const FETCH_OFFICE_BOOKINGS = 'FETCH_OFFICE_BOOKINGS'

export const fetchOfficeBookingsAction = bookings => ({
    type: FETCH_OFFICE_BOOKINGS,
    payload: bookings
})

export const fetchOfficeBookings = (officeId, date) => async dispatch => {
    dispatch(loadingBookingAction())
    try {
        dispatch(fetchOfficeBookingsAction(await getOfficeBookingsApi(officeId, date)))
        dispatch(setSuccessAccess(BOOKING_RESOURCE))
        dispatch(setFoundEntity(OFFICE_ENTITY))
    } catch (error) {
        if (error.code === "FORBIDDEN")
            dispatch(setForbiddenAccessAction(BOOKING_RESOURCE))
        else if(error.code === "NOT_FOUND")
            dispatch(setNotFoundEntity(OFFICE_ENTITY))
    } finally {
        dispatch(stopLoadingBookingAction())
    }
}
