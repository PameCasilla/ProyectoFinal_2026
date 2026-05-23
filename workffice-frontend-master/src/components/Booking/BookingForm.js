import { useFormik } from 'formik';
import { includes } from 'lodash-es';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Datetime from 'react-datetime';
import { useLocation } from 'react-router';
import {
    Badge,
    Button, Card, Col, Form,
    FormGroup, Input, Label, Row, UncontrolledTooltip
} from 'reactstrap';
import { getErrorMessage } from '../../utils/bookingTranslations';
import { Cloudinary } from '../Common/Cloudinary/Cloudinary';
import { Notification } from '../Common/Notification/Notification';
import './styles/OfficeBookingStyle.css';


const addCheckout = preferenceId => {
    const mp = new window.MercadoPago('TEST-34c7f33c-0c48-4dfd-b26c-61fb7700fbc5', {
        locale: 'es-AR'
    });

    // Inicializa el checkout
    return mp.checkout({
        preference: { id: preferenceId },
    });
}

export const BookingForm = ({
    officeNotFound,
    officeBranch,
    loadOfficeBranch,
    office,
    loadOffice,
    notification,
    hideNotification,
    inactivities,
    loadInactivities,
    createBooking,
    booking,
    mercadoPagoPreferenceId,
    createMercadoPagoPreference,
}) => {
    const query = new URLSearchParams(useLocation().search)
    const officeId = query.get("officeId")
    const officeBranchId = query.get("officeBranchId")
    const [mpCheckout, setMpCheckout] = useState(null)
    useEffect(() => {
        if (officeBranchId)
            loadOfficeBranch(officeBranchId)
    }, [])
    useEffect(() => {
        if (officeId)
            loadOffice(officeId)
    }, [])
    useEffect(() => {
        if (officeId)
            loadInactivities(officeId)
    }, [])
    useEffect(() => {
        const bookingId = booking ? booking.id : null
        if (bookingId && !formik.values.membershipAcquisitionCode)
            createMercadoPagoPreference(bookingId)
    }, [booking ? booking.id : ""])
    useEffect(() => {
        if (mercadoPagoPreferenceId) {
            const script = document.createElement('script');
            const checkout = addCheckout(mercadoPagoPreferenceId)
            script.type = 'text/javascript';
            script.src = 'https://sdk.mercadopago.com/js/v2';
            script.addEventListener('load', addCheckout); // Cuando cargue el script, se ejecutará la función addCheckout
            document.body.appendChild(script);
            setMpCheckout(checkout)
        }
    }, [mercadoPagoPreferenceId]);
    useEffect(() => {
        if (notification.show)
            setTimeout(() => {
                hideNotification()
            }, 2500)
    }, [notification.show])

    const validate = values => {
        const errors = {};
        if (!values.date)
            errors.date = 'Requerido.';
        if (!values.startTime)
            errors.startTime = 'Requerido.';
        if (!values.endTime)
            errors.endTime = 'Requerido.';
        if (!values.numberOfAssistants)
            errors.numberOfAssistants = 'Requerido.';
        if (values.numberOfAssistants > office.capacity)
            errors.numberOfAssistants = 'La cantidad de asistentes no puede superar a la capacidad maxima de la oficina';
        if (values.endTime.hours() - values.startTime.hours() <= 0)
            errors.invalidTimeRange = 'La hora de ingreso debe ser previa a la hora de salida'
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            date: moment(),
            startTime: moment().hour(8),
            endTime: moment().hour(9),
            numberOfAssistants: 0,
            membershipAcquisitionCode: null,
        },
        validate,
        onSubmit: async ({ date, startTime, endTime, numberOfAssistants, membershipAcquisitionCode }) => {
            const start = startTime.hours() < 10 ? "0" + startTime.hours() : startTime.hours()
            const end = endTime.hours() < 10 ? "0" + endTime.hours() : endTime.hours()
            const booking = {
                startTime: `${date.format("YYYY-MM-DD")}T${start}:00:00`,
                endTime: `${date.format("YYYY-MM-DD")}T${end}:00:00`,
                attendeesQuantity: numberOfAssistants,
                membershipAcquisitionId: membershipAcquisitionCode,
            }
            createBooking(office.id, booking)
        },
    });

    const getOfficeType = () => {
        if (office.privacy === "SHARED")
            return <Badge color="info">Compartida</Badge>
        return <Badge color="danger">Privada</Badge>
    }

    const daysOfWeek = [
        "MONDAY", "TUESDAY", "WEDNESDAY",
        "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"
    ]
    const getDay = day => {
        switch (day) {
            case ("MONDAY"): return "Lunes"
            case ("TUESDAY"): return "Martes"
            case ("WEDNESDAY"): return "Miércoles"
            case ("THURSDAY"): return "Jueves"
            case ("FRIDAY"): return "Viernes"
            case ("SATURDAY"): return "Sábado"
            case ("SUNDAY"): return "Domingo"
        }
    }
    const getLabelColor = day => {
        return includes(inactivities.map(inactivity => inactivity.dayOfWeek), day)
            ? "danger" : "info"
    }

    const renderBookingForm = () => {
        return (
            <>
                <Row style={{ display: 'grid', paddingTop: 40 }}>
                    <Col xs="12" md="6" lg="12" xg="12">
                        <h1>
                            Alquilar <small color="red">{office ? office.name : ""}</small>
                        </h1>
                        <hr />
                    </Col>
                </Row>
                <Notification
                    isError
                    message={getErrorMessage(notification.errorCode)}
                    show={notification.show && notification.isError}
                    hideNotification={hideNotification}
                />
                <Notification
                    message="La reserva se creo correctamente"
                    show={notification.show && notification.isSuccess}
                    hideNotification={hideNotification}
                />
                <Card>
                    <Row>
                        <Col xs="12" md="6" lg="6" xg="6" >
                            <Form style={{ padding: "5%" }}>
                                <Cloudinary publicId={office ? office.imageUrl : ""} height="300" width="500" />
                                <Row style={{ paddingLeft: "5%", paddingRight: '5%', display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <Label htmlFor="officeBranchName" className="label-form">Sucursal <Label style={{ color: "#EB5D60", fontSize: 18 }}>{officeBranch ? officeBranch.name : ""}</Label> </Label>
                                    </div>
                                    <div>
                                        <Label htmlFor="officeType" className="label-form">Tipo de oficina <Label style={{ color: "#EB5D60", fontSize: 18 }}>{office ? getOfficeType() : ""}</Label> </Label>
                                    </div>
                                </Row>
                                <Row style={{ paddingLeft: "5%", paddingRight: '5%', display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <Label htmlFor="officePrice" className="label-form">Precio por hora $ <Label style={{ color: "#EB5D60", fontSize: 18 }}>{office ? office.price : ""}</Label> </Label>
                                    </div>
                                    <div>
                                        <Label htmlFor="officeContact" className="label-form">Contacto <Label style={{ color: "#EB5D60", fontSize: 18 }}>{officeBranch ? officeBranch.phone : ""}</Label> </Label>
                                    </div>
                                </Row>
                                <Row style={{ paddingLeft: "5%" }}>
                                    <Label htmlFor="officePrice" className="label-form">Capacidad <Label style={{ color: "#EB5D60", fontSize: 18 }}>{office ? office.capacity + " personas" : ""}</Label></Label>
                                </Row>
                                <Row style={{ paddingLeft: "5%" }}>
                                    <Label htmlFor="officePrice" className="label-form">Disponibilidad </Label>
                                </Row>
                                <Row style={{ paddingLeft: "5%" }}>
                                    {
                                        daysOfWeek.map(day =>
                                            <Badge id={`down-${day}`} key={day} color={getLabelColor(day)}>
                                                {
                                                    getLabelColor(day) === "danger"
                                                        ? <UncontrolledTooltip placement="bottom" target={`down-${day}`} delay={0}>
                                                            No disponible
                                                        </UncontrolledTooltip> : <></>
                                                }

                                                {getDay(day)}
                                            </Badge>
                                        )
                                    }
                                </Row>
                            </Form>
                        </Col>
                        <Col xs="12" md="6" lg="6" xg="6">
                            <Form onSubmit={formik.handleSubmit} style={{ padding: "5%" }}>
                                <FormGroup className={formik.errors.date ? 'has-danger' : ''}>
                                    <Label htmlFor="date" className="label-form">Fecha</Label>
                                    <FormGroup>
                                        <Datetime
                                            initialValue={formik.values.date}
                                            name="date"
                                            id="date"
                                            onChange={value => formik.setFieldValue("date", value)}
                                            timeFormat={false}
                                            inputProps={{ placeholder: "Seleccione una fecha" }}
                                            isValidDate={current => {
                                                const yesterday = moment().subtract(1, 'day');
                                                return current.isAfter(yesterday);
                                            }}
                                        />
                                    </FormGroup>
                                </FormGroup>

                                <Row>
                                    <Col md="6">
                                        <Label htmlFor="startTime" className="label-form">Hora ingreso</Label>
                                        <FormGroup className={formik.errors.startTime ? 'has-danger' : ''}>
                                            <Datetime
                                                name="startTime"
                                                id="startTime"
                                                initialValue={formik.values.startTime}
                                                onChange={value => formik.setFieldValue("startTime", value)}
                                                dateFormat={false}
                                                timeFormat="HH"
                                                input={false}
                                                timeConstraints={{ hours: { min: 8, max: 17 } }}
                                                inputProps={{ placeholder: "Seleccione la hora de ingreso" }}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="6">
                                        <FormGroup className={formik.errors.endTime ? 'has-danger' : ''}>
                                            <Label htmlFor="endTime" className="label-form">Hora salida</Label>
                                            <Datetime
                                                name="endTime"
                                                id="endTime"
                                                initialValue={formik.values.endTime}
                                                onChange={value => formik.setFieldValue("endTime", value)}
                                                dateFormat={false}
                                                timeFormat="HH"
                                                input={false}
                                                timeConstraints={{ hours: { min: 9, max: 18 } }}
                                                inputProps={{ placeholder: "Seleccione la hora de salida" }}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                {formik.errors.invalidTimeRange ? <Label className="text-danger">{formik.errors.invalidTimeRange}</Label> : <></>}


                                <FormGroup className={formik.errors.numberOfAssistants ? 'has-danger' : ''}>
                                    <Label htmlFor="numberOfAssistants" className="label-form">Cantidad de asistentes</Label>
                                    <Input
                                        type="number"
                                        placeholder="Ingrese el número de personas..."
                                        name="numberOfAssistants"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        min={1}
                                        max={office && office.capacity}
                                        value={formik.values.numberOfAssistants}
                                    />
                                    {formik.errors.numberOfAssistants ? <Label className="text-danger">{formik.errors.numberOfAssistants}</Label> : <></>}
                                </FormGroup>

                                <FormGroup>
                                    <Label htmlFor="membershipAcquisitionCode" className="label-form">Código de compra de membresía</Label>
                                    <Input
                                        type="string"
                                        placeholder="Ingrese el código de compra"
                                        name="membershipAcquisitionCode"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.membershipAcquisitionCode}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    {
                                        office && !formik.errors.invalidTimeRange
                                            ? <Label className="label-form">
                                                <Label htmlFor="officePrice" className="label-form">Precio total $ <Label style={{ color: "#EB5D60", fontSize: 18 }}>{office.price * (formik.values.endTime.hours() - formik.values.startTime.hours())}</Label> </Label>
                                            </Label>
                                            : <Label className="label-form">
                                                Precio total $
                                            </Label>
                                    }

                                </FormGroup>
                                <Row style={{ marginTop: '1%', marginBottom: '1%' }}>
                                    <Col style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button
                                            className="btn-round btn-primary"
                                            color="primary"
                                            type="submit"
                                            disabled={formik.isSubmitting}>
                                            Alquilar Oficina
                                        </Button>
                                        <Button
                                            type="reset"
                                            className="btn-round btn-info cho-container"
                                            color="info"
                                            onClick={mpCheckout ? mpCheckout.open : null}
                                            disabled={mercadoPagoPreferenceId ? false : true}
                                        >
                                            Pagar
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Card>
            </>
        )
    }

    return (
        <div className="content">
            {
                officeNotFound ? <h1>La oficina que quiere reservar no existe </h1> : renderBookingForm()
            }
        </div>
    );
}
