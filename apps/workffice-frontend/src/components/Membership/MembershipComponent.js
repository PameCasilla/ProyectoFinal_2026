import React from 'react';
import { Link } from 'react-router-dom';
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardHeader,
    UncontrolledTooltip
} from 'reactstrap';
import './styles/OfficeComponent.css';

export const MembershipComponent = ({
    membership,
    deleteMembership,
    displayEditButton = false,
    displayDeleteButton = false,
    displayBuyButton = false,
    onBuy,
    mpCheckout,
    mercadoPagoPreferenceId
}) => {
    const { id, name, description, pricePerMonth } = membership;

    const getDay = day => ({
        MONDAY: 'Lunes',
        TUESDAY: 'Martes',
        WEDNESDAY: 'Miércoles',
        THURSDAY: 'Jueves',
        FRIDAY: 'Viernes',
        SATURDAY: 'Sábado',
        SUNDAY: 'Domingo'
    }[day]);

    return (
        <Card style={{ marginRight: '5%' }}>
            <CardHeader>
                <div className="office-branch-card-title">
                    <h5 style={{ marginBottom: 0, width: '80%' }}>
                        {name}
                    </h5>
                </div>

                <div className="buttons" style={{ display: 'flex' }}>
                    {displayEditButton && (
                        <div>
                            <Link to={`/admin/membership/edit/${id}`}>
                                <Button
                                    type="button"
                                    id={`editNews-${id}`}
                                    color="primary"
                                    className="btn-round btn-icon"
                                    size="sm"
                                >
                                    <i className="nc-icon nc-ruler-pencil" />
                                </Button>
                                <UncontrolledTooltip
                                    placement="right"
                                    target={`editNews-${id}`}
                                    delay={0}
                                >
                                    Editar Membresía
                                </UncontrolledTooltip>
                            </Link>
                        </div>
                    )}

                    {displayDeleteButton && (
                        <div>
                            <Button
                                type="button"
                                id={`deleteNews-${id}`}
                                color="danger"
                                className="btn-round btn-icon"
                                size="sm"
                                onClick={() => deleteMembership(id)}
                            >
                                <i className="fa fa-trash" />
                            </Button>
                            <UncontrolledTooltip
                                placement="right"
                                target={`deleteNews-${id}`}
                                delay={0}
                            >
                                Eliminar Membresía
                            </UncontrolledTooltip>
                        </div>
                    )}

                    {displayBuyButton && (
                        <div>
                            <Button
                                type="button"
                                className="btn-round btn-primary"
                                onClick={onBuy}
                            >
                                Comprar Membresía
                            </Button>

                            <Button
                                type="button"
                                className="btn-round btn-info"
                                color="info"
                                onClick={() => mpCheckout?.open()}
                                disabled={
                                    !mpCheckout || !mercadoPagoPreferenceId
                                }
                            >
                                Pagar
                            </Button>
                        </div>
                    )}
                </div>
            </CardHeader>

            <CardBody>
                <hr />

                <div className="text">
                    <label className="form-label">
                        Precio:{' '}
                        <small style={{ fontSize: 15 }}>
                            {`$ ${pricePerMonth}`}
                        </small>
                    </label>
                </div>

                <div className="text">
                    <label className="form-label">
                        Días:
                        <br />
                        {membership.accessDays &&
                        membership.accessDays.length > 0
                            ? membership.accessDays.map(day => (
                                <Badge key={day} color="info">
                                    {getDay(day)}
                                </Badge>
                            ))
                            : 'No disponible'}
                    </label>
                </div>

                <div className="text">
                    <label className="form-label">
                        Descripción:{' '}
                        <small style={{ fontSize: 15 }}>
                            {description}
                        </small>
                    </label>
                </div>
            </CardBody>
        </Card>
    );
};