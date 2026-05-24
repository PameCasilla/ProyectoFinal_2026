import { useFormik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router';
import Select from 'react-select';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Row
} from 'reactstrap';
import { getErrorMessage } from '../../utils/rolesTranslation';
import { Notification } from '../Common/Notification/Notification';


export const NewRole = (props) => {
    const { notification, hideNotification } = props;
    const history = useHistory()
    React.useEffect(() => {
        if (notification.show) {
            if (notification.isSuccess)
                setTimeout(() => {
                    history.push("/admin/roles")
                }, 2500)
            setTimeout(() => {
                hideNotification()
            }, 2000)
        }
    })
    const validate = values => {
        const errors = {};
        if (!values.roleName) {
            errors.roleName = 'Requerido.';
        }
        const {
            officeAccess,
            collaboratorAccess,
            roleAccess,
            membershipAccess,
            bookingAccess,
            reportAccess
        } = values
        const permissions = [
            officeAccess.value,
            collaboratorAccess.value,
            roleAccess.value,
            membershipAccess.value,
            bookingAccess.value,
            reportAccess.value,
        ].filter(permission => permission !== null && permission !== undefined && permission !== '')
        if (permissions.length == 0)
            errors.access = 'Al menos un permiso es requerido'
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            roleName: "",
            officeAccess: "",
            collaboratorAccess: "",
            roleAccess: "",
            membershipAccess: "",
            bookingAccess: "",
            reportAccess: "",
        },
        validate,
        onSubmit: async ({
            roleName,
            officeAccess,
            collaboratorAccess,
            roleAccess,
            membershipAccess,
            bookingAccess,
            reportAccess
        }) => {
            const permissions = [
                { resource: "OFFICE", access: officeAccess.value },
                { resource: "COLLABORATOR", access: collaboratorAccess.value },
                { resource: "ROLE", access: roleAccess.value },
                { resource: "MEMBERSHIP", access: membershipAccess.value },
                { resource: "BOOKING", access: bookingAccess.value },
                { resource: "REPORT", access: reportAccess.value },
            ].filter(permission => permission.access !== null && permission.access !== undefined && permission.access !== '')
            props.createRole({
                name: roleName,
                permissions: permissions,
            })
        },
    });

    const accessOptions = [
        { value: "", label: "Seleccione una opción", isDisabled: true },
        { value: "READ", label: "Lectura" },
        { value: "WRITE", label: "Lectura y escritura" },
    ]
    const writeOnly = [
        { value: "", label: "Seleccione una opción", isDisabled: true },
        { value: "WRITE", label: "Lectura y escritura" },
    ]

    const readOnly = [
        { value: "", label: "Seleccione una opción", isDisabled: true },
        { value: "READ", label: "Lectura" },
    ]

    return (
        <div className="content">
            <Row style={{ display: 'grid', paddingTop: 40 }}>
                <Col xs="12" md="6" lg="12" xg="12">
                    <h1>
                        Nuevo <small color="red">rol</small>
                    </h1>
                    <hr />
                </Col>
            </Row>

            <Row>
                <Form onSubmit={formik.handleSubmit} style={{ width: '80%', marginLeft: '10%', marginRight: '10%' }}>
                    <Card>
                        <CardHeader>
                            <Notification
                                show={notification.show && notification.isError}
                                isError={true}
                                message={getErrorMessage(notification.errorCode)}
                                hideNotification={hideNotification}
                            />
                            <Notification
                                show={notification.show && notification.isSuccess}
                                message="El rol se creo correctamente"
                                hideNotification={hideNotification}
                            />
                        </CardHeader>
                        <CardBody>
                            <div className="form-row">
                                <Col xs="12" md="12" lg="12" xg="12" style={{ paddingLeft: 20, paddingRight: 20 }}>
                                    <Label className="text-danger">{formik.errors.access}</Label>
                                    <FormGroup className={formik.errors.roleName ? 'has-danger' : ''}>
                                        <Label htmlFor="roleName" className="label-form">Nombre</Label>
                                        <Input
                                            type="text"
                                            placeholder="Ingrese el nombre del Rol"
                                            name="roleName"
                                            value={formik.values.roleName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <h4 style={{ marginTop: 20, marginBottom: 0 }}>
                                            Seleccione los recursos y permisos
                                        </h4>
                                    </FormGroup>
                                    <Row>
                                        <Col xs="12" md="6" lg="6" xg="6">
                                            <FormGroup>
                                                <Label htmlFor="officeAccess" className="label-form">Oficina</Label>
                                                <Select
                                                    className="react-select primary"
                                                    classNamePrefix="react-select"
                                                    name="officeAccess"
                                                    id="officeAccess"
                                                    onChange={value => formik.setFieldValue("officeAccess", value)}
                                                    onBlur={formik.handleChange}
                                                    options={writeOnly}
                                                    placeholder="Seleccione un permiso"
                                                    styles={{ width: '80%' }}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col xs="12" md="6" lg="6" xg="6">
                                            <FormGroup>
                                                <Label htmlFor="collaboratorAccess" className="label-form">Colaborador</Label>
                                                <Select
                                                    className="react-select primary"
                                                    classNamePrefix="react-select"
                                                    name="collaboratorAccess"
                                                    id="collaboratorAccess"
                                                    onChange={value => formik.setFieldValue("collaboratorAccess", value)}
                                                    onBlur={formik.handleBlur}
                                                    options={accessOptions}
                                                    placeholder="Seleccione un permiso"
                                                    styles={{ width: '80%' }}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12" md="6" lg="6" xg="6">
                                            <FormGroup>
                                                <Label htmlFor="roleAccess" className="label-form">Rol</Label>
                                                <Select
                                                    className="react-select primary"
                                                    classNamePrefix="react-select"
                                                    name="roleAccess"
                                                    id="roleAccess"
                                                    onChange={value => formik.setFieldValue("roleAccess", value)}
                                                    options={accessOptions}
                                                    placeholder="Seleccione un permiso"
                                                    styles={{ width: '80%' }}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col xs="12" md="6" lg="6" xg="6">
                                            <FormGroup>
                                                <Label htmlFor="bookingAccess" className="label-form">Reservas</Label>
                                                <Select
                                                    className="react-select primary"
                                                    classNamePrefix="react-select"
                                                    name="bookingAccess"
                                                    id="bookingAccess"
                                                    onChange={value => formik.setFieldValue("bookingAccess", value)}
                                                    onBlur={formik.handleBlur}
                                                    options={readOnly}
                                                    placeholder="Seleccione un permiso"
                                                    styles={{ width: '80%' }}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12" md="6" lg="6" xg="6">
                                            <FormGroup>
                                                <Label htmlFor="reportAccess" className="label-form">Reportes</Label>
                                                <Select
                                                    className="react-select primary"
                                                    classNamePrefix="react-select"
                                                    name="reportAccess"
                                                    id="reportAccess"
                                                    onChange={value => formik.setFieldValue("reportAccess", value)}
                                                    onBlur={formik.handleBlur}
                                                    options={readOnly}
                                                    placeholder="Seleccione un permiso"
                                                    styles={{ width: '80%' }}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col xs="12" md="6" lg="6" xg="6">
                                            <FormGroup>
                                                <Label htmlFor="membershipAccess" className="label-form">Membresía</Label>
                                                <Select
                                                    className="react-select primary"
                                                    classNamePrefix="react-select"
                                                    name="membershipAccess"
                                                    id="membershipAccess"
                                                    onChange={value => formik.setFieldValue("membershipAccess", value)}
                                                    onBlur={formik.handleBlur}
                                                    options={accessOptions}
                                                    placeholder="Seleccione un permiso"
                                                    styles={{ width: '80%' }}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Col>
                            </div>
                            <hr />
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div className="col-auto">
                                    <Button
                                        type="submit"
                                        className="btn-round btn-primary mb-3"
                                        color="primary"
                                        style={{ minWidth: 107 }}
                                    >
                                        Crear
                                    </Button>
                                </div>
                                <div className="col-auto">
                                    <Button
                                        type="reset"
                                        className="btn-round btn-primary mb-3"
                                        style={{ backgroundColor: '#EB5D60', minWidth: 107 }}
                                    >
                                        Cancelar
                                    </Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Form>
            </Row>
        </div>
    );
}
