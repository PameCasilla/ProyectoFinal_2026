import React from 'react';
import { Card, CardBody } from 'reactstrap';
// import image from '../../assets/img/bg/office1.jpg';

export const EmptyOfficeBranch = () => (
    <>
        <Card>
            <CardBody>
                {/* <img className="office-branch-card-image" src={image} /> */}
                <div className="office-branch-card-title">
                    <h5>
                        <small>No hemos encontrado Sucursales.</small>
                    </h5>
                </div>
                <hr />
                <p>
                    <b>Por favor cree su sucursal para comenzar a trabajar</b>
                </p>
                <p><small><i>Workffice</i></small></p>
            </CardBody>
        </Card>
    </>
);
