import { useFormik } from 'formik';
import React from 'react';
import { useLocation } from 'react-router';
import Select from 'react-select';
import { Button, Col, Form, Input, Row } from 'reactstrap';
import { searchQueryBuilder } from '../../utils/searchQueryBuilder';
import { EmptyComponent } from '../Common/Empty/EmptyComponent';
import { Loading } from '../Common/Loading/Loading';
import { Pagination } from '../Common/Pagination/Pagination';
import { OfficeBranchCard } from '../OfficeBranch/OfficeBranchCard';

export const OfficesSearch = ({ officeBranches, search, loading }) => {
    const query = new URLSearchParams(useLocation().search);
    React.useEffect(() => {
        const data = {
            officeCapacityGT: query.get("office_capacity_gt") || "",
            officeCapacityLT: query.get("office_capacity_lt") || "",
            officeType: query.get("office_type") || "",
            officeBranchName: query.get("name") || "",
            page: query.get("page") ? query.get("page") - 1 : 0,
            size: 10,
        }
        search(data)
    }, []);
    const typesOptions = [
        {
            value: "",
            label: "Seleccione una opción",
        },
        { value: "PRIVATE", label: "Privada" },
        { value: "SHARED", label: "Compartida" },
    ];

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            officeCapacityGT: query.get("office_capacity_gt") || "",
            officeCapacityLT: query.get("office_capacity_lt") || "",
            officeType: query.get("office_type") || "",
            officeBranchName: query.get("name") || "",
        },
        onSubmit: async values => {
            const data = {
                ...values,
                officeType: values.officeType.value,
                page: 0,
                size: 10,
            }
            await search(data);
        }
    })

    const renderOfficeBranches = () => {
        if (loading)
            return <Loading />
        return (
            <>
                {officeBranches.data !== undefined && officeBranches.data.length !== 0 ? officeBranches.data.map(officeBranch => {
                    return (
                        <Col key={officeBranch.id} xs="10" md="4" lg="4" xg="4">
                            <OfficeBranchCard key={officeBranch.id} branch={officeBranch} />
                        </Col>
                    )
                }) : <EmptyComponent />}
            </>
        )
    }

    return (
        <div className="content">
            <Row style={{ display: 'grid', paddingTop: 40 }}>
                <Col xs="12" md="6" lg="12" xg="12">
                    <h1>
                        Buscar <small color="red">sucursales</small>
                    </h1>
                    <hr />
                </Col>
            </Row>
            <Row>
                <Col
                    xs="12"
                    md="12"
                    lg="12"
                    xg="12"
                >
                    <Form onSubmit={formik.handleSubmit} className="search-form" style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                        <Input
                            className="search-input"
                            type="text"
                            name='officeBranchName'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.officeBranchName} placeholder="Nombre de sucursal..."></Input>
                        <Select
                            className="react-select primary search-input"
                            classNamePrefix="react-select"
                            name="officeType"
                            id="officeType"
                            name="officeType"
                            placeholder="Tipo de oficina"
                            onChange={value => formik.setFieldValue("officeType", value)}
                            onBlur={formik.handleBlur}
                            options={typesOptions}
                            styles={{ width: '80%' }}
                        />
                        <Input
                            className="search-input"
                            type="text"
                            name='officeCapacityGT'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.officeCapacityGT} placeholder="Capacidad desde"></Input>
                        <Input
                            className="search-input"
                            type="text"
                            name='officeCapacityLT'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.officeCapacityLT} placeholder="Capacidad hasta"></Input>
                        <Button className="btn btn-round" color="primary" type="submit">
                            Buscar
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col
                    xs="12"
                    md="12"
                    lg="12"
                    xg="12"
                >
                    <Pagination
                        uri="/admin/search/"
                        currentPage={officeBranches.pagination ? officeBranches.pagination.currentPage : 1}
                        totalPages={officeBranches.pagination ? officeBranches.pagination.totalPages : 1}
                        queryParams={searchQueryBuilder(
                            {
                                ...formik.values,
                                officeType: formik.values.officeType.value,
                            }
                        )}
                    />
                </Col>
            </Row>
            <Row>
                <Col
                    xs="12"
                    md="12"
                    lg="12"
                    xg="12"
                >
                    <hr />
                    <h2>Sucursales</h2>
                    <hr />
                    <Row style={{ marginLeft: "1%", marginRight: "1%" }}>
                        {renderOfficeBranches()}
                    </Row>
                </Col>
            </Row>
        </div >
    );
}
