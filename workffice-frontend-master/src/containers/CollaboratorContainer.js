import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Collaborators } from '../components/Collaborator/Collaborators';
import { NewCollaborator } from '../components/Collaborator/NewCollaborator';
import { readFromLocalStorage } from '../infra/api/localStorage';
import { createColaborator, deleteCollaborator, updateCollaborator } from '../stores/actions/backoffice/collaborator/collaboratorAction';
import { collaboratorsList } from '../stores/actions/backoffice/collaborator/collaboratorsAction';
import { collaboratorRolesList, rolesList } from '../stores/actions/backoffice/rolesAction';
import { hideNotificationAction } from '../stores/actions/notifications/writeNotificationActions';

export const CollaboratorContainer = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.isLoading);
  const notification = useSelector(state => state.notification);
  const hideNotification = useCallback(() => {
    dispatch(hideNotificationAction());
  }, [dispatch]);
  const officeBranch = readFromLocalStorage("officeBranch");
  const officeBranchRoles = useSelector(state => state.roles);
  const loadOfficeBranchRoles = useCallback(() => {
    dispatch(rolesList(officeBranch.id));
  }, [dispatch]);
  const onCreateColaborator = useCallback(collaboratorBody => {
    dispatch(createColaborator(officeBranch.id, collaboratorBody));
  }, [dispatch]);
  const permission = useSelector(state => state.permission)

  return <NewCollaborator
    createCollaborator={onCreateColaborator}
    officeBranchRoles={officeBranchRoles}
    loadOfficeBranchRoles={loadOfficeBranchRoles}
    loading={loading}
    notification={notification}
    hideNotification={hideNotification}
    permission={permission}
  />;
};


export const CollaboratorListContainer = () => {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.notification);
  const hideNotification = useCallback(async () => {
    await dispatch(hideNotificationAction());
  }, [dispatch]);
  const loadCollaborators = useCallback(async (officeBranchId) => {
    await dispatch(collaboratorsList(officeBranchId));
  }, [dispatch]);
  const collaborators = useSelector(state => state.collaborators);
  const officeBranchRoles = useSelector(state => state.roles);
  const loadOfficeBranchRoles = useCallback(async (officeBranchId) => {
    await dispatch(rolesList(officeBranchId));
  }, [dispatch]);
  const officeBranch = useSelector(() => readFromLocalStorage("officeBranch"));
  const loadCollaboratorRoles = useCallback(async collaboratorId => {
    await dispatch(collaboratorRolesList(collaboratorId));
  }, [dispatch]);
  const collaboratorRoles = useSelector(state => state.collaboratorRoles);
  const onUpdate = useCallback(async (collaboratorId, collaboratorBody) => {
    await dispatch(updateCollaborator(collaboratorId, collaboratorBody));
  }, [dispatch]);
  const permission = useSelector(state => state.permission)
  const loading = useSelector(state => state.loadingCollaborator)
  const deleteCollab = useCallback(async collaboratorId => {
    await dispatch(deleteCollaborator(collaboratorId));
  }, [dispatch]);
  return <Collaborators
    notification={notification}
    hideNotification={hideNotification}
    officeBranch={officeBranch}
    loadCollaborators={loadCollaborators}
    officeBranchRoles={officeBranchRoles}
    loadOfficeBranchRoles={loadOfficeBranchRoles}
    collaborators={collaborators}
    loadCollaboratorRoles={loadCollaboratorRoles}
    collaboratorRoles={collaboratorRoles}
    onUpdate={onUpdate}
    permission={permission}
    loading={loading}
    onDelete={deleteCollab}
  />
}