import { includes } from 'lodash-es';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { ROLE_RESOURCE } from '../../stores/actions/errors/permissionActions';
import { getErrorMessage, ROLE_FORBIDDEN_MESSAGE } from '../../utils/rolesTranslation';
import { EmptyComponent } from '../Common/Empty/EmptyComponent';
import { NotAccess } from '../Common/ErrorPages/NotAccess';
import { Notification } from '../Common/Notification/Notification';
import { RoleCard } from './RoleCard';

export const RoleListComponent = ({
  permission,
  roles,
  fetchRoles,
  deleteRole,
  notification,
  hideNotification,
}) => {

  React.useEffect(() => { fetchRoles() }, [roles ? roles.length : 0])
  React.useEffect(() => {
    if (notification.show)
      setTimeout(() => {
        hideNotification()
      }, 2500)
  }, [notification.show])

  const renderRoles = () => {
    if (permission.isForbidden && includes(permission.resources, ROLE_RESOURCE))
      return <NotAccess message={ROLE_FORBIDDEN_MESSAGE} />
    return roles !== undefined && roles.length !== 0 ? roles.map((role) => {
      return <Col key={role.id} xs="10" md="4" lg="4" xg="4">
        <RoleCard {...role} onDelete={() => deleteRole(role.id)} />
      </Col>
    }) : <EmptyComponent />
  }
  return (
    <div className="content">
      <Notification
        show={notification.show && notification.isError}
        message={getErrorMessage(notification.errorCode) || ""}
        hideNotification={hideNotification}
        isError={true}
      />
      <Row style={{ display: 'grid', paddingTop: 40 }}>
        <Col xs="12" md="12" lg="12" xg="12">
          <h1>
            Gestionar <small color="red">roles</small>
          </h1>
          <hr />
        </Col>
      </Row>
      <Notification
        show={notification.show && notification.isSuccess}
        message="El rol se elimino correctamente"
        hideNotification={hideNotification}
      />
      <Row>
        <Col
          xs="6"
          md="6"
          lg="12"
          xg="12"
          style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Button className="btn-round" color="primary">
            <Link to="/admin/new-rol" style={{ color: 'white', textDecoration: 'none' }}>
              {' '}
              <i className="fa fa-plus" /> Nuevo rol
            </Link>
          </Button>
        </Col>
      </Row>
      <Row style={{ justifyContent: 'center' }}>
        {renderRoles()}
      </Row>
    </div >
  );
}