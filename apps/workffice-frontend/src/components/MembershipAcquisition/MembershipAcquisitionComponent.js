import { Badge, Card, CardBody, Col, Container, Label, Row } from "reactstrap"

export const MembershipAcquisitionComponent = ({
    id,
    status,
    month,
    buyerEmail,
    price = 0,
    accessDays,
    paymentInformation,
}) => {
    const {
        paymentTypeId = "No definido",
        currency = "No definido",
        paymentMethodId = "No definido",
        providerFee = 0,
        transactionAmount,
    } = paymentInformation
    const getStatus = () => {
        if (status === "BOUGHT") {
            return <Badge color="success" style={{ fontSize: 18 }}>Comprada</Badge>
        } else if (status === "PENDING") {
            return <Badge color="warning" style={{ fontSize: 18 }}>Pendiente</Badge>
        }
    }

    const getMonth = () => {
        switch (month) {
            case "JANUARY": return "ENERO"
            case "FEBRUARY": return "FEBRERO"
            case "MARCH": return "MARZO"
            case "APRIL": return "ABRIL"
            case "MAY": return "MAYO"
            case "JUNE": return "JUNIO"
            case "JULY": return "JULIO"
            case "AUGUST": return "AGOSTO"
            case "SEPTEMBER": return "SEPTIEMBRE"
            case "OCTOBER": return "OCTUBRE"
            case "NOVEMBER": return "NOVIEMBRE"
            case "DECEMBER": return "DICIEMBRE"
        }
    }

    const getAccessDay = (accessDay) => {
        switch (accessDay) {
            case "MONDAY": return "LUNES"
            case "TUESDAY": return "MARTES"
            case "WEDNESDAY": return "MIERCOLES"
            case "THURSDAY": return "JUEVES"
            case "FRIDAY": return "VIERNES"
            case "SATURDAY": return "SABADO"
            case "SUNDAY": return "DOMINGO"
        }
    }

    return <div className="content">
        <Container>
            <Card style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Row style={{ display: "flex", paddingTop: "2%", alignContent: "center" }}>
                    <Col>
                        <h5 style={{ marginBottom: 0 }}>
                            Código de compra: <Label>{id}</Label> - {getStatus()}
                        </h5>
                    </Col>
                </Row>
                <CardBody style={{ paddingTop: 0 }}>
                    <Col xs="12" md="12" lg="12" xg="12" style={{ paddingLeft: 20, paddingRight: 20, marginBottom: 20 }}>
                        <Row>
                            <Col>
                                <div className='text'>
                                    <Label className="form-label" style={{ fontSize: 18 }}>
                                        Mes de acceso: {getMonth()}
                                    </Label>
                                </div>
                            </Col>
                            <Col>
                                <div className='text'>
                                    <Label className="form-label" style={{ fontSize: 18 }}>
                                        Comprador: {buyerEmail}
                                    </Label>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className='text'>
                                    <Label className="form-label" style={{ fontSize: 18 }}>
                                        Días de acceso: {accessDays.map(accessDay => <Badge color="success">{getAccessDay(accessDay)}</Badge>)}
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
                                        Monto total: <small style={{ fontSize: 18 }}>{`$ ${price}`}</small>
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
}