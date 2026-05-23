import { setIsLoading } from "../..";
import { createMembershipAPI, deleteAPI, getMembershipAPI, updateMembershipAPI } from "../../../../api/backoffice/memberhisp";
import { setErrorAction, setSuccessAction } from "../../notifications/writeNotificationActions";


export const CREATE_MEMBERSHIP = 'CREATE_MEMBERSHIP';
export const FETCH_ALL_MEMBERSHIP = 'FETCH_ALL_MEMBERSHIP';
export const UPDATE_MEMBERSHIP = 'UPDATE_MEMBERSHIP';
export const DELETE_MEMBERSHIP = 'DELETE_MEMBERSHIP';


export const createMembership = newData => {
    return {
        type: CREATE_MEMBERSHIP,
        payload: newData
    };
};

export const getMembership = membership => {
    return {
        type: FETCH_ALL_MEMBERSHIP,
        payload: membership
    };
};
export const updateMembership = membership => {
    return {
        type: UPDATE_MEMBERSHIP,
        payload: membership
    };
};
export const deleteMembership = membership => {
    return {
        type: DELETE_MEMBERSHIP,
        payload: membership
    };
};

export const createMember = (officeBranchId, membership) => async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
        dispatch(createMembership(await createMembershipAPI(officeBranchId, membership)));
        dispatch(setSuccessAction())
    } catch (error) {
        dispatch(setErrorAction(error));
    } finally {
        dispatch(setIsLoading(false));
    }
}

export const getAllMembership = (officeBranchId) => async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
        dispatch(getMembership(await getMembershipAPI(officeBranchId)));
        } catch (error) {
        dispatch(setErrorAction(error));
    } finally {
        dispatch(setIsLoading(false));
    }
}
export const updateMember = (membershipId, membership) => async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
        dispatch(updateMembership(await updateMembershipAPI(membershipId, membership)));
        dispatch(setSuccessAction())
    } catch (error) {
        dispatch(setErrorAction(error));
    } finally {
        dispatch(setIsLoading(false));
    }
}
export const deleteMember = (membershipId, branchId) => async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
        dispatch(deleteMembership(await deleteAPI(membershipId)));
        dispatch(getAllMembership(branchId));
        dispatch(setSuccessAction())
    } catch (error) {
        dispatch(setErrorAction(error));
    } finally {
        dispatch(setIsLoading(false));
    }
}
