import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { EmptyComponent } from '../Common/Empty/EmptyComponent';
import { Loading } from '../Common/Loading/Loading';
import { OfficeComponent } from './OfficeComponent';

export const OfficesListComponent = ({ offices, officeBranch, loading, loadOffices }) => {
  React.useEffect(() => {
    if (officeBranch !== null)
      loadOffices(officeBranch.id)
  }, [officeBranch ? officeBranch.id : ""])

  const renderOffices = () => {
    if (loading)
      return (
        <Col xs="10" md="4" lg="4" xg="4">
          <Loading />
        </Col>
      )
    return offices.length !== 0 ? offices.map((office) => {
      return <Col key={office.id} xs="10" md="4" lg="4" xg="4">
        <Link to={`/admin/office-detail?id=${office.id}`}>
          <OfficeComponent
            office={office}
            officeBranch={officeBranch}
            displayEditButton
            displayBookingsButton
          />
        </Link>
      </Col>
    }) : <EmptyComponent />
  }

  return (
    <div className="content">
      <Row style={{ display: 'grid', paddingTop: 40 }}>
        <Col xs="12" md="6" lg="12" xg="12">
          <h1>
            Mis <small color="red">oficinas</small>
          </h1>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col
          xs="6"
          md="6"
          lg="12"
          xg="12"
          style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Button className="btn-round" color="primary">
            <Link to="/admin/new-office" style={{ color: 'white', textDecoration: 'none' }}>
              {' '}
              <i className="fa fa-plus" /> Nueva Oficina
            </Link>
          </Button>
        </Col>
      </Row>

      <Row style={{ justifyContent: 'center' }}>
        {renderOffices()}
      </Row>
    </div >
  );
}