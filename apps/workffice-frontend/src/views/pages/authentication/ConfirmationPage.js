
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import { ConfirmationAccountForm } from '../../../components/ConfirmationAccount/ConfirmationAccountForm';
import { confirmation } from '../../../stores/actions/auth/confirmationAccountActions';
import { hideNotificationAction } from '../../../stores/actions/notifications/writeNotificationActions';


export const ConfirmationPage = (props) => {
    let token = '';
    const dispatch = useDispatch()
    const history = useHistory();
    const query = new URLSearchParams(useLocation().search);
    token = query.get("token");
    React.useEffect(() => {
        dispatch(hideNotificationAction());
    }, [props.error]);

    React.useEffect(() => {
        dispatch(confirmation(token));
        history.push('/auth/login');
    }, [token]);

    return (
        <div className="login-page">
            <Container>
                <Row
                    style={{ textAlign: 'center' }}
                >
                    <Col className="ml-auto mr-auto" lg="6" md="6">
                        <ConfirmationAccountForm />
                    </Col>
                </Row>
            </Container>
            <div
                className={props.loading ? 'background-loading' : 'full-page-background'}
                style={{
                    backgroundImage: `url(${require('../../../assets/img/bg/ana-bernardo.jpg').default
                        })`,
                }}
            />
        </div>
    )
}
