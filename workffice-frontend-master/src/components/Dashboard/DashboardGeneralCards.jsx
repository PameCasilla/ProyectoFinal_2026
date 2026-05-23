import React, { useEffect, useRef } from 'react';
import { Card, CardBody, CardFooter, CardTitle, Col, Row } from 'reactstrap';

export const DashboardGeneralCards = (props) => {
  const { currentYearRevenue, loadRevenuePerMonth } = props;
  const total = () => {
    if (currentYearRevenue.length > 0) {
      return currentYearRevenue.reduce((prevValue, currentValue) => {
        return prevValue += currentValue.totalAmount;
      }, 0);
    }
  }

  const countRef = useRef(0);
  useEffect(() => {
    if (countRef.current === 0) {
      loadRevenuePerMonth(new Date().getFullYear());
      countRef.current++;
    }
  }, [])

  return (
    <Row>
      <Col lg="4" md="6" sm="6">
        <Card className="card-stats">
          <CardBody>
            <Row>
              <Col md="4" xs="5">
                <div className="icon-big text-center icon-warning">
                  <i className="fas fa-users text-primary" />
                </div>
              </Col>
              <Col md="8" xs="7">
                <div className="numbers">
                  <p className="card-category">Colaboradores</p>
                  <CardTitle tag="p">{props.collaboratorTotal}</CardTitle>
                  <p />
                </div>
              </Col>
            </Row>
          </CardBody>
          <CardFooter>
            <hr />
            <div className="stats text-center">
              Cantidad de colaboradores <br /> <i>{props.branch.name}</i>
            </div>
          </CardFooter>
        </Card>
      </Col>
      <Col lg="4" md="6" sm="6">
        <Card className="card-stats">
          <CardBody>
            <Row>
              <Col md="4" xs="5">
                <div className="icon-big text-center icon-warning">
                  <i className="fas fa-user-plus text-warning" />
                </div>
              </Col>
              <Col md="8" xs="7">
                <div className="numbers">
                  <p className="card-category">Capacidad</p>
                  <CardTitle tag="p">{props.capacityTotal} </CardTitle>
                  <p />
                </div>
              </Col>
            </Row>
          </CardBody>
          <CardFooter>
            <hr />
            <div className="stats text-center">
              Cantidad de lugares <br /> <i>{props.branch.name}</i>
            </div>
          </CardFooter>
        </Card>
      </Col>
      <Col lg="4" md="6" sm="6">
        <Card className="card-stats">
          <CardBody>
            <Row>
              <Col md="4" xs="5">
                <div className="icon-big text-center icon-warning">
                  <i className="nc-icon nc-money-coins text-success" />
                </div>
              </Col>
              <Col md="8" xs="7">
                <div className="numbers">
                  <p className="card-category">Ingresos del Año</p>
                  <CardTitle tag="p">$ {total() ? total() : 0}</CardTitle>
                  <p />
                </div>
              </Col>
            </Row>
          </CardBody>
          <CardFooter>
            <hr />
            <div className="stats text-center">
              Ingresos <br /> <i>{props.branch.name}</i>
            </div>
          </CardFooter>
        </Card>
      </Col>
    </Row>
  )
}
