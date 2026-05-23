
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, Container, Row } from 'reactstrap'
import { EmptyOfficeBranch } from '../../../components/OfficeBranch/EmptyOfficeBranch'
import { OfficeBranchCardSelect } from '../../../components/OfficeBranch/OfficeBranchCardSelect'
import { Loading } from '../../../components/Common/Loading/Loading'

export const OfficeBranchSelect = ({
    loadUser,
    user,
    cleanOfficeBranch,
    loadOfficeBranches,
    selectOfficeBranch,
    officeBranches,
    currentOfficeBranch,
    loading,
}) => {
    const countRef = useRef(0);
    const [selected, setSelected] = useState(false)
    useEffect(() => {
        if (countRef.current === 0) {
            cleanOfficeBranch()
            countRef.current++;
        }
    }, [])
    useEffect(() => {
        if (user)
            loadOfficeBranches(user.id, user.email)
    }, [user ? user.id : ""])
    useEffect(() => {
        loadUser()
    }, [user ? user.id : ""])
    const onSelect = officeBranchId => {
        selectOfficeBranch(officeBranchId)
        setSelected(true)
    }

    const renderOfficeBranches = () => {
        if (loading)
            return <Loading/>
        return (
            <>
                {
                    officeBranches && officeBranches.length !== 0
                        ? officeBranches.map(branch =>
                            <Col key={branch.id} xs="10" md="4" lg="4" xg="4">
                                <OfficeBranchCardSelect
                                    branch={branch}
                                    select={onSelect}
                                    selected={selected}
                                    currentOfficeBranch={currentOfficeBranch}
                                />
                            </Col>
                        )
                        : <EmptyOfficeBranch />
                }
            </>
        )
    }
    return (
        <div className="login-page">
            <Container style={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "nowrap",
                alignContent: "space-around"
            }}>
                <Row
                >
                    <Col className="" xg="12" lg="12" md="12" style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between' }}>
                        <h1 style={{ color: '#FFFF' }}>Seleccione sucursal</h1>
                        <hr />
                        <Button className="btn-round" color="danger">
                            <Link to="/office-branch/create" style={{ color: 'white', textDecoration: 'none' }}>

                                {' '}
                                <i className="fa fa-plus" /> Nueva Sucursal
                            </Link>
                        </Button>
                    </Col>
                    <Col className="ml-auto mr-auto" xg="12" lg="12" md="12" style={{ display: "flex", flexWrap: "wrap" }}>
                        {renderOfficeBranches()}
                    </Col>
                </Row>
            </Container>

            <div
                className='full-page-background'
                style={{
                    background: '#34b18a',
                }}
            />
        </div >
    )
}
