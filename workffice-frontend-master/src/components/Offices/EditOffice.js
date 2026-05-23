import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Col, Row } from 'reactstrap';
import { getErrorMessage } from '../../utils/officeTranslations';
import { Loading } from '../Common/Loading/Loading';
import { Notification } from '../Common/Notification/Notification';
import { OfficeForm } from './OfficeForm';

export const EditOffice = ({
    office,
    loadOffice,
    loading,
    inactivities,
    loadInactivities,
    update,
    notification,
    hideNotification,
    deleteOffice,
    equip,
    serv
}) => {
    const query = new URLSearchParams(useLocation().search)
    useEffect(() => {
        loadOffice(query.get("id"))
    }, [])
    useEffect(() => {
        loadInactivities(query.get("id"))
    }, [])
    useEffect(() => {
        if (notification.show)
            setTimeout(() => {
                hideNotification()
            }, 2500)
    }, [notification.show])

    return (
        <div className="content">
            <Row style={{ display: 'grid', paddingTop: 40 }}>
                <Col xs="12" md="6" lg="12" xg="12">
                    <h1>
                        Editar oficina <small color="red">{office ? office.name : ""}</small>
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
                message="La oficina se actualizo correctamente"
                show={notification.show && notification.isSuccess}
                hideNotification={hideNotification}
            />
            <Row style={{ justifyContent: 'center' }}>
                {
                    loading ? <Row><Col md="12"><Loading /></Col></Row> :
                        <OfficeForm
                            office={office}
                            equip={equip}
                            serv={serv}
                            deleteOffice={deleteOffice}
                            onSubmit={officeFormData => update(office.id, officeFormData)}
                            inactivities={inactivities}
                            confirmButtonName="Guardar"
                        />
                }
            </Row>
        </div>
    )
}
