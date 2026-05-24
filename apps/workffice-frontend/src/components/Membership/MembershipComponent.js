import React from 'react';
import { Link } from 'react-router-dom';
import { Badge, Button, Card, CardBody, CardHeader, UncontrolledTooltip } from 'reactstrap';
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

  const getDay = day => {
    switch (day) {
      case ("MONDAY"): return "Lunes"
      case ("TUESDAY"): return "Martes"
      case ("WEDNESDAY"): return "Miércoles"
      case ("THURSDAY"): return "Jueves"
      case ("FRIDAY"): return "Viernes"
      case ("SATURDAY"): return "Sábado"
      case ("SUNDAY"): return "Domingo"
    }
  }
  const deleteMemb = (id) => {
    deleteMembership(id)
    // newsUpdated();
  }
  return (
    <>
      <Card style={{ marginRight: '5%' }}>
        <CardHeader>
          <div className="office-branch-card-title">
            <h5 style={{ marginBottom: 0, width: ' 80%' }}>
              {name}
            </h5>
          </div>
          <div className="buttons" style={{ display: 'flex' }}>
            {
              displayEditButton ?
                <div>
                  <Link to={`/admin/membership/edit/${id}`}>
                    <Button id={`editNews-${id}`} color="primary" className="btn-round btn-icon" size="sm">
                      <i className="nc-icon nc-ruler-pencil"></i>
                    </Button>
                    <UncontrolledTooltip placement="right" target={`editNews-${id}`} delay={0}>
                      Editar Membresía
                    </UncontrolledTooltip>
                  </Link>
                </div> : <></>
            }
            {
              displayDeleteButton ?
                <div>
                  <Button id={`deleteNews-${id}`} color="danger" className="btn-round btn-icon" size="sm" onClick={() => deleteMemb(id)} >
                    <i className="fa fa-trash"></i>
                  </Button>
                  <UncontrolledTooltip placement="right" target={`deleteNews-${id}`} delay={0}>
                    Eliminar Membresía
                  </UncontrolledTooltip>
                </div> : <></>
            }
            {
              displayBuyButton ?
                <div>
                  <Button className="btn-round btn-primary" onClick={onBuy}>
                    Comprar Membresía
                  </Button>
                  <Button
                    type="reset"
                    className="btn-round btn-info"
                    color="info"
                    onClick={mpCheckout ? mpCheckout.open : null}
                    disabled={mercadoPagoPreferenceId ? false : true}
                  >
                    Pagar
                  </Button>
                </div> : <></>
            }
          </div>
        </CardHeader>
        <CardBody>
          <hr />
          <div className='text'>
            <label className="form-label">
              Precio:  <small style={{ fontSize: 15 }}>{`$ ${pricePerMonth}`}</small>
            </label>
          </div>

          <div className='text'>
            <label className="form-label">
              Días:<br />
              {membership && membership.accessDays.length > 0 ?
                membership.accessDays.map(day => {
                  return <Badge key={day} color='info'>{getDay(day)}</Badge>
                }) : 'No disponible'
              }
            </label>

          </div>

          <div className='text'>
            <label className="form-label">
              Descripción: <small style={{ fontSize: 15 }}>{description}</small>
            </label>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
