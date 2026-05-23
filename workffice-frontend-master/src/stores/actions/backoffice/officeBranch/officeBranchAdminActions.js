import { setIsLoading } from "../../";
import { setErrorAction, setSuccessAction } from "../../notifications/writeNotificationActions";
import { createOfficeBranchAPI, deleteOfficeBranchAPI, editOfficeBranchAPI, getOfficeBranchIdAPI } from "../../../../api/backoffice/officeBranch";
import { readFromLocalStorage, writeToLocalStorage } from "../../../../infra/api/localStorage";


export const CREATE_OFFICE_BRANCH = 'FETCH_CREATE_OFFICEBRANCH';
export const FETCH_EDIT_OFFICEBRANCH = 'FETCH_EDIT_OFFICEBRANCH';
export const FETCH_OFFICEBRANCH_ID = 'FETCH_OFFICEBRANCH_ID';
export const CLEAN_OFFICE_BRANCH = 'CLEAN_OFFICE_BRANCH';
export const DELETE_OFFICE_BRANCH = 'DELETE_OFFICE_BRANCH';


export const cleanOfficeBranchAction = () => ({
    type: CLEAN_OFFICE_BRANCH,
})

export const fetchCreateOfficebranch = officeBranchData => {
    return {
        type: CREATE_OFFICE_BRANCH,
        payload: officeBranchData
    }
};

export const createOfficeBranch = (officeBranchData, userId) => async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
        dispatch(fetchCreateOfficebranch(await createOfficeBranchAPI(officeBranchData, userId)));
        dispatch(setSuccessAction())
    } catch (error) {
        dispatch(setErrorAction(error));
    } finally {
        dispatch(setIsLoading(false));
    }

}

export const fetchEditOfficebranch = officeBranchData => {
    return {
        type: FETCH_EDIT_OFFICEBRANCH,
        payload: officeBranchData
    }
};

export const editOfficeBranch = (userId, officeBranchData) => async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
        dispatch(fetchEditOfficebranch(await editOfficeBranchAPI(officeBranchData, userId)));
        dispatch(fetchOfficebranchId(await getOfficeBranchIdAPI(readFromLocalStorage("officeBranch").id)));
        dispatch(setSuccessAction())
    } catch (error) {
        dispatch(setErrorAction(error));
    } finally {
        dispatch(setIsLoading(false));
    }
}

export const fetchOfficebranchId = officeBranch => {
    return {
        type: FETCH_OFFICEBRANCH_ID,
        payload: officeBranch
    }
};

export const getOfficeBranch = id => async dispatch => {
    dispatch(setIsLoading(true));
    try {
        const officeBranchResponse = await getOfficeBranchIdAPI(id)
        await dispatch(fetchOfficebranchId(officeBranchResponse))
        writeToLocalStorage(officeBranchResponse, "officeBranch")
    } catch (error) {
        dispatch(setErrorAction(error));
    } finally {
        dispatch(setIsLoading(false));
    }
}
export const deleteOB = officeBranchId => {
    return {
        type: DELETE_OFFICE_BRANCH,
        payload: officeBranchId
    }
};

export const deleteOfficeBranch = id => async dispatch => {
    dispatch(setIsLoading(true));
    try {
        dispatch(deleteOB(await deleteOfficeBranchAPI(id)))
        dispatch(setSuccessAction())
    } catch (error) {
        dispatch(setErrorAction(error));
    } finally {
        dispatch(setIsLoading(false));
    }
}
