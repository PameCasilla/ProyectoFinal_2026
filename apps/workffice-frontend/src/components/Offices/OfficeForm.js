import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Select from 'react-select';
import {
    Button, Card,
    CardBody, CardHeader, Col, Container, Form,
    FormGroup, Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText, Label, Row
} from 'reactstrap';
import ImageUpload from '../Common/CustomUpload/ImageUpload';
import './styles/OfficeStyle.css';
import SweetAlert from 'react-bootstrap-sweetalert';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

export const OfficeForm = ({ office, onSubmit, inactivities, confirmButtonName, deleteOffice, equip, serv }) => {
    const history = useHistory()
    const typesOptions = [
        {
            value: "",
            label: "Seleccione una opción",
        },
        { value: "PRIVATE", label: "Privada" },
        { value: "SHARED", label: "Compartida" },
    ];
    const getPrivacyLabel = privacy => {
        if (privacy === "PRIVATE")
            return "Privada"
        else
            return "Compartida"
    }

    const servOpt = serv.map(s => {
        let newServ = {
            value: s.id,
            label: s.name
        }
        return newServ;
    })
    const equipOpt = equip.map(e => {
        let newEquip = {
            value: e.id,
            label: e.name
        }
        return newEquip;
    })

    const getDay = day => {
        switch (day) {
            case ("MONDAY"): return "Lunes"
            case ("TUESDAY"): return "Martes"
            case ("WEDNESDAY"): return "Miércoles"
            case ("THURSDAY"): return "Jueves"
            case ("FRIDAY"): return "Viernes"
            case ("SATURDAY"): return "Sábado"
            case ("SUNDAY"): return "Domingo"
        }
    }

    const validate = values => {
        const errors = {};
        if (!values.officeName)
            errors.officeName = 'Requerido';
        if (!values.officeType.value || values.officeType.value === "")
            errors.officeType = 'Requerido';
        if (!values.tablesQuantity)
            errors.tablesQuantity = 'Requerido';
        if (!values.capacityPerTable)
            errors.capacityPerTable = 'Requerido';
        if (!values.price)
            errors.price = 'Requerido';
        if (!values.services) {
            errors.services = 'Requerido.';
        }
        if (!values.equipments) {
            errors.equipments = 'Requerido.';
        }
        if (!values.description)
            errors.description = 'Requerido';
        return errors;
    };

    const [alert, setAlert] = useState(null)

    const hideAlert = () => {
        setAlert(null)
    }
    const successAlert = () => {
        setAlert(

            <SweetAlert
                danger
                showCancel
                confirmBtnBsStyle="primary"
                confirmBtnCssClass="btn-round"
                cancelBtnBsStyle="danger"
                confirmBtnText="Eliminar"
                cancelBtnText="Cancelar"
                cancelBtnCssClass="btn-round"
                focusCancelBtn
                style={{ display: "block", marginTop: "-100px" }}
                btnSize="xs"
                title="¿Estás seguro?"
                onConfirm={() => {
                    handleDelete();
                    hideAlert();
                }}
                onCancel={() => hideAlert()}
            >
                La oficina cumplirá con las reservas que tiene hechas o deberá contactarse con los inquilinos para devolverles el dinero.
                Una vez efectuado estos pasos la oficina será dada de baja
            </SweetAlert>
        )

    }

    const handleDelete = async () => {
        await deleteOffice(office.id);

        setTimeout(() => {
            history.push('/admin/offices');
        }, 2800)
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            officeName: office ? office.name : "",
            officeType: office ? { value: office.privacy, label: getPrivacyLabel(office.privacy) } : typesOptions[0],
            inactivityDays: inactivities ? inactivities
                .filter(inactivity => inactivity.type === "RECURRING_DAY")
                .map(inactivity => ({ value: inactivity.dayOfWeek, label: getDay(inactivity.dayOfWeek) }))
                : [],
            tablesQuantity: office ? office.table.quantity : 0,
            capacityPerTable: office ? office.table.capacity : 0,
            price: office ? office.price : 0,
            services: office ? office.services.map(o => (
                    servOpt.find(s=> s.value === o.id)
                ))
                : [],
            equipments: office ? office.equipments.map(o => (
                equipOpt.find(e=> e.value === o.id)
            ))
            : [],
            description: office ? office.description : "",
            photo: "",
        },
        validate,
        onSubmit: async ({
            officeName,
            officeType,
            inactivityDays,
            tablesQuantity,
            capacityPerTable,
            price,
            description,
            photo,
            services,
            equipments
        }) => {
            const servicesIds = services.map(s => s.value);
            const equipmentsIds = equipments.map(s => s.value);
            const officeFormData = {
                name: officeName,
                description: description,
                privacy: officeType.value,
                price: price,
                capacity: tablesQuantity * capacityPerTable,
                tablesQuantity: tablesQuantity,
                capacityPerTable: capacityPerTable,
                photo: photo,
                inactivityDays: inactivityDays.map(day => ({
                    type: "RECURRING_DAY",
                    dayOfWeek: day.value
                })),
                services: servicesIds,
                equipments: equipmentsIds,
            }
            onSubmit(officeFormData);

        },
    });

    return (
        <Container>
            <Form onSubmit={formik.handleSubmit} >
                <Card style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <CardHeader style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <h1><small>{formik.values.officeName}</small></h1>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col xs="12" md="12" lg="6" xg="6" style={{ paddingLeft: 20, paddingRight: 20 }}>
                                <FormGroup className={formik.errors.officeName && formik.touched.officeName ? 'has-danger' : ''}>
                                    <Label htmlFor="officeName" className="label-form">Nombre</Label>
                                    <Input
                                        type="text"
                                        placeholder="Ingrese el nombre de la oficina"
                                        name="officeName"
                                        id="officeName"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.officeName}
                                    />
                                </FormGroup>


                                <FormGroup>
                                    <Label htmlFor="officeType" className="label-form">Tipo de oficina</Label>
                                    <Select
                                        className="react-select primary"
                                        classNamePrefix="react-select"
                                        name="officeType"
                                        id="officeType"
                                        value={formik.values.officeType}
                                        onChange={value => formik.setFieldValue("officeType", value)}
                                        onBlur={formik.handleBlur}
                                        options={typesOptions}

                                    />
                                    {formik.errors.officeType ? <Label className="text-danger">{formik.errors.officeType}</Label> : <></>}
                                </FormGroup>

                                <FormGroup className={formik.errors.tablesQuantity && formik.touched.tablesQuantity ? 'has-danger' : ''}>
                                    <Label htmlFor="tablesQuantity" className="label-form">Cantidad de mesas</Label>
                                    <Input
                                        type="number"
                                        placeholder="Ingrese el número de mesas..."
                                        name="tablesQuantity"
                                        id="tablesQuantity"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        min={1}
                                        value={formik.values.tablesQuantity}
                                    />
                                </FormGroup>
                                <FormGroup className={formik.errors.capacityPerTable && formik.touched.capacityPerTable ? 'has-danger' : ''}>
                                    <Label htmlFor="capacityPerTable" className="label-form">Cantidad de personas por mesa</Label>
                                    <Input
                                        type="number"
                                        placeholder="Ingrese el número de personas por mesas"
                                        name="capacityPerTable"
                                        id="capacityPerTable"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        min={1}
                                        value={formik.values.capacityPerTable}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="inactivityDays" className="label-form">Dias no disponibles</Label>
                                    <Select
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        placeholder="Seleccione días"
                                        name="inactivityDays"
                                        id="inactivityDays"
                                        closeMenuOnSelect={false}
                                        isMulti
                                        value={formik.values.inactivityDays}
                                        onChange={value => formik.setFieldValue("inactivityDays", value)}
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
                                <FormGroup className={formik.errors.price && formik.touched.price ? 'has-danger' : ''}>
                                    <Label htmlFor="price" className="label-form">Precio por hora</Label>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>$ {'  '}</InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            type="number"
                                            placeholder="Ingrese el precio por hora"
                                            name="price"
                                            id="price"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            min={0}
                                            value={formik.values.price}
                                        />
                                    </InputGroup>
                                </FormGroup>

                                <FormGroup className={formik.errors.services ? 'has-danger' : ''} style={{ marginLeft: '4%' }}>
                                    <Row className='row-label-services'>
                                        <Label htmlFor="services" className="label-form">Servicios</Label>

                                        <div className='row-form-select' style={{ width: '100%', display: 'flex' }}>
                                            <div style={{ width: '80%' }}>
                                                <Select
                                                    className="react-select"
                                                    classNamePrefix="react-select"
                                                    placeholder='Seleccione los servicios...'
                                                    name="services"
                                                    closeMenuOnSelect={false}
                                                    isMulti
                                                    value={formik.values.services}
                                                    onChange={value => formik.setFieldValue('services', value)}
                                                    onBlur={formik.handleBlur}
                                                    options={servOpt}
                                                />
                                            </div>
                                            <div className='button-container'>
                                                <Link to="/admin/services-equipment">
                                                    <Button className='btn btn-primary' id='servicesButton' type='button'>
                                                        Crear
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </Row>
                                </FormGroup>

                                <FormGroup className={formik.errors.equipments ? 'has-danger' : ''} style={{ marginLeft: '4%' }}>
                                    <Row className='row-label-equipment'>
                                        <Label htmlFor="equipments" className="label-form">Equipamiento</Label>

                                        <div className='row-form-select' style={{ width: '100%', display: 'flex' }}>
                                            <div style={{ width: '80%' }}>
                                                <Select
                                                    className="react-select"
                                                    classNamePrefix="react-select"
                                                    placeholder='Seleccione el equipamiento...'
                                                    name="equipments"
                                                    closeMenuOnSelect={false}
                                                    isMulti
                                                    value={formik.values.equipments}
                                                    onChange={value => formik.setFieldValue('equipments', value)}
                                                    onBlur={formik.handleBlur}
                                                    options={equipOpt}
                                                />
                                            </div>
                                            <div className='button-container'>
                                                <Link to="/admin/services-equipment">
                                                    <Button className='btn btn-primary' id='equipmentButton'>
                                                        Crear
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </Row>
                                </FormGroup>

                                <FormGroup className={formik.errors.description && formik.touched.description ? 'has-danger' : ''}>
                                    <Label htmlFor="description" className="label-form">Descripción</Label>
                                    <Input
                                        type="textarea"
                                        name="description"
                                        id="description"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.description}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Row className='photo' style={{ marginLeft: '0%' }}>
                                        <Label htmlFor="photo" className="label-form">Fotos</Label>
                                    </Row>
                                    <Row style={{ display: 'flex', justifyContent: 'center' }}>
                                        <ImageUpload onChange={imageData => formik.setFieldValue("photo", imageData)} avatar={office ? office.imageUrl : ""} />
                                    </Row>
                                </FormGroup>
                            </Col>

                        </Row>

                        <Row>
                            <Col style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    className="btn btn-round btn-primary"
                                    color="primary"
                                    type="submit"
                                    disabled={formik.isSubmitting}>
                                    {confirmButtonName}
                                </Button>
                                <Button
                                    className="btn-round"
                                    color="danger"
                                    fill
                                    onClick={() => successAlert()}
                                >
                                    Dar de baja
                                </Button>{alert}
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Form>
        </Container >
    );
}


OfficeForm.propTypes = {
    confirmButtonName: PropTypes.string.isRequired,
    office: PropTypes.shape({
        name: PropTypes.string,
        price: PropTypes.number,
        privacy: PropTypes.string,
        description: PropTypes.string,
        table: PropTypes.shape({
            quantity: PropTypes.number,
            capacity: PropTypes.number,
        }),
        imageUrl: PropTypes.string,
    }),
    inactivities: PropTypes.shape({
        type: PropTypes.string,
        dayOfWeek: PropTypes.string,
        specificInactivityDay: PropTypes.string,
    }),
    onSubmit: PropTypes.func.isRequired,
}