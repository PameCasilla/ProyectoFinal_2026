
import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import { ConfirmationPasswordForm } from '../../../components/ConfirmationAccount/ConfirmationPasswordForm'

export const ConfirmationPassword = () => {
    return (
        <div className="login-page">
            <Container>
                <Row
                    style={{ textAlign: 'center' }}
                >
                    <Col className="ml-auto mr-auto" lg="6" md="6">
                        <ConfirmationPasswordForm />
                    </Col>
                </Row>
            </Container>
            <div
                className="full-page-background"
                style={{
                    backgroundImage: `url(${require('../../../assets/img/bg/markus-spiske-187777.jpg').default
                        })`,
                }}
            />
        </div>
    )
}
