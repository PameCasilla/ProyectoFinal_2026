import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import { ConfirmationForm } from '../../components/ConfirmationAccount/ConfirmationForm';

export const ConfirmationAccount = () => (
  <div className="login-page">
    <Container>
      <Row 
        style={{textAlign: 'center'}}
      >
        <Col className="ml-auto mr-auto" lg="4" md="6">
          <ConfirmationForm />
        </Col>
      </Row>
    </Container>
    <div
      className="full-page-background"
      style={{
        backgroundImage: `url(${
          require('../../assets/img/bg/markus-spiske-187777.jpg').default
        })`,
      }}
    />
  </div>
);
