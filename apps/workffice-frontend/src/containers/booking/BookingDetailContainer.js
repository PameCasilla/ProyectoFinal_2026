import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BookingDetail } from '../../components/Booking/BookingDetail'
import { getOffice } from '../../stores/actions/backoffice/office/officeActions'
import { fetchOfficesList } from '../../stores/actions/backoffice/office/officesActions'
import { fetchBooking } from '../../stores/actions/booking/bookingActions'

export const BookingDetailContainer = () => {
    const dispatch = useDispatch()
    const permission = useSelector(state => state.permission)
    const booking = useSelector(state => state.booking)
    const loadBooking = useCallback(bookingId => {
        dispatch(fetchBooking(bookingId))
    }, [dispatch])
    const loadOffices = useCallback(id => {
        dispatch(fetchOfficesList(id))
    }, [dispatch]);
    const loadOffice = useCallback(id => {
        dispatch(getOffice(id))
    }, []);
    return <BookingDetail
        permission={permission}
        booking={booking}
        loadBooking={loadBooking}
        loadOffice={loadOffice}
        loadOffices={loadOffices}
    />
}