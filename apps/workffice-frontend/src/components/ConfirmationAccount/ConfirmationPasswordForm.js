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

export const ConfirmationPasswordForm = () => {
  
  return (
    <>
      <Card>
        <CardHeader className="card-signup text-center">
          <CardTitle tag="h3">Se ha confirmado tu contraseña</CardTitle>
        </CardHeader>
        <CardBody className="text-center">
          <CardText>¡Revisa tu correo!</CardText>
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
}