import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Label, Row, UncontrolledTooltip } from 'reactstrap';
import { Cloudinary } from '../Common/Cloudinary/Cloudinary';
import './styles/OfficeComponent.css';

export const OfficeComponent = ({
  office,
  officeBranch,
  displayOfficeBranchInformation,
  displayTableInformation,
  displayBookingButton,
  displayEditButton,
  displayBookingsButton,
}) => {
  const {
    id,
    name,
    privacy,
    price,
    imageUrl,
    capacity,
    table,
  } = office;

  const getOfficeType = () => {
    if (privacy === "SHARED")
      return <Badge color="info">Compartida</Badge>
    return <Badge color="danger">Privada</Badge>
  }
  return (
    <>
      <Card>
        <CardBody>
          <Cloudinary className="office-branch-card-image" height="250rem" width="100%" publicId={imageUrl} />
          <CardHeader>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
              {
                name.length < 20
                  ? <h5 style={{ marginBottom: "0", marginRight: "3%" }}>
                    {name}
                  </h5>
                  : <h5 style={{ marginBottom: "0", marginRight: "3%" }} id={`officeName-${id}`}>
                    <UncontrolledTooltip placement="top" target={`officeName-${id}`} delay={0}>
                      {name}
                    </UncontrolledTooltip>
                    {name.slice(0, 20) + "..."}
                  </h5>
              }

              {
                displayEditButton ?
                  <div>
                    <Link to={`/admin/offices/edit?id=${id}`}>
                      <Button id={`editOffice-${id}`} color="primary" className="btn-round btn-icon" size="sm">
                        <i className="nc-icon nc-ruler-pencil"></i>
                      </Button>
                      <UncontrolledTooltip placement="right" target={`editOffice-${id}`} delay={0}>
                        Editar oficina
                      </UncontrolledTooltip>
                    </Link>
                  </div> : <></>
              }
              {
                displayBookingsButton ?
                  <div>
                    <Link to={`/admin/office_bookings?id=${id}`}>
                      <Button id={`officeBookings-${id}`} color="primary" className="btn-round btn-icon" size="sm">
                        <i className="fa fa-ticket"></i>
                      </Button>
                      <UncontrolledTooltip placement="right" target={`officeBookings-${id}`} delay={0}>
                        Ver reservas
                      </UncontrolledTooltip>
                    </Link>
                  </div> : <></>
              }
            </div>
            {
              displayOfficeBranchInformation
                ? <Row>
                  <Col>
                    <div className='text'>
                      <Label className="form-label">
                        Sucursal <small>{officeBranch ? officeBranch.name : ""}</small>
                      </Label>
                    </div>
                  </Col>
                  <Col>
                    <div className='text' style={{ marginBottom: 0 }}>
                      <Label className="form-label">
                        Contacto <small>{officeBranch ? officeBranch.phone : ""}</small>
                      </Label>
                    </div>
                  </Col>
                </Row> : <></>
            }
            {
              displayBookingButton && office.deletedAt === null ?
                <Link to={`/admin/create-booking?officeId=${id}&officeBranchId=${officeBranch ? officeBranch.id : ""}`}>
                  <Button
                    className="btn btn-primary"
                    color="primary"
                    type="submit"
                  >
                    Alquilar oficina
                  </Button>
                </Link>
                : <div></div>
            }
            {
              displayBookingButton ?
                <Link to={`/admin/office-detail?id=${office.id}`}>
                  <Button
                    className="btn btn-primary"
                    color="primary"
                    type="submit"
                  >
                    Ver reseñas
                  </Button>
                </Link>
                : <div></div>
            }
          </CardHeader>
          <hr />
          <Col>
            <div className='text'>
              <Label className="form-label">
                Tipo de oficina: {getOfficeType()}
              </Label>
            </div>

            <div className='text'>
              <Label className="form-label">
                Precio por hora:  <small>{`$ ${price}`}</small>
              </Label>
            </div>
            <div className='text'>
              <Label className="form-label">
                Capacidad:  <small>{capacity} personas</small>
              </Label>
            </div>
          </Col>
          <hr />
          {
            displayTableInformation ?
              <Col>
                <Row>
                  <Col>
                    <h5 style={{ marginBottom: ".1rem" }}>Mesas</h5>
                  </Col>
                </Row>
                <Row>
                  <Col style={{ paddingRight: "0" }}>
                    <div className="text">
                      <Label className="form-label">
                        Cantidad:  <small>{table.quantity}</small>
                      </Label>
                    </div>
                  </Col>
                  <Col>
                    <div className="text">
                      <Label className="form-label">
                        Capacidad:  <small>{table.capacity}</small>
                      </Label>
                    </div>
                  </Col>
                </Row>
              </Col> : <></>
          }
        </CardBody>
        <CardFooter style={{ marginTop: '-30px' }}>
          <Row>
            <Col lg={2} xl={2}><Label>Estado:  {'     '}</Label></Col>
            <Col lg={4} xl={4}>
              <Badge color={office.deletedAt === null ? 'success' : 'danger'}>{office.deletedAt === null ? 'Disponible' : 'No disponible'}</Badge>
            </Col>
            <Col lg={6} xl={6}>
            {office.deletedAt === null ? '' : `Desde el ${ new Date(Date.parse(office.deletedAt)).getDay() }/${new Date(Date.parse(office.deletedAt)).getUTCMonth()+1}/${new Date(Date.parse(office.deletedAt)).getFullYear()}`}
            </Col>


          </Row>
          <Row>
            <Col>
              <Label>Servicios</Label>
              <br />
              {office.services.length > 0
                ? office.services.map(o => <Badge key={o.id} color={'warning'}>{o.name}</Badge>)
                : <p style={{fontSize:'12px', color:'gray', fontStyle:'oblique'}}>No tiene</p>
              }
          </Col>

          <Col>
            <Label>Equipamiento</Label>
            <br />
            {office.equipments.length > 0
              ? office.equipments.map(o => <Badge key={o.id} color={'warning'}>{o.name}</Badge>)
              : <p style={{ fontSize: '12px', color: 'gray', fontStyle: 'oblique' }}>No tiene</p>
            }
          </Col>

        </Row>

      </CardFooter>
    </Card>
    </>
  );
}


OfficeComponent.propTypes = {
  officeBranch: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string
  }),
  office: PropTypes.shape({
    name: PropTypes.string,
    privacy: PropTypes.string,
    price: PropTypes.number
  }),
  displayBookingButton: PropTypes.bool,
  displayEditButton: PropTypes.bool,
  displayBookingsButton: PropTypes.bool,
  displayOfficeBranchInformation: PropTypes.bool,
  displayTableInformation: PropTypes.bool,
}