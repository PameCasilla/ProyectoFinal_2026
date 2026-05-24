import React from 'react';
import { Col, Row, Container } from 'reactstrap';
import { OfficeBranchCreate } from '../../../components/OfficeBranch/OfficeBranchCreate';

export const CreateOfficeBranch = ({ hideNotification, notification, onCreate }) => {

    return (
        <div className="login-page">
            <Container 
                className="content"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '80%',
                    justifyContent: 'center',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    paddingTop: 0,                    
                }}
                >
                <Row style={{ display: 'grid' }}>
                    <Col xs="12" md="12" lg="12" xg="12">
                        <h1 style={{ color: 'white' }}>
                            Nueva Sucursal
                        </h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" md="12" lg="12" xg="12">
                        <OfficeBranchCreate create={onCreate} hideNotification={hideNotification} notification={notification} />
                    </Col>
                </Row>
            </Container>
            <div className="login-page">
                <div
                    className='full-page-background'
                    style={{
                        background: '#34b18a',
                    }}
                />
            </div >
        </div>
    ) 
};
