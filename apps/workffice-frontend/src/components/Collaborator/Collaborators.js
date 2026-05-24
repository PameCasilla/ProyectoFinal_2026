import { includes } from 'lodash-es';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { COLLABORATOR_RESOURCE } from '../../stores/actions/errors/permissionActions';
import { ACCESS_TYPE_READ, COLLABORATOR_FORBIDDEN_MESSAGE, getErrorMessage } from '../../utils/collaboratorTranslations';
import { EmptyComponent } from '../Common/Empty/EmptyComponent';
import { NotAccess } from '../Common/ErrorPages/NotAccess';
import { Loading } from '../Common/Loading/Loading';
import { Notification } from '../Common/Notification/Notification';
import { CollaboratorCard } from './CollaboratorCard';

export const Collaborators = ({
  notification,
  hideNotification,
  collaborators,
  collaboratorRoles,
  officeBranchRoles,
  loadCollaborators,
  loadCollaboratorRoles,
  loadOfficeBranchRoles,
  onUpdate,
  officeBranch,
  permission,
  loading,
  onDelete
}) => {

  React.useEffect(() => {
    loadCollaborators(officeBranch.id);
    loadOfficeBranchRoles(officeBranch.id);
  }, [officeBranch ? officeBranch.id : "", collaborators ? collaborators.length : 0])

  React.useEffect(() => {
    if (notification.show)
      setTimeout(() => {
        hideNotification()
      }, 2500)
  }, [notification.show])

  const renderCollaborators = () => {
    if (loading)
      return <Loading />
    if (permission.isForbidden && includes(permission.resources, COLLABORATOR_RESOURCE))
      return <NotAccess message={COLLABORATOR_FORBIDDEN_MESSAGE} />
    else {
      return collaborators && collaborators.length !== 0 ? collaborators.map(collaborator => {
        return <Col key={collaborator.id} xs="10" md="4" lg="4" xg="4">
          <CollaboratorCard
            {...collaborator}
            officeBranchRoles={officeBranchRoles}
            loadCollaboratorRoles={loadCollaboratorRoles}
            collaboratorRoles={collaboratorRoles ? collaboratorRoles[collaborator.id] : []}
            updateCollaborator={onUpdate}
            permission={permission}
            onDelete={() => onDelete(collaborator.id)}
          />
        </Col>
      }) : <EmptyComponent />
    }
  }

  return (
    <div className="content">
      <Row style={{ display: 'grid', paddingTop: 40 }}>
        <Col xs="12" md="12" lg="12" xg="12">
          <h1>
            Mis <small color="red">Colaboradores</small>
          </h1>
          <hr />
        </Col>
      </Row>
      <Row style={{ justifyContent: 'center' }}>
        <Col
          xs="6"
          md="6"
          lg="12"
          xg="12"
          style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Button className="btn-round" color="primary" size="medium" >
            <Link to='/admin/new-collaborator' style={{ color: 'white', textDecoration: 'none' }}>
              <i className="fa fa-plus" /> Nuevo Colaborador
            </Link>
          </Button>
        </Col>
      </Row>
      <Notification
        show={notification.show && notification.isError}
        isError={true}
        message={getErrorMessage(notification.errorCode, ACCESS_TYPE_READ)}
        hideNotification={hideNotification}
      />
      <Notification
        show={notification.show && notification.isSuccess}
        message="El colaborador se actualizo correctamente"
        hideNotification={hideNotification}
      />
      <Row style={{ justifyContent: 'center' }}>
        {renderCollaborators()}
      </Row>
    </div>
  )
};
