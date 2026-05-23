import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import {
    Col, Row
} from 'reactstrap';
import { Pagination } from '../Common/Pagination/Pagination';
import { BookingList } from './BookingList';

export const UserBookings = ({
    user,
    bookings,
    loadBookings,
    isLoading,
    pageInfo,
    title,
    loadOffices,
    loadOffice,
    office
}) => {
    const query = new URLSearchParams(useLocation().search);
    const currentPage = query.get('page')
    useEffect(() => {
        if (user)
            loadBookings(user.email, currentPage ? (currentPage - 1) : 0)
    }, [user ? user.id : ""])

    return (
        <div className="content">
            <Row style={{ display: 'grid', paddingTop: 40 }}>
                <Col xs="12" md="6" lg="12" xg="12">
                    {
                        title ? title : <h1 >
                            Mis <small color="#EB5D60">reservas</small>
                        </h1>
                    }
                    <hr />
                </Col>
            </Row>
            <Pagination
                currentPage={pageInfo.currentPage || 1}
                totalPages={pageInfo.totalPages || 1}
                uri="/admin/bookings/list"
            />
            {<BookingList isLoading={isLoading} bookings={bookings} loadOffices={loadOffices} loadOffice={loadOffice} office={office} />}
        </div >
    )
}

UserBookings.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string,
        email: PropTypes.string
    }),
    bookings: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        status: PropTypes.string,
        attendeesQuantity: PropTypes.number,
        scheduleDate: PropTypes.string,
        startTime: PropTypes.string,
        endTime: PropTypes.string,
        totalAmount: PropTypes.number,
        officeBranchId: PropTypes.string,
        payment: PropTypes.shape({
            providerFee: PropTypes.number,
            currency: PropTypes.string,
            paymentMethodId: PropTypes.string,
            paymentTypeId: PropTypes.string,
        })
    })),
    loadBookings: PropTypes.func,
    isLoading: PropTypes.bool,
    title: PropTypes.element,
}
