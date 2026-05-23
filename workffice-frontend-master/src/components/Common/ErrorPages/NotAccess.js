import React from 'react'
import { Card, CardBody, CardFooter, Col, Row } from 'reactstrap'
import logo from '../../../assets/img/logo1.svg'
export const NotAccess = ({ message }) => {
    return (
        <div className="content">
            <Row style={{ paddingTop: 60 }}>
                <Col md="2"></Col>
                <Col md="8">
                    <Card className="card-user">
                        <CardBody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h3 className="text-center" style={{ color: '#eb5d60', fontWeight: 'bold' }}>Error de permisos</h3>
                            <h6 className="title text-center">No tienes acceso a este recurso</h6>
                            {
                                message ? <p className="text-center">{message}</p> : <>
                                    <p className="text-center">Para poder acceder a este recurso necesitas ser dueño de una oficina.</p>
                                    <p className="text-center"> Puedes crear tu perfil como dueño de oficina en el menú de registro </p>
                                </>
                            }
                        </CardBody>
                        <CardFooter>
                            <p className="text-center"><img className="text-center" width="60%" src={logo}></img></p>
                        </CardFooter>
                    </Card>
                </Col>
                <Col md="2"></Col>
            </Row>
        </div>
    )
}
