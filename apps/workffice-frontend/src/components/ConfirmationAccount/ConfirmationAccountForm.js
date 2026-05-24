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

export const ConfirmationAccountForm = () => (
  <>
    <Card>
      <CardHeader className="card-signup text-center">
        <CardTitle tag="h3">Hemos confirmado tu cuenta</CardTitle>
      </CardHeader>
      <CardBody className="text-center">
        <CardText>¡Gracias por registrarte!</CardText>
        <CardText>
          Ya puedes ingresar a tu cuenta.
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
