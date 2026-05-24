import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { EmptyComponent } from '../Common/Empty/EmptyComponent';
import { MembershipComponent } from './MembershipComponent';

export const MembershipListComponent = props => {
  const { memberships, loadMemberships, officeBranch, hideNotification, deleteMembership } = props;
  React.useEffect(() => {
    if (officeBranch)
      loadMemberships(officeBranch.id);
  }, [])

  React.useEffect(() => {
    setTimeout(() => {
      hideNotification()
    }, 0)
  }, []);

  return (
    <div className="content">
      <Row style={{ display: 'grid', paddingTop: 40 }}>
        <Col xs="12" md="12" lg="12" xg="12">
          <h1>
            Gestionar <small color="red">membresías</small>
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
            <Link to="/admin/new-membership" style={{ color: 'white', textDecoration: 'none' }}>
              {' '}
              <i className="fa fa-plus" /> Nueva membresía
            </Link>
          </Button>
        </Col>
      </Row>

      <Row style={{ justifyContent: 'center' }}>
        {memberships ? memberships.map((membership) => {
          return <Col xs="10" md="4" lg="4" xg="4">
            <MembershipComponent
              displayEditButton
              displayDeleteButton
              deleteMembership={deleteMembership}
              membership={membership}
            />
          </Col>
        }) : <EmptyComponent />

        }


      </Row>
    </div >
  );
}