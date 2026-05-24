import { fetchCollaboratorsApi } from "../../../../api/backoffice/collaborator";
import { COLLABORATOR_RESOURCE, setForbiddenAccessAction, setSuccessAccess } from "../../errors/permissionActions";
import { loadingCollaboratorAction, stopLoadingCollaboratorAction } from "./loadingActions";

export const FETCH_COLLABORATORS = 'FETCH_COLLABORATORS';


export const fetchCollaboratorsList = collaborators => {
    return {
        type: FETCH_COLLABORATORS,
        payload: collaborators
    }
};

export const collaboratorsList = (officeBranchId) => async (dispatch) => {
    dispatch(loadingCollaboratorAction());
    try {
        dispatch(fetchCollaboratorsList(await fetchCollaboratorsApi(officeBranchId)));
        dispatch(setSuccessAccess(COLLABORATOR_RESOURCE))
    } catch (error) {
        if (error.code === "FORBIDDEN")
            dispatch(setForbiddenAccessAction(COLLABORATOR_RESOURCE))
    } finally {
        dispatch(stopLoadingCollaboratorAction());
    }
}