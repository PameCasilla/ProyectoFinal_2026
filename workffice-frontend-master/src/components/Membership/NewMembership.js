import { useFormik } from 'formik';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import Select from 'react-select';
import {
    Row,
    Col,
    Card,
    CardBody,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Button,
    Form,
    FormGroup,
    Label,
    CardHeader,
    Container
} from 'reactstrap';
import { Notification } from '../Common/Notification/Notification';
import './styles/MembershipStyle.css';

export const NewMembership = props => {
    const { notification, hideNotification, onCreate, officeBranch, edit, memberships, loadMembership, memb, onUpdate } = props;
    const history = useHistory();
    React.useEffect(() => {
        if (edit) {
            loadMembership(officeBranch.id);
        }
    }, [])
    let membership = null;
    if (edit) {
        var id = useParams().id;
        if (memberships.length > 0) {
            membership = memberships.find(m => m.id === id);
        }
    }
    const validate = values => {
        const errors = {};
        if (!values.name) {
            errors.name = 'Requerido.';
        }

        if (!values.pricePerMonth) {
            errors.pricePerMonth = 'Requerido.';
        }
        if (!values.accessDays) {
            errors.accessDays = 'Requerido.';
        }
        if (!values.description) {
            errors.description = 'Requerido.';
        }
        return errors;
    };

    const daysOfWeek = [
        { value: "MONDAY", label: "Lunes" },
        { value: "TUESDAY", label: "Martes" },
        { value: "WEDNESDAY", label: "Miércoles" },
        { value: "THURSDAY", label: "Jueves" },
        { value: "FRIDAY", label: "Viernes" },
        { value: "SATURDAY", label: "Sábado" },
        { value: "SUNDAY", label: "Domingo" }
    ]

    const formik = useFormik({
        initialValues: {
            name: membership ? membership.name : "",
            pricePerMonth: membership ? membership.pricePerMonth : 0,
            accessDays: membership ? membership.accessDays.map(day => (
                daysOfWeek.find(dow => dow.value === day)
            )) : null,
            description: membership ? membership.description : "",
        },
        validate,
        onSubmit: async (values) => {
            const days = values.accessDays.map(ad => ad.value)
            const newMembership = {
                ...values,
                accessDays: days
            }
            !edit ? onCreate(officeBranch.id, newMembership) : onUpdate(id ? id : membership.id, newMembership);
        },
    });

    React.useEffect(() => {
        if (notification.show) {
            if (notification.isSuccess && memb)
                setTimeout(() => {
                    history.push('/admin/membership');
                }, 2500);
            setTimeout(() => {
                hideNotification()
            }, 1000);
        }
    }, [notification.show]);
    return (
        <div className="content">
            <Row style={{ display: 'grid', paddingTop: 40 }}>
                <Col xs="12" md="6" lg="12" xg="12">
                    <h1>
                        Nueva <small color="red">membresía</small>
                    </h1>
                    <hr />
                </Col>
            </Row>
            <Container>
                <Form onSubmit={formik.handleSubmit} >
                    <Card style={{ paddingLeft: 20, paddingRight: 20 }}>
                        <CardHeader>
                            <Notification
                                show={notification.show && notification.isSuccess && memb}
                                message={!edit ? "La membresía ha sido creada correctamente" : "La membresía ha sido actualizada"}
                                hideNotification={hideNotification}
                            />
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col xs="12" md="12" lg="6" xg="6" style={{ paddingLeft: 20, paddingRight: 20 }}>
                                    <FormGroup className={formik.errors.name ? 'has-danger' : ''}>
                                        <Label htmlFor="officeName" className="label-form">Nombre</Label>
                                        <Input
                                            type="text"
                                            placeholder="Ingrese el nombre de la membresía"
                                            name="name"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.name}
                                        />
                                    </FormGroup>

                                    <FormGroup className={formik.errors.accessDays ? 'has-danger' : ''}>
                                        <Label htmlFor="accessDays" className="label-form">Días Disponibles</Label>
                                        <Select
                                            className="react-select"
                                            classNamePrefix="react-select"
                                            placeholder="Seleccione días"
                                            name="accessDays"
                                            id="accessDays"
                                            closeMenuOnSelect={false}
                                            isMulti
                                            value={formik.values.accessDays}
                                            onChange={value => formik.setFieldValue("accessDays", value)}
                                            onBlur={formik.handleBlur}
                                            options={[
                                                {
                                                    value: "",
                                                    label: "Seleccione uno más días días",
                                                    isDisabled: true
                                                },
                                                { value: "MONDAY", label: "Lunes" },
                                                { value: "TUESDAY", label: "Martes" },
                                                { value: "WEDNESDAY", label: "Miércoles" },
                                                { value: "THURSDAY", label: "Jueves" },
                                                { value: "FRIDAY", label: "Viernes" },
                                                { value: "SATURDAY", label: "Sábado" },
                                                { value: "SUNDAY", label: "Domingo" },
                                            ]}
                                        />
                                    </FormGroup>
                                </Col>

                                <Col xs="12" md="12" lg="6" xg="6" style={{ paddingLeft: 20, paddingRight: 20 }}>

                                    <FormGroup className={formik.errors.pricePerMonth ? 'has-danger' : ''}>
                                        <Label htmlFor="pricePerMonth" className="label-form">Precio mensual </Label>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>$ {'  '}</InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                type="number"
                                                placeholder="Ingrese"
                                                name="pricePerMonth"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                min={0}
                                                value={formik.values.pricePerMonth}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup className={formik.errors.description ? 'has-danger' : ''}>
                                        <Label htmlFor="description" className="label-form">Descripción</Label>
                                        <Input
                                            type="textarea"
                                            name="description"
                                            id="exampleText"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.description}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div className="col-auto">
                                    <Button
                                        type="submit"
                                        className="btn-round btn-primary mb-3"
                                        color="primary"
                                        style={{ minWidth: 107 }}
                                    >
                                        {!edit ? 'Crear' : 'Actualizar'}
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
            </Container>
        </div>
    );
}
