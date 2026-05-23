import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NewRole } from '../../components/Role/NewRole';
import { RoleListComponent } from '../../components/Role/RoleListComponent';
import { readFromLocalStorage } from '../../infra/api/localStorage';
import { hideNotificationAction } from '../../stores/actions/notifications/writeNotificationActions';
import { createRole, deleteRole as deleteRoleAction, rolesList } from '../../stores/actions/backoffice/rolesAction';

export const NewRoleContainer = () => {
    const dispatch = useDispatch()
    const officeBranch = readFromLocalStorage("officeBranch")
    const create = useCallback(async roleBody => {
        await dispatch(createRole(officeBranch.id, roleBody))
    }, [dispatch])
    const notification = useSelector(state => state.notification)
    const hideNotification = useCallback(async () => {
        await dispatch(hideNotificationAction())
    }, [dispatch])
    return <NewRole
        notification={notification}
        hideNotification={hideNotification}
        createRole={create}
    />
}

export const RolesListContainer = () => {
    const dispatch = useDispatch();
    const officeBranch = readFromLocalStorage("officeBranch")
    const roles = useSelector(state => state.roles)
    const deleteRole = useCallback(async roleId => {
        await dispatch(deleteRoleAction(roleId))
    }, [dispatch])
    const fetchRoles = useCallback(async () => {
        await dispatch(rolesList(officeBranch.id))
    }, [dispatch])
    const permission = useSelector(state => state.permission)
    const notification = useSelector(state => state.notification)
    const hideNotification = useCallback(async () => {
        await dispatch(hideNotificationAction(officeBranch.id))
    }, [dispatch])
    return <RoleListComponent
        fetchRoles={fetchRoles}
        roles={roles}
        permission={permission}
        deleteRole={deleteRole}
        notification={notification}
        hideNotification={hideNotification}
    />
}
