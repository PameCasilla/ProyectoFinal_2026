import React from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Alert,
  Button,
  Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, InputGroup, InputGroupAddon,
  InputGroupText, Row
} from 'reactstrap';
import { Loading } from '../../../components/Common/Loading/Loading';
import { customizedErrorAuth } from '../../../infra/errorsAuth';
import { hideNotificationAction } from '../../../stores/actions/notifications/writeNotificationActions';
import { setIsLoading } from '../../../stores/actions';

const Login = props => {
  const { loading, notification } = props
  const userMe = useSelector(state => state.userMe);
  const history = useHistory();
  const dispatch = useDispatch()
  const validate = values => {
    const errors = {};
    if (!values.password) {
      errors.password = 'Requerido.';
    } else if (! /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i.test(values.password)) {
      errors.password = 'La contraseña debe tener 8 caracteres o más, y \n almenos un caracter, un número y una mayuscula';
    } else if (values.password.trim().length === 0) {
      errors.password = 'La contraseña no puede tener solos espacios'
    }
    if (!values.email) {
      errors.email = 'Requerido.';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Dirección de email inválida.';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: async (credentials) => {
      await props.onLogin(credentials);
    }
  });
  React.useEffect(() => {
    if(userMe !== null ){
      userMe.userType === 'RENTER' 
      ? history.push("/admin/user-profile")
      : history.push("/office-branch/select");
    }
  }, [userMe]);

  React.useEffect(() => {
    if (notification.show) {
      setTimeout(() => {
        dispatch(hideNotificationAction())
      }, 2500);
    }
  }, [notification]);

  React.useEffect(() => {
    document.body.classList.toggle('login-page');
    return function cleanup() {
      document.body.classList.toggle('login-page');
    };
  });

  React.useEffect(()=>{
    if(loading){
      dispatch(setIsLoading(false))
    }
  },[loading])

  return (
    <div className="login-page">
      <Container>
        <Row
          style={{ textAlign: 'center' }}
        >
          <Col className="ml-auto mr-auto" lg="4" md="6">
            {/* LOGIN FORM */}
            {
              loading ? <Loading /> : (
                <Form onSubmit={formik.handleSubmit}>
                  <Card className="card-login">
                    <CardHeader>
                      {
                        <Alert
                          isOpen={notification.show && notification.isError}
                          color="danger"
                          fade={false}
                        >
                          {customizedErrorAuth(notification.errorCode)}
                        </Alert>
                      }
                      <h3 className="header text-center">Login</h3>
                    </CardHeader>
                    <CardBody>
                      <FormGroup
                        className={formik.errors.email && formik.touched.email ? 'has-danger' : ''}>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fa fa-envelope" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            name="email"
                            placeholder="Correo.."
                            type="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                          />

                        </InputGroup>
                        {formik.errors.email && formik.touched.email ? (
                          <div className="error">{formik.errors.email}</div>
                        ) : null}
                      </FormGroup>
                      <FormGroup
                        className={formik.errors.password && formik.touched.password ? 'has-danger' : ''}>
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
                        Iniciar Sesión
                      </Button>
                    </CardBody>
                  </Card>
                </Form>
              )

            }

          </Col>
        </Row>
      </Container>
      <div
        className={props.loading ? 'background-loading' : 'full-page-background'}
        style={{
          backgroundImage: `url(${require('../../../assets/img/bg/office1.jpg').default
            })`,
        }}
      />
    </div >
  );
}

export default Login;
