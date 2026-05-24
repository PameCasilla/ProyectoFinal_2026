import { useFormik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router';
import {
    Button,
    Card,
    CardBody, CardHeader, Col, Container, Form, FormGroup, Input,
    Label, Row
} from 'reactstrap';
import ImageUpload from '../Common/CustomUpload/ImageUpload';
import { Notification } from '../Common/Notification/Notification';


export const OfficeBranchCreate = ({ hideNotification, notification, create }) => {
    const history = useHistory();
    const validate = values => {
        const errors = {};
        if (!values.name)
            errors.name = 'Requerido';
        if (!values.description)
            errors.description = 'Requerido';
        if (!values.phone)
            errors.phone = 'Requerido';
        if (!values.province)
            errors.province = 'Requerido';
        if (!values.city)
            errors.city = 'Requerido';
        if (!values.street)
            errors.street = 'Requerido';
        if (!values.zipCode)
            errors.zipCode = 'Requerido';
        return errors;
    };

    React.useEffect(() => {
        if (notification.show) {
            if (notification.isSuccess)
                setTimeout(() => {
                    history.push('/office-branch/select')
                }, 2500);
            setTimeout(() => {
                hideNotification()
            }, 2000);
        }
    }, [notification.isSuccess]);
    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            phone: "",
            image: "",
            province: "",
            city: "",
            street: "",
            zipCode: ""
        },
        validate,
        onSubmit: async (values) => {
            await create(values);
        },
    });

    return (
        <Container style={{ marginTop: 0 }}>
            <Form onSubmit={formik.handleSubmit}>
                <Card style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <CardHeader>
                        <Notification
                            show={notification.show && notification.isError}
                            message={'Ocurrió un error. Intente nuevamente'}
                            hideNotification={hideNotification}
                            isError={notification.isError}
                        />
                        <Notification
                            show={notification.show && notification.isSuccess}
                            message={"La sucursal se creo correctamente"}
                            hideNotification={hideNotification}
                        />
                    </CardHeader>
                    <CardBody>

                        <Row>
                            <Col lg="6">
                                <FormGroup className={formik.errors.name && formik.touched.name ? 'has-danger' : ''}>
                                    <Label htmlFor="name" className="label-form"> Nombre </Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        placeholder="Nombre.."
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.name} />
                                    {formik.errors.name && formik.touched.name ? (
                                        <div className="error">{formik.errors.name}</div>
                                    ) : null}
                                </FormGroup>
                                <FormGroup className={formik.errors.province && formik.touched.province ? 'has-danger' : ''}>
                                    <Label htmlFor="province" className="label-form"> Provincia </Label>
                                    <Input
                                        type="text"
                                        name="province"
                                        placeholder="Provincia.."
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.province} />
                                    {formik.errors.province && formik.touched.province ? (
                                        <div className="error">{formik.errors.province}</div>
                                    ) : null}
                                </FormGroup>
                                <FormGroup className={formik.errors.city && formik.touched.city ? 'has-danger' : ''}>
                                    <Label htmlFor="city" className="label-form"> Ciudad </Label>
                                    <Input
                                        type="text"
                                        name="city"
                                        placeholder="Ciudad.."
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.city} />
                                    {formik.errors.city && formik.touched.city ? (
                                        <div className="error">{formik.errors.city}</div>
                                    ) : null}
                                </FormGroup>
                                <FormGroup className={formik.errors.street && formik.touched.street ? 'has-danger' : ''}>
                                    <Label htmlFor="street" className="label-form"> Dirección </Label>
                                    <Input
                                        type="text"
                                        name="street"
                                        placeholder="Dirección.."
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.street} />
                                    {formik.errors.street && formik.touched.street ? (
                                        <div className="error">{formik.errors.street}</div>
                                    ) : null}
                                </FormGroup>
                                <FormGroup className={formik.errors.zipCode && formik.touched.zipCode ? 'has-danger' : ''}>
                                    <Label htmlFor="zipCode" className="label-form"> Código postal </Label>
                                    <Input
                                        type="number"
                                        name="zipCode"
                                        placeholder="Código Postal.."
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.zipCode}
                                        min={0}
                                    />
                                    {formik.errors.zipCode && formik.touched.zipCode ? (
                                        <div className="error">{formik.errors.zipCode}</div>
                                    ) : null}
                                </FormGroup>

                            </Col>
                            <Col lg="6">
                                <FormGroup className={formik.errors.phone && formik.touched.phone ? 'has-danger' : ''}>
                                    <Label htmlFor="phone" className="label-form"> Teléfono de contacto </Label>
                                    <Input
                                        type="number"
                                        name="phone"
                                        placeholder="Ingrese el teléfono"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.phone}
                                        min={0}
                                    />
                                    {formik.errors.phone && formik.touched.phone ? (
                                        <div className="error">{formik.errors.phone}</div>
                                    ) : null}
                                </FormGroup>
                                <FormGroup className={formik.errors.description && formik.touched.description ? 'has-danger' : ''}>
                                    <Label htmlFor="description" className="label-form"> Descripción </Label>
                                    <Input
                                        type="textarea"
                                        name="description"
                                        placeholder="Descripción.."
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.description} />
                                    {formik.errors.description && formik.touched.description ? (
                                        <div className="error">{formik.errors.description}</div>
                                    ) : null}
                                </FormGroup>

                                <Label className="label-form"> Foto </Label>
                                <FormGroup>
                                    <ImageUpload onChange={(imageData) => formik.setFieldValue("image", imageData)} className="text-center" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row style={{ textAlign: 'center' }}>
                            <Col>

                                <Button
                                    className="btn-round"
                                    color="primary"
                                    type="submit"
                                    disabled={formik.isSubmitting}>
                                    Crear Sucursal
                                </Button>
                            </Col>
                        </Row>
                    </CardBody >
                </Card >
            </Form>
        </Container >
    )
}
