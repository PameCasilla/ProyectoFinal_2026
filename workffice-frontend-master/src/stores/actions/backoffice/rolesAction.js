import { setIsLoading } from "..";
import { setErrorAction, setSuccessAction } from "../notifications/writeNotificationActions";
import { createRoleApi, deleteRoleApi, fetchRolesApi, fetchRolesFromCollaboratorApi } from "../../../api/backoffice/roles";
import { ROLE_RESOURCE, setForbiddenAccessAction, setSuccessAccess } from "../errors/permissionActions";

export const CREATE_ROLE = 'CREATE_ROLE';
export const DELETE_ROLE = 'DELETE_ROLE';
export const FETCH_ROLES = 'FETCH_ROLES';
export const FETCH_COLLABORATOR_ROLES = 'FETCH_COLLABORATOR_ROLES';


export const createRoleAction = response => {
    return {
        type: CREATE_ROLE,
        payload: response
    }
};

export const createRole = (officeBranchId, roleBody) => async dispatch => {
    dispatch(setIsLoading(true));
    try {
        dispatch(createRoleAction(await createRoleApi(officeBranchId, roleBody)));
        dispatch(setSuccessAction())
    } catch (error) {
        dispatch(setErrorAction(error));
    } finally {
        dispatch(setIsLoading(false));
    }
}

export const deleteRoleAction = roleIdDeleted => {
    return {
        type: DELETE_ROLE,
        payload: roleIdDeleted
    }
};

export const deleteRole = roleId => async dispatch => {
    dispatch(setIsLoading(true));
    try {
        dispatch(deleteRoleAction(await deleteRoleApi(roleId)));
        dispatch(setSuccessAction())
    } catch (error) {
        dispatch(setErrorAction(error));
    } finally {
        dispatch(setIsLoading(false));
    }
}

export const fetchRolesList = roles => {
    return {
        type: FETCH_ROLES,
        payload: roles
    }
};

export const rolesList = (officeBranchId) => async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
        dispatch(fetchRolesList(await fetchRolesApi(officeBranchId)));
        dispatch(setSuccessAccess(ROLE_RESOURCE))
    } catch (error) {
        if (error.code === "FORBIDDEN")
            dispatch(setForbiddenAccessAction(ROLE_RESOURCE));
    } finally {
        dispatch(setIsLoading(false));
    }

}

export const fetchCollaboratorRolesList = collaboratorRoles => {
    return {
        type: FETCH_COLLABORATOR_ROLES,
        payload: collaboratorRoles,
    }
};

export const collaboratorRolesList = collaboratorId => async dispatch => {
    dispatch(setIsLoading(true));
    try {
        dispatch(fetchCollaboratorRolesList(await fetchRolesFromCollaboratorApi(collaboratorId)));
    } catch (error) {
        if (error.code === "FORBIDDEN")
            dispatch(setForbiddenAccessAction(ROLE_RESOURCE));
    } finally {
        dispatch(setIsLoading(false));
    }
}
