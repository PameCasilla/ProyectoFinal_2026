import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readFromLocalStorage } from '../infra/api/localStorage';
import { hideNotificationAction } from '../stores/actions/notifications/writeNotificationActions';
import { collaboratorsList } from '../stores/actions/backoffice/collaborator/collaboratorsAction';
import { updateUser } from '../stores/actions/backoffice/userActions';
import UserProfile from '../views/pages/backoffice/UserProfile';

export const UserProfileContainer = () => {
    const dispatch = useDispatch()
    const userMe = useSelector(state => state.userMe)
    const notification = useSelector(state => state.notification)
    const hideNotification = useCallback(async () => {
        await dispatch(hideNotificationAction())
    }, [dispatch])
    const branch = useSelector(() => readFromLocalStorage("officeBranch"));
    const loadCollaborators = useCallback(async officeBranchId => {
        await dispatch(collaboratorsList(officeBranchId))
    }, [dispatch])
    const collaborators = useSelector(state => state.collaborators);
    const onUpdate = useCallback((id, userData) => {
        dispatch(updateUser(id, userData));
    }, [dispatch]);
    const permission = useSelector(state => state.permission);

    return <UserProfile
        notification={notification}
        hideNotification={hideNotification}
        officeBranch={branch}
        collaborators={collaborators}
        loadCollaborators={loadCollaborators}
        userMe={userMe}
        onUpdate={userData => onUpdate(userMe.id, userData)}
        permission={permission}
    />;
};
