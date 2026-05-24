import { useFormik } from 'formik';
import { includes } from 'lodash-es';
import React from 'react';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { ROLE_RESOURCE } from '../../stores/actions/errors/permissionActions';
import { getErrorMessage } from '../../utils/collaboratorTranslations';
import { ROLE_FORBIDDEN_MESSAGE } from '../../utils/rolesTranslation';
import Forbidden from "../Common/Forbidden/Forbidden";
import { Notification } from '../Common/Notification/Notification';

export const NewCollaborator = ({ permission, notification, hideNotification, officeBranchRoles, loadOfficeBranchRoles, createCollaborator }) => {
  React.useEffect(() => {
    loadOfficeBranchRoles()
  }, [])
  const validate = values => {
    const errors = {};
    if (!values.collaboratorName) {
      errors.collaboratorName = "Requerido"
    }
    if (!values.collaboratorEmail) {
      errors.collaboratorEmail = 'Requerido'
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.collaboratorEmail)
    ) {
      errors.collaboratorEmail = 'Dirección de email inválida.'
    }
    if (values.roles.length == 0)
      errors.roles = 'Debe elegir al menos un rol'
    return errors;
  };
  React.useEffect(() => {
    if (notification.show) {
      if (notification.isSuccess)
        setTimeout(() => {
          history.push("/admin/collaborators")
        }, 2500)
      setTimeout(() => {
        hideNotification()
      }, 2000)
    }
  })
  const history = useHistory()
  const formik = useFormik({
    initialValues: {
      collaboratorName: "",
      collaboratorEmail: "",
      roles: []
    },
    validate,
    onSubmit: async ({ collaboratorName, collaboratorEmail, roles }) => {
      await createCollaborator({
        email: collaboratorEmail,
        name: collaboratorName,
        roleIds: roles.map(role => role.value)
      });
    }
  })

  return (

    <div className="content">
      <Row style={{ display: 'grid', paddingTop: 40 }}>
        <Col xs="6" md="6" lg="12" xg="12">
          <h1>
            Nuevo <small color="red">Colaborador</small>
          </h1>
          <hr />
        </Col>
      </Row>

      <Row>
        <Form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
          <Card style={{ width: '100%' }}>
            <CardHeader>
              <Notification
                show={notification.show && notification.isError}
                isError={true}
                message={getErrorMessage(notification.errorCode)}
                hideNotification={hideNotification}
              />
              <Notification
                show={notification.show && notification.isSuccess}
                message={"El colaborador se creo correctamente"}
                hideNotification={hideNotification}
              />

            </CardHeader>
            <CardBody>
              <div className="office-branch-card-title colaborator" style={{ display: 'block', marginTop: 0 }}>
                <div>
                  <FormGroup className={formik.errors.collaboratorName && formik.touched.collaboratorName ? 'has-danger mb-3' : 'mb-3'}>
                    <Label
                      htmlFor="collaboratorName"
                      className="label-form"
                      style={{ fontSize: 20, color: '#081620' }}
                    >
                      Nombre
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="collaboratorName"
                      name='collaboratorName'
                      placeholder="Nombre del colaborador"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.collaboratorName}
                    />
                    {formik.errors.collaboratorName && formik.touched.collaboratorName ? (
                      <div className="error">{formik.errors.collaboratorName}</div>
                    ) : null}
                  </FormGroup>
                  <FormGroup className={formik.errors.collaboratorEmail && formik.touched.collaboratorEmail ? 'has-danger mb-3' : 'mb-3'}>
                    <Label
                      htmlFor="collaboratorEmail"
                      className="label-form"
                      style={{ fontSize: 20, color: '#081620' }}
                    >
                      Email
                    </Label>
                    <Input
                      type="email"
                      className="form-control"
                      id="collaboratorEmail"
                      name='collaboratorEmail'
                      placeholder="nombre@ejemplo.com"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.collaboratorEmail}
                    />
                    {formik.errors.collaboratorEmail && formik.touched.collaboratorEmail ? (
                      <div className="error">{formik.errors.collaboratorEmail}</div>
                    ) : null}
                  </FormGroup>
                  <FormGroup>
                    <Label
                      className="label-form"
                      style={{ fontSize: 20, color: '#081620' }}
                      htmlFor="roles">
                      Roles
                    </Label>
                    <Select
                      className="react-select"
                      classNamePrefix="react-select"
                      id="roles"
                      name="roles"
                      placeholder="Roles"
                      closeMenuOnSelect={false}
                      isMulti={true}
                      value={formik.values.roles}
                      onChange={value => formik.setFieldValue("roles", value)}
                      onBlur={formik.handleBlur}
                      options={officeBranchRoles ? officeBranchRoles.map(role => {
                        return { value: role.id, label: role.name }
                      }) : []}
                    />
                    {formik.errors.roles ? (
                      <Label className="text-danger">{formik.errors.roles}</Label>
                    ) : <div></div>}
                    {permission.isForbidden && includes(permission.resources, ROLE_RESOURCE) ?
                      <Forbidden message={ROLE_FORBIDDEN_MESSAGE} /> : <></>}
                  </FormGroup>
                </div>
              </div>
              <hr />
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="col-auto">
                  <Button type="submit" className="btn-round btn-primary mb-3">Crear</Button>
                </div>
                <div className="col-auto">
                  <Button type="reset" className="btn-round btn-primary mb-3" style={{ backgroundColor: '#EB5D60' }}>Cancelar</Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </Form>
      </Row>
    </div>
  )
};
