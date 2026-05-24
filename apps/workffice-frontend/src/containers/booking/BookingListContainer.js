import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserBookings } from '../../components/Booking/UserBookings'
import { OfficeBookings } from '../../components/OfficeBooking/OfficeBookings'
import { getOffice } from '../../stores/actions/backoffice/office/officeActions'
import { fetchOfficesList } from '../../stores/actions/backoffice/office/officesActions'
import { fetchOfficeBookings, fetchUserCurrentBookings, fetchUserPastBookings } from '../../stores/actions/booking/bookingActions'


export const UserBookingListContainer = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.userMe)
    const isLoading = useSelector(state => state.loadingBooking)
    const bookings = useSelector(state => state.userBookings.data)
    const pageInfo = useSelector(state => state.userBookings.pagination)
    const loadBookings = useCallback((userEmail, page) => {
        dispatch(fetchUserCurrentBookings(userEmail, page))
    }, [dispatch])
    const office = useSelector(state => state.office)
    const loadOffices = useCallback(id => {
        dispatch(fetchOfficesList(id))
    }, [dispatch]);
    const loadOffice = useCallback(id => {
        dispatch(getOffice(id))
    }, []);
    return <UserBookings
        bookings={bookings}
        loadBookings={loadBookings}
        loadOffices={loadOffices}
        office={office}
        loadOffice={loadOffice}
        user={user}
        isLoading={isLoading}
        pageInfo={pageInfo}
    />
}

export const UserPastBookingListContainer = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.userMe)
    const isLoading = useSelector(state => state.loadingBooking)
    const bookings = useSelector(state => state.userBookings.data)
    const office = useSelector(state => state.office)
    const loadOffices = useCallback(id => {
        dispatch(fetchOfficesList(id))
    }, [dispatch]);
    const loadOffice = useCallback(id => {
        dispatch(getOffice(id))
    }, [dispatch]);
    const loadBookings = useCallback((userEmail, page) => {
        dispatch(fetchUserPastBookings(userEmail, page))
    }, [dispatch])
    const pageInfo = useSelector(state => state.userBookings.pagination)
    return <UserBookings
        bookings={bookings}
        office={office}
        loadOffice={loadOffice}
        loadOffices={loadOffices}
        loadBookings={loadBookings}
        user={user}
        isLoading={isLoading}
        pageInfo={pageInfo}
        title={<h1 >Historial de <small color="#EB5D60">reservas</small></h1>}
    />
}

export const OfficeBookingListContainer = () => {
    const dispatch = useDispatch()
    const permission = useSelector(state => state.permission)
    const entitiesNotFound = useSelector(state => state.entitiesNotFound)
    const isLoading = useSelector(state => state.loadingBooking)
    const office = useSelector(state => state.office)
    const loadOffice = useCallback(officeId => {
        dispatch(getOffice(officeId))
    }, [])
    const loadOffices = useCallback(id => {
        dispatch(fetchOfficesList(id))
    }, [dispatch]);
    const bookings = useSelector(state => state.officeBookings)
    const loadBookings = useCallback((officeId, date) => {
        dispatch(fetchOfficeBookings(officeId, date))
    }, [dispatch])
    return <OfficeBookings
        isLoading={isLoading}
        entitiesNotFound={entitiesNotFound}
        permission={permission}
        office={office}
        loadOffice={loadOffice}
        loadOffices={loadOffices}
        bookings={bookings}
        loadBookings={loadBookings}
    />
}
