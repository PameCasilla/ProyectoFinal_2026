import React from 'react'
import { Col, Row } from 'reactstrap'
import { ServEquipComponent } from '../../../components/ServicesEquip/ServEquipComponent'

export const ServicesEquipment = (props) => {

    const services = [
        {
            value: "",
            label: "Seleccione una opción",
        },
        { value: "FOOD", label: "Comida" },
        { value: "CONFORT", label: "Confort" },
        { value: "CONNECTIVITY", label: "Conectividad" },
    ];

    const equipaments = [
        {
            value: "",
            label: "Seleccione una opción",
        },
        { value: 'TECHNOLOGY', label: 'Tecnología' },
        { value: 'CONFORT', label: 'Confort' }
    ];

    return (
        <div class='content'>
            <Row className='titleTop'>
                <Col xs="12" md="12" lg="12" xg="12">
                    <h1>
                        Crear <small>servicios y equipamientos</small>
                    </h1>
                    <hr />
                </Col>
            </Row>
            <ServEquipComponent
                title='Servicios'
                typeName='Servicio'
                options={services}
                create={props.onCreateService}
                branch={props.branch}
                notification={props.notification}
                hideNotification={props.hideNotification}
            />
            <ServEquipComponent
                title='Equipamiento'
                typeName='Equipamiento'
                options={equipaments}
                create={props.onCreateEquipment}
                branch={props.branch}
                notification={props.notification}
                hideNotification={props.hideNotification}
            />
        </div>
    )
}
