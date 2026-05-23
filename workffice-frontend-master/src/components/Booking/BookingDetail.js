import React, { useEffect } from 'react'
import { useLocation } from 'react-router'
import { Col, Container, Row } from 'reactstrap'
import { BookingComponent } from './BookingComponent'

export const BookingDetail = ({ loadBooking, booking, loadOffice, loadOffices}) => {
    const formatDate = datetime => {
        return datetime.match("(.*)T.*")[1]
    }
    const formatHour = datetime => {
        return datetime.match(".*T(.*):00")[1]
    }

    const query = new URLSearchParams(useLocation().search)

    useEffect(() => {
        loadBooking(query.get("id"))
    }, [])

    return (
        <div className="content">
            <Row style={{ display: 'grid', paddingTop: 40 }}>
                <Col xs="12" md="6" lg="12" xg="12">
                    <h1>Reserva</h1>
                    <hr />
                </Col>
            </Row>
            <Row>
                <Container>
                    <BookingComponent
                        id={booking.id}
                        officeName={booking.officeName}
                        status={booking.status}
                        attendeesQuantity={booking.attendeesQuantity}
                        scheduleDate={booking.startTime ? formatDate(booking.startTime) : ""}
                        startTime={booking.startTime ? formatHour(booking.startTime) : ""}
                        endTime={booking.startTime ? formatHour(booking.endTime) : ""}
                        transactionAmount={booking.totalAmount}
                        officeId={booking.officeId}
                        officeBranchId={booking.officeBranchId}
                        loadOffice={loadOffice}
                        loadOffices={loadOffices}
                        providerFee={booking.payment ? booking.payment.providerFee : "-"}
                        currency={booking.payment ? booking.payment.currency : "No definido"}
                        paymentMethodId={booking.payment ? booking.payment.paymentMethodId : "No definido"}
                        paymentTypeId={booking.payment ? booking.payment.paymentTypeId : "No definido"}
                    />
                </Container>
            </Row>
        </div>
    )
}
