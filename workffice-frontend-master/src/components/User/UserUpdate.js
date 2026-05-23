import React from 'react';
import { useFormik } from 'formik';
import {
    Button, Card,
    CardBody, CardHeader, Col, Form, FormGroup, Input, Row
} from 'reactstrap';


export const UserUpdate = (props) => {
    const {
        address,
        bio,
        email,
        lastname,
        name,
        profileImage
    } = props || {}

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: name,
            lastname: lastname,
            address: address,
            bio: bio,
        },
        onSubmit: async (values) => {
            await props.update({ ...values, profileImage });
        },
    });
    return (
        <Card>
            <CardHeader>
                <h5 className="title">Editar Perfil</h5>
            </CardHeader>
            <CardBody>
                <Form onSubmit={formik.handleSubmit}>
                    <Row>
                        <Col className="pr-1" md="4">
                            <FormGroup>
                                <label htmlFor="email">
                                    Email
                                </label>
                                <Input type="email" disabled defaultValue={email} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-1" md="6">
                            <FormGroup>
                                <label htmlFor="name">Nombre</label>
                                <Input
                                    value={formik.values.name}
                                    placeholder={name}
                                    onChange={formik.handleChange}
                                    type="text"
                                    name="name"
                                    id="name"
                                />
                            </FormGroup>
                        </Col>
                        <Col className="pl-1" md="6">
                            <FormGroup>
                                <label htmlFor="lastname">Apellido</label>
                                <Input
                                    value={formik.values.lastname}
                                    placeholder={lastname}
                                    onChange={formik.handleChange}
                                    type="text"
                                    name="lastname"
                                    id="lastname"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <FormGroup>
                                <label htmlFor="address">Domicilio</label>
                                <Input
                                    value={formik.values.address}
                                    placeholder={address}
                                    onChange={formik.handleChange}
                                    type="text"
                                    name="address"
                                    id="address"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <FormGroup>
                                <label htmlFor="bio">Descripción</label>
                                <Input
                                    value={formik.values.bio}
                                    placeholder={bio}
                                    onChange={formik.handleChange}
                                    type="textarea"
                                    name="bio"
                                    id="bio"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <FormGroup>
                                <Button
                                    type="submit"
                                    disabled={formik.isSubmitting}
                                    className="btn-round btn-primary"
                                >
                                    Guardar
                                </Button>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </CardBody>
        </Card>
    )
}
