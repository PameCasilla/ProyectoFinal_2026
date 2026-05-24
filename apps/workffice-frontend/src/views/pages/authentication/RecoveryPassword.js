
import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Alert,
  Button,
  Card, CardBody,
  CardFooter, CardHeader, CardTitle, Col, Container, Form,
  FormGroup,
  Input
} from 'reactstrap';
import { Loading } from '../../../components/Common/Loading/Loading';
import { customizedErrorAuth } from '../../../infra/errorsAuth';
import { hideNotificationAction } from '../../../stores/actions/notifications/writeNotificationActions';

export const RecoveryPassword = (props) => {
  const dispatch = useDispatch()
  const { loading, notification } = props;
  const validate = values => {
    const errors = {};
    if (!values.userEmail) {
      errors.userEmail = 'Requerido.';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.userEmail)
    ) {
      errors.userEmail = 'Dirección de email inválida.';
    }
    return errors;
  }
  const formik = useFormik({
    initialValues: {
      userEmail: ''
    },
    validate,
    onSubmit: async values => {
      props.onResetPassword(values)
    }
  });

  React.useEffect(() => {
    dispatch(hideNotificationAction());
  }, [])

  React.useEffect(() => {
    document.body.classList.toggle('lock-page');
    return function cleanup() {
      document.body.classList.toggle('lock-page');
    };
  });
  return (
    <div className="lock-page">
      <Container>
        <Col className="ml-auto mr-auto" lg="4" md="6">
          {
            loading ? <Loading /> : (
              <Form className='form' onSubmit={formik.handleSubmit}>
                <Card className="card-lock text-center">
                  <CardHeader>
                    <img
                      alt="..."
                      className="recovery-password-user"
                      src={require('../../../assets/img/Recurso 5.png').default}
                    />
                  </CardHeader>
                  <CardBody>
                      <Alert
                        isOpen={notification.show && notification.isError}
                        color="danger"
                      >
                        {customizedErrorAuth(notification.errorCode)}
                      </Alert>
                      <Alert
                        isOpen={notification.show && notification.isSuccess}
                        color="success"
                      >
                        Revisa tu correo
                      </Alert>
                    <CardTitle tag="h5">Por favor ingresa tu correo</CardTitle>
                    <FormGroup
                      className={
                        formik.errors.userEmail && formik.touched.userEmail
                          ? 'has-danger'
                          : 'has-success'
                      }>
                      <Input
                        name='userEmail'
                        placeholder="workffice@robot-mail.com"
                        type="email"
                        autoComplete="off"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.userEmail}
                      />
                      {formik.errors.userEmail &&
                        formik.touched.userEmail &&
                        formik.validateOnChange.userEmail ? (
                        <div className="error">{formik.errors.userEmail}</div>
                      ) : null}
                    </FormGroup>
                  </CardBody>
                  <CardFooter>
                    <Button
                      className="btn-round mb-3"
                      color="warning"
                      type="submit"
                      disabled={formik.isSubmitting}>
                      Recuperar
                    </Button>
                  </CardFooter>
                </Card>
              </Form>
            )
          }

        </Col>
      </Container>
      <div
        className={props.loading ? 'background-loading' : 'full-page-background'}
        style={{
          backgroundImage: `url(${require('../../../assets/img/bg/luke-chesser.jpg').default
            })`,
        }}
      />
    </div>
  );
}
