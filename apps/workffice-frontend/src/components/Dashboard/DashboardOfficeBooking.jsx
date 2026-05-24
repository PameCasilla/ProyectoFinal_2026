import { useFormik } from 'formik';
import { uniqueId } from 'lodash-es';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import {
    Card, CardBody, CardHeader, CardTitle, Col, Form, Row, Table
} from 'reactstrap';
import { EmptyComponent } from '../Common/Empty/EmptyComponent';
import { OfficeReportDetail } from '../Offices/OfficeReportDetail';
import { DashboardRowTable } from './DashboardRowTable';

export const DashboardOfficeBooking = ({
    monthFilter,
    offices,
    loadBookingsQuantityPerOffice,
    bookingsQuantityPerOffice,
}) => {
    const [currentMonth, setCurrentMonth] = useState(monthFilter[new Date().getMonth()].value)
    const bookingOfficeRow = () => {
        return bookingsQuantityPerOffice.map(office => {
            let officeFound = offices.find(oFound => oFound.id == office.officeId)
            const officeData = { ...office, name: officeFound.name };
            return officeData;
        })
    }
    const bestOffice = () => {
        let bestOfficeBooking = null;
        bookingsQuantityPerOffice.forEach(office => {
            if (bestOfficeBooking == null) bestOfficeBooking = office;
            if (bestOfficeBooking.totalBookings < office.totalBookings) bestOfficeBooking = office;
        });

        return offices.find(office => office.id === bestOfficeBooking.officeId);
    }

    useEffect(() => {
        loadBookingsQuantityPerOffice(currentMonth)
    }, [currentMonth])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            month: monthFilter[new Date().getMonth()]
        },
        onSubmit: values => {
            setCurrentMonth(values.month.value)
        },
    });
    return (
        <Row>
            <Col lg="6" sm="12">
                <Card>
                    <CardHeader>
                        <CardTitle tag="h4">Por mes</CardTitle>
                        <Row style={{ display: 'flex', alignContent: 'center', alignItems: 'flex-end' }}>
                            <Col sm="6">
                                <p className="card-category" style={{ color: '#34b18a' }}>Oficinas de la sucursal</p>
                            </Col>
                            <Col sm="6">
                                <div className="pull-right pull-right-filter" style={{ width: '70%' }}>
                                    <Form onSubmit={formik.handleSubmit}>
                                        <Select
                                            className="react-select primary"
                                            classNamePrefix="react-select"
                                            id="month"
                                            name="month"
                                            value={formik.values.month}
                                            closeMenuOnSelect
                                            onChange={value => {
                                                formik.setFieldValue("month", value)
                                                formik.submitForm()
                                            }}
                                            onBlur={formik.handleBlur}
                                            options={monthFilter}
                                        />
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md="12" lg="12">
                                {
                                    bookingsQuantityPerOffice.length > 0 && offices.length > 0
                                        ? (
                                            <Table>
                                                <thead>
                                                    <tr>
                                                        <td style={{ fontWeight: 'bolder', color: '#eb5d60' }}>Oficina</td>
                                                        <td className="text-right" style={{ fontWeight: 'bolder', color: '#eb5d60' }}>Reservas</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {bookingOfficeRow().map(office => <DashboardRowTable key={uniqueId()} title={office.name} value={office.totalBookings} />)}
                                                </tbody>

                                            </Table>
                                        )
                                        : <EmptyComponent></EmptyComponent>
                                }
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
            <Col lg="6" md="12">
                <Card>
                    <CardHeader>
                        <CardTitle tag="h4">Oficina del mes: <small>{formik.values.month.label}</small></CardTitle>
                        <Row style={{ display: 'flex', alignContent: 'center', alignItems: 'flex-end' }}>
                            <Col sm="6">
                                <p className="card-category" style={{ color: '#34b18a' }}>Oficina con más reservas</p>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        {
                            bookingsQuantityPerOffice.length > 0 && offices.length > 0
                                ? <OfficeReportDetail office={bestOffice()} />
                                : <EmptyComponent></EmptyComponent>
                        }
                    </CardBody>
                </Card>

            </Col>
        </Row>
    )
}
