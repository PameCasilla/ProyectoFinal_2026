import { includes } from "lodash-es";
import React, { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import { readFromLocalStorage } from "../../infra/api/localStorage";
import { REPORT_RESOURCE } from "../../stores/actions/errors/permissionActions";
import { monthFilter, yearFilter } from '../../utils/filters';
import { NotAccess } from "../Common/ErrorPages/NotAccess";
import { DashboardGeneralCards } from "./DashboardGeneralCards.jsx";
import { DashboardIncomeStatistics } from "./DashboardIncomeStatistics.jsx";
import { DashboardOfficeBooking } from "./DashboardOfficeBooking.jsx";
import { DashboardsMembershipComponent } from "./DashboardsMembershipComponent";

function Dashboard({
  officeBranch,
  loadCollaborators,
  collaborators,
  loadOffices,
  offices,
  loadRevenuePerOffice,
  loadBookingsQuantityPerOffice,
  loadRevenuePerMonth,
  revenuePerMonth,
  bookingsQuantityPerOffice,
  revenuePerOffice,
  permission,
}) {
  let capacityTotal = 0;
  let collaboratorTotal = collaborators ? collaborators.length : 0;
  offices.map(office => capacityTotal += office.capacity)
  useEffect(() => {
    loadOffices()
    loadCollaborators()
  }, [officeBranch.id])
  const officeBranchId = readFromLocalStorage('officeBranch').id;
  const renderDashboard = () => {
    return <>
      <Row style={{ display: 'grid', paddingTop: 40 }}>
        <Col xs="12" md="6" lg="12" xg="12">
          <h1>
            Estadísticas <small color="red">Generales</small>
          </h1>
          <hr />
        </Col>
      </Row>
      <Container>
        <DashboardGeneralCards
          collaboratorTotal={collaboratorTotal}
          capacityTotal={capacityTotal}
          branch={officeBranch}
          currentYearRevenue={revenuePerMonth}
          loadRevenuePerMonth={loadRevenuePerMonth}
        />
      </Container>
      <Row>
        <Col xs="12" md="6" lg="12" xg="12">
          <h2>
            Ingresos de la<small color="red"> Sucursal</small>
          </h2>
          <hr />
        </Col>
      </Row>
      <DashboardIncomeStatistics
        monthFilter={monthFilter}
        yearFilter={yearFilter}
        revenuePerOffice={revenuePerOffice}
        revenuePerMonth={revenuePerMonth}
        loadRevenuePerMonth={loadRevenuePerMonth}
        loadRevenuePerOffice={loadRevenuePerOffice}
        offices={offices}
      />
      <Row>
        <Col xs="12" md="6" lg="12" xg="12">
          <h2>
            Reservas por<small color="red"> Oficinas</small>
          </h2>
          <hr />
        </Col>
      </Row>
      <DashboardOfficeBooking
        monthFilter={monthFilter}
        bookingsQuantityPerOffice={bookingsQuantityPerOffice}
        loadBookingsQuantityPerOffice={loadBookingsQuantityPerOffice}
        offices={offices}
      />
      <DashboardsMembershipComponent officeBranchId={officeBranchId} />

    </>
  }

  const render = () => {
    // if (isLoading)
    //   return <Row style={{display:"flex", justifyContent:"center"}}><Loading /></Row>
    if (permission.isForbidden && includes(permission.resources, REPORT_RESOURCE))
      return <Row style={{ justifyContent: "center" }}>
        <NotAccess message="No tienes acceso a los reportes de esta sucursal" />
      </Row>
    else
      return renderDashboard()
  }
  return (
    <>
      <div className="content">
        {render()}
      </div>
    </>
  );
}

export default Dashboard;
