import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Alert, Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Container, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Loading } from '../../../components/Common/Loading/Loading';
import { RegisterInfo } from '../../../components/Register/RegisterInfo';
import { customizedErrorAuth } from '../../../infra/errorsAuth';
import { hideNotificationAction } from '../../../stores/actions/notifications/writeNotificationActions';

function Register(props) {
  const { loading, notification } = props;

  const history = useHistory();
  const dispatch = useDispatch();
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
    if (!values.type) {
      errors.type = '* Requerido.';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      type: '',
    },
    validate,
    onSubmit: (values) => {
      props.onRegister(values)
    },
  });

  React.useEffect(() => {
    if (props.register !== null) {
      history.push('/auth/confirmation-account')
    }
  }, [props.register]);

  React.useEffect(() => {
    if (notification.show) {
      setTimeout(() => {
        dispatch(hideNotificationAction());
      }, 2500);
    }
  }, [notification]);

  return (
    <div className="register-page">
      <Container>
        {loading ?
          <Row
            style={{ textAlign: 'center' }}
          >
            <Col className="ml-auto mr-auto" lg="4" md="6">
              <Loading />
            </Col>
          </Row>
          :
          <Row>
            <Col className="ml-auto" lg="5" md="5">
              <RegisterInfo />
            </Col>
            <Col className="mr-auto" lg="4" md="6">
              <Form className="form" onSubmit={formik.handleSubmit}>
                <Card className="card-signup text-center">
                  <CardHeader>
                    {
                      <Alert
                        isOpen={notification.show && notification.isError}
                        color="danger"
                        fade={false}
                      >
                        {customizedErrorAuth(notification.message)}
                      </Alert>
                    }
                    <CardTitle tag="h4">Creemos tu cuenta</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <FormGroup
                      className={
                        formik.errors.email
                          ? 'has-danger'
                          : 'has-success'
                      }>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-user" />
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
                      {formik.errors.email &&
                        formik.touched.email ? (
                        <div className="error">{formik.errors.email}</div>
                      ) : null}
                    </FormGroup>
                    <FormGroup
                      className={
                        formik.errors.password && formik.touched.password
                          ? 'has-danger'
                          : 'has-success'
                      }>
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
                        />
                      </InputGroup>
                      {
                        formik.errors.password && formik.touched.password ? (
                          <div className="error">{formik.errors.password}</div>
                        ) : null
                      }
                    </FormGroup >
                    <FormGroup>
                      <Input
                        type="select"
                        name="type"
                        id="select"
                        onChange={formik.handleChange}
                        value={formik.values.type}>
                        <option value={null}>Tipo de cuenta</option>
                        <option value="RENTER">Usuario Cliente</option>
                        <option value="OFFICE_HOLDER">Propietario de oficinas</option>
                      </Input>
                      {(formik.errors.type &&
                        formik.touched.type &&
                        formik.validateOnChange.type) ? (
                        <div className="error">{formik.errors.type}</div>
                      ) : null}
                    </FormGroup>
                  </CardBody >
                  <CardFooter>
                    <Button
                      className="btn-round"
                      color="info"
                      type="submit"
                    >
                      Crear cuenta
                    </Button>
                  </CardFooter>
                </Card >
              </Form >
              {/* <RegisterForm onRegister={onRegister} loading={loading} error={error} /> */}
            </Col>
          </Row>
        }
      </Container>
      <div
        className={loading ? 'background-loading' : 'full-page-background'}
        style={{
          backgroundImage: `url(${require('../../../assets/img/bg/Office.jpg').default
            })`,
        }}
      />
    </div>
  );
}

export default Register;
