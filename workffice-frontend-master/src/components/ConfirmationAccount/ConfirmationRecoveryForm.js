import React from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  CardTitle,
} from 'reactstrap';
import logo from '../../assets/img/Recurso 4.png';

export const ConfirmationRecoveryForm = () => (
  <>
    <Card>
      <CardHeader className="card-signup text-center">
        <CardTitle tag="h3">Confirma la recuperación</CardTitle>
      </CardHeader>
      <CardBody className="text-center">
        <CardText>¡Revisa tu correo!</CardText>
        <CardText>
          Te hemos enviado un link de confirmación a tu correo.
        </CardText>
      </CardBody>
      <CardFooter>
        <p className="text-center">
          <img className="" width="40%" src={logo} />
        </p>
      </CardFooter>
    </Card>
  </>
);
