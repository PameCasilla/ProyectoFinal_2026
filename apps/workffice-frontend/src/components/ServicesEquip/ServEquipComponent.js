import React from 'react'
import { useFormik } from 'formik';
import { Col, Button, Card, CardBody, Form, Input, Row, Label, CardHeader, CardTitle, FormGroup } from 'reactstrap';
import Select from 'react-select';
import { Notification } from '../Common/Notification/Notification'
import './styles/ServEquipComponentStyles.css';

export const ServEquipComponent = (props) => {
    const { title, typeName, options, branch } = props;
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            elementName: '',
            elementSelected: options[0]
        },
        onSubmit: async element => {
            const payload = {
                category: element.elementSelected.value,
                name: element.elementName
            }
            await props.create(branch.id, payload);
            setTimeout(() => {
                formik.resetForm();
            }, 2000)
            formik.resetForm()
            //   history.push('/admin/office-branch');
        },
    });
    const message = `El ${typeName} ha creado exitosamente`;
    return (
        <div className='content'>
            <Row>
                <Col>
                    <Form onSubmit={formik.handleSubmit}>
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h3">{title}</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col md="6">
                                        <FormGroup>
                                            <Label htmlFor="officeType" className="label-form">{title}</Label>
                                            <Select
                                                className="react-select primary"
                                                classNamePrefix="react-select"
                                                name="officeType"
                                                id="officeType"
                                                value={formik.values.elementSelected}
                                                onChange={value => formik.setFieldValue("elementSelected", value)}
                                                onBlur={formik.handleBlur}
                                                options={options}

                                            />

                                        </FormGroup>
                                    </Col>
                                    <Col md="6">
                                        <FormGroup>
                                            <Label htmlFor="officeType" className="label-form">Nombre</Label>
                                            <Input
                                                name='elementName'
                                                type="text"
                                                placeholder={`Ingrese el nombre del ${typeName}`}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.elementName}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                    <Col md="3">
                                        <Button
                                            block
                                            className="btn-round btn-primary mb-3"
                                            type="submit"
                                        >
                                            Crear
                                        </Button>
                                    </Col>
                                    <Col md="3">
                                        <Button
                                            block
                                            className="btn-round btn-primary mb-3"
                                            type="reset"
                                            color="danger"
                                        >
                                            Cancelar
                                        </Button>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Form>
                </Col>
                <Col md="12">
                    <Notification
                        show={props.notification.show && props.notification.isSuccess}
                        message={message}
                        hideNotification={props.hideNotification}
                    />
                </Col>
            </Row >
        </div>
    )
}
