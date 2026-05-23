import React from 'react';
import { useHistory } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { getErrorMessage } from '../../utils/officeTranslations';
import { Notification } from '../Common/Notification/Notification';
import { OfficeForm } from './OfficeForm';
import './styles/OfficeStyle.css';

export const NewOffice = ({ hideNotification, notification, create,branch, equip, serv }) => {
    const history = useHistory();

    React.useEffect(() => {
        if (notification.show) {
            if (notification.isSuccess)
                setTimeout(() => {
                    history.push('/admin/offices');
                }, 2500);
            setTimeout(() => {
                hideNotification()
            }, 2000);
        }
    }, [notification.show]);

    const createOffice = (officeFormData) => {
        create(branch.id, officeFormData)
    }

    return (
        <div className="content">
            <Row style={{ display: 'grid', paddingTop: 40 }}>
                <Col xs="12" md="6" lg="12" xg="12">
                    <h1>
                        Nueva <small color="red">oficina</small>
                    </h1>
                    <hr />
                </Col>
            </Row>
            <Notification
                isError={true}
                message={getErrorMessage(notification.errorCode)}
                show={notification.show && notification.isError}
                hideNotification={hideNotification}
            />
            <Notification
                message="La oficina se creo correctamente"
                show={notification.show && notification.isSuccess}
                hideNotification={hideNotification}
            />
            <Row style={{ justifyContent: 'center' }}>
                <OfficeForm
                    onSubmit={createOffice}
                    equip={equip}
                    serv={serv}
                    confirmButtonName="Crear"
                />
            </Row>
        </div>
    );
}
