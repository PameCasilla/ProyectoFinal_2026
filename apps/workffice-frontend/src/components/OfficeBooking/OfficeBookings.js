import { useFormik } from 'formik'
import { includes } from 'lodash-es'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import ReactDatetimeClass from 'react-datetime'
import { useLocation } from 'react-router'
import { Col, Form, FormGroup, Label, Row } from 'reactstrap'
import { OFFICE_ENTITY } from '../../stores/actions/errors/notFoundActions'
import { BOOKING_RESOURCE } from '../../stores/actions/errors/permissionActions'
import { BookingList } from '../Booking/BookingList'
import { NotAccess } from '../Common/ErrorPages/NotAccess'


export const OfficeBookings = ({
    loadOffices,
    loadOffice,
    entitiesNotFound,
    permission,
    office,
    loadBookings,
    bookings,
    isLoading,
}) => {

    const officeId = new URLSearchParams(useLocation().search).get("id")
    const currentDate = new Date()
    const [date, setDate] = useState(currentDate.toISOString().match("(.*)T.*")[1])

    useEffect(() => {
        if (officeId)
            return loadBookings(officeId, date)
    }, [date])

    useEffect(() => {
        if (officeId)
            return loadOffice(officeId)
    }, [])

    const validate = values => {
        const errors = {};
        if (!values.date)
            errors.date = 'Requerido.';
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            date: moment(),
        },
        validate,
        onSubmit: ({ date }) => {
            setDate(date.toISOString().match("(.*)T.*")[1])
        }
    })

    const renderBookings = () => {
        // if (permission.isForbidden && includes(permission.resources, BOOKING_RESOURCE))
        //     return <NotAccess message="No tienes acceso a las reservas de esta sucursal" />
        return <>
            <Row style={{ display: 'grid', paddingTop: 40 }}>
                <Col xs="12" md="6" lg="12" xg="12">
                    <h1>
                        Reservas de la oficina <small color="#EB5D60">{office ? office.name : ""}</small>
                    </h1>
                    <hr />
                </Col>
            </Row>
            {
                permission.isForbidden && includes(permission.resources, BOOKING_RESOURCE)
                    ? <Row style={{ justifyContent: "center" }}>
                        <NotAccess message="No tienes acceso a las reservas de esta sucursal" />
                    </Row>
                    : <> <Form onSubmit={formik.handleSubmit}>
                        <Row style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
                            <Label htmlFor="date" className="label-form" style={{ fontSize: 20 }}>Seleccione una fecha</Label>
                            <FormGroup style={{ marginLeft: 20, marginTop: 10 }}>
                                <ReactDatetimeClass
                                    initialValue={formik.values.date}
                                    name="date"
                                    id="date"
                                    onChange={value => {
                                        formik.setFieldValue("date", value)
                                        formik.submitForm()
                                    }}
                                    timeFormat={false}
                                    inputProps={{ placeholder: "Seleccione una fecha" }}
                                />
                            </FormGroup>
                        </Row>
                    </Form>

                        <BookingList isLoading={isLoading} bookings={bookings} loadOffices={loadOffices} disableBookingLinks={true} office={office} />
                    </>
            }
        </>
    }

    return (
        <div className="content">
            {
                includes(entitiesNotFound, OFFICE_ENTITY)
                    ? <h1>La oficina que busca no existe</h1> : renderBookings()
            }
        </div>
    )
}
