import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import {
    Badge, Button, Card, CardBody, Col, Container, Label, Row, UncontrolledTooltip
} from 'reactstrap';
import { readFromLocalStorage } from '../../infra/api/localStorage';

export const BookingComponent = (props) => {
    const {
        officeName,
        id,
        status,
        attendeesQuantity,
        scheduleDate,
        startTime,
        endTime,
        totalAmount,
        transactionAmount,
        providerFee,
        currency,
        paymentMethodId,
        paymentTypeId,
        officeBranchId,
        disableBookingLink,
        loadOffices,
        loadOffice,
        officeId
    } = props;
    const userRole = readFromLocalStorage('USER_TYPE');
    React.useEffect(() => {
        loadOffices(officeBranchId)
        if (officeId) {
            loadOffice(officeId)
        }
    }, [])
    const getBookingStatus = () => {
        if (status === "SCHEDULED") {
            return <Badge color="success" style={{ fontSize: 18 }}>Programada</Badge>
        } else if (status === "PENDING") {
            return <Badge color="warning" style={{ fontSize: 18 }}>Pendiente</Badge>
        } else if (status === "CANCELLED") {
            return <Badge color="danger" style={{ fontSize: 18 }}>Cancelada</Badge>
        }
    }

    return (
        <div className="content">
            <Container>
                <Card style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <Row style={{ display: "flex", paddingTop: "2%", alignContent: "center" }}>
                        <Col>
                            <h5 style={{ marginBottom: 0 }}>
                                Código de reserva: {
                                    disableBookingLink ? <Label>{id}</Label>
                                        : <><Link color="primary" to={`/admin/booking?id=${id}`}>
                                            {id}
                                        </Link> - {getBookingStatus()}</>
                                }
                            </h5>
                        </Col>
                        <Col xs="2" style={{ display: 'flex' }}>
                            <Col>
                                <Link to={`/admin/office-branch?id=${officeBranchId}`}>
                                    <UncontrolledTooltip placement="right" target={`officeBranch-${officeBranchId}`}>
                                        Ver sucursal
                                    </UncontrolledTooltip>
                                    <Button id={`officeBranch-${officeBranchId}`} margin="0" size="md" className="btn btn-round btn-icon btn-primary m-0" style={{ fontSize: 18 }}>
                                        <i className="fa fa-building-o" aria-hidden="true"></i>
                                    </Button>
                                </Link>
                            </Col>
                            {
                                status === "SCHEDULED" && (
                                    <Col>
                                        <Link to={userRole === 'RENTER' ? `/admin/officebranch/${officeBranchId}/office/${officeId}/new-review` : `/admin/office/${officeId}/new-review`}>
                                            <UncontrolledTooltip placement="right" target={`review-${officeBranchId}`}>
                                                Crear reseña
                                            </UncontrolledTooltip>
                                            <Button id={`review-${officeBranchId}`} margin="0" size="md" className="btn btn-round btn-icon btn-primary m-0" style={{ fontSize: 18 }}>
                                                <i className="nc-icon nc-paper" aria-hidden="true"></i>
                                            </Button>
                                        </Link>
                                    </Col>
                                )
                            }
                        </Col>
                    </Row>
                    <CardBody style={{ paddingTop: 0 }}>
                        <Col xs="12" md="12" lg="12" xg="12" style={{ paddingLeft: 20, paddingRight: 20, marginBottom: 20 }}>
                            <Row>
                                <Col>
                                    <div className='text'>
                                        <Label className="form-label" style={{ fontSize: 18 }}>
                                            Nombre oficina: <small style={{ fontSize: 18 }}>{`${officeName}`}</small>
                                        </Label>
                                    </div>
                                </Col>
                                <Col>
                                    <div className='text'>
                                        <Label className="form-label" style={{ fontSize: 18 }}>
                                            Cantidad de personas: <small style={{ fontSize: 18 }}>{`${attendeesQuantity}`}</small>
                                        </Label>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className='text'>
                                        <Label className="form-label" style={{ fontSize: 18 }}>
                                            Fecha: <small style={{ fontSize: 18 }}>{`${scheduleDate}`}</small>
                                        </Label>
                                    </div>
                                </Col>
                                <Col>
                                    <div className='text'>
                                        <Label className="form-label" style={{ fontSize: 18 }}>
                                            Hora desde: <small style={{ fontSize: 18 }}>{`${startTime} hs`}</small>
                                        </Label>
                                    </div>
                                </Col>
                                <Col>
                                    <div className='text'>
                                        <Label className="form-label" style={{ fontSize: 18 }}>
                                            Hora hasta: <small style={{ fontSize: 18 }}>{`${endTime} hs`}</small>
                                        </Label>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className='text'>
                                        <Label className="form-label" style={{ fontSize: 18 }}>
                                            Tipo de pago: <small style={{ fontSize: 18 }}>{`${paymentTypeId}`}</small>
                                        </Label>
                                    </div>
                                </Col>
                                <Col>
                                    <div className='text'>
                                        <Label className="form-label" style={{ fontSize: 18 }}>
                                            Moneda: <small style={{ fontSize: 18 }}>{`${currency}`}</small>
                                        </Label>
                                    </div>
                                </Col>
                                <Col>
                                    <div className='text'>
                                        <Label className="form-label" style={{ fontSize: 18 }}>
                                            Tarjeta: <small style={{ fontSize: 18 }}>{`${paymentMethodId}`}</small>
                                        </Label>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <hr />
                        <Col>
                            <Row>
                                <Col>
                                    <div className='text'>
                                        <Label className="form-label" style={{ fontSize: 18 }}>
                                            Monto total: <small style={{ fontSize: 18 }}>{`$ ${totalAmount}`}</small>
                                        </Label>
                                    </div>
                                </Col>
                                <Col>
                                    <div className='text'>
                                        <Label className="form-label" style={{ fontSize: 18 }}>
                                            Total abonado: <small style={{ fontSize: 18 }}>{`$ ${transactionAmount}`}</small>
                                        </Label>
                                    </div>
                                </Col>
                                <Col>
                                    <div className='text'>
                                        <Label className="form-label" style={{ fontSize: 18 }}>
                                            Tarifa: <small style={{ fontSize: 18 }}>{`$ ${providerFee}`}</small>
                                        </Label>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </CardBody>
                </Card>
            </Container>
        </div>
    )
}

BookingComponent.propTypes = {
    id: PropTypes.string,
    officeName: PropTypes.string,
    status: PropTypes.string,
    attendeesQuantity: PropTypes.number,
    scheduleDate: PropTypes.string,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    transactionAmount: PropTypes.number,
    officeBranchId: PropTypes.string,
    providerFee: PropTypes.any,
    currency: PropTypes.string,
    paymentMethodId: PropTypes.string,
    paymentTypeId: PropTypes.string,
    disableBookingLink: PropTypes.bool,
}
