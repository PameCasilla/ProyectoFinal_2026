import { officeBranchListAPI, officeBranchListFromCollaboratorAPI } from "../../../../api/backoffice/officeBranch";
import { setErrorAction } from "../../notifications/writeNotificationActions";
import { loadingOfficeBranchAction, stopLoadingOfficeBranchAction } from "./loadingActions";

export const FETCH_OFFICEBRANCHES_LIST = 'FETCH_OFFICEBRANCHES_LIST';
export const FETCH_COLLABORATOR_OFFICE_BRANCHES = 'FETCH_COLLABORATOR_OFFICE_BRANCHES';


export const fetchOfficeBranchesList = officeBranches => {
    return {
        type: FETCH_OFFICEBRANCHES_LIST,
        payload: officeBranches,
    }
};

export const officeBranchList = (userId) => async (dispatch) => {
    dispatch(loadingOfficeBranchAction())
    try {
        dispatch(fetchOfficeBranchesList(await officeBranchListAPI(userId)));
    } catch (error) {
        if (error.code == "NOT_FOUND")
            dispatch(fetchOfficeBranchesList([]));
    } finally {
        dispatch(stopLoadingOfficeBranchAction())
    }
}

export const fetchCollaboratorOfficeBranches = officeBranches => {
    return {
        type: FETCH_COLLABORATOR_OFFICE_BRANCHES,
        payload: officeBranches
    }
};

export const collaboratorOfficeBranchList = collaboratorEmail => async (dispatch) => {
    try {
        dispatch(fetchCollaboratorOfficeBranches(await officeBranchListFromCollaboratorAPI(collaboratorEmail)));
    } catch (error) {
        dispatch(setErrorAction(error));
    }
}
