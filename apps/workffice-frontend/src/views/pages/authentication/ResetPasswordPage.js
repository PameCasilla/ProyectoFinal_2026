import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Alert, Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { customizedErrorAuth } from '../../../infra/errorsAuth';
import { hideNotificationAction } from '../../../stores/actions/notifications/writeNotificationActions';


export const ResetPasswordPage = props => {
    const { notification } = props;
    const dispatch = useDispatch()
    let token = null;
    const query = new URLSearchParams(useLocation().search);
    token = query.get("token");

    const validate = values => {
        const errors = {};
        if (!values.password) {
            errors.password = '* Requerido.';
        } else if (values.password.length < 8 && values.password.length > 10) {
            errors.password = '* La contraseña debe tener 8 caracteres o más'
        } else if (! /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/i.test(values.password)) {
            errors.password = '* La contraseña debe contener almenos un caracter, un número, una mayúscula y menos de 16 caracteres ';
        }
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            password: ''
        },
        validate,
        onSubmit: async values => {
            props.onResetPassword(token, values)
        }
    });
    React.useEffect(() => {
        if (notification.show) {
            setTimeout(() => {
                dispatch(hideNotificationAction());
            }, 2500);
        }
    }, [notification]);
    React.useEffect(() => {
        document.body.classList.toggle('login-page');
        return function cleanup() {
            document.body.classList.toggle('login-page');
        };
    });


    return (
        <div className='login-page'>
            <Container>
                <Row style={{ textAlign: 'center' }}>
                    <Col className="mr-auto ml-auto" lg="4" md="6">
                        <Form className="form" onSubmit={formik.handleSubmit}>
                            <Card className="card-login">
                                <CardHeader>
                                    {
                                        notification.show && notification.isError ?
                                            <Alert
                                                isOpen={notification.show}
                                                color="danger"
                                            >
                                                {customizedErrorAuth(notification.errorCode)}
                                            </Alert>
                                            : <Alert
                                                isOpen={notification.show && notification.isSuccess}
                                                color="success"
                                            >
                                                Su contraseña fue reestablecida correctamente
                                            </Alert>}
                                    <h3>Por favor ingrese su contraseña</h3>
                                </CardHeader>
                                <CardBody>
                                    <FormGroup className={formik.errors.password ? 'has-danger' : ''}>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fa fa-key" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                name="password"
                                                placeholder="Contraseña..."
                                                type="password"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.password}
                                                autoComplete="off"
                                            />
                                        </InputGroup>
                                        {formik.errors.password && formik.touched.password ? (
                                            <div className="error">{formik.errors.password}</div>
                                        ) : null}
                                    </FormGroup>
                                    <Button
                                        block
                                        className="btn-round"
                                        color="success"
                                        type="submit"
                                    >
                                        Restablecer
                                    </Button>
                                </CardBody>
                            </Card>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <div
                className={'full-page-background'}
                style={{
                    backgroundImage: `url(${require('../../../assets/img/bg/ana-bernardo.jpg').default
                        })`,
                }}
            />
        </div>
    )
}
