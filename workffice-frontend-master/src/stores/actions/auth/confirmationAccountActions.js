import { setIsLoading } from "..";
import { activateCollabAPI, activateUserAPI } from "../../../api/register";
import { setErrorAction } from "../notifications/writeNotificationActions";


export const FETCH_CONFIRM_ACCOUNT = 'FETCH_CONFIRM_ACCOUNT';
export const FETCH_CONFIRM_COLLAB = 'FETCH_CONFIRM_COLLAB';

export const fetchConfirmationAccount = (confirmationToken) => {
    return {
        type: FETCH_CONFIRM_ACCOUNT,
        payload: confirmationToken
    }
}
export const fetchConfirmationCollab = (confirmationToken) => {
    return {
        type: FETCH_CONFIRM_COLLAB,
        payload: confirmationToken
    }
}

export const confirmation = (confirmationToken) => async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
        dispatch(fetchConfirmationAccount(await activateUserAPI(confirmationToken)));
    } catch (error) {
        dispatch(setErrorAction(error));
    } finally {
        dispatch(setIsLoading(false));
    }
};
export const confirmationCollab = (confirmationToken) => async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
        dispatch(fetchConfirmationAccount(await activateCollabAPI(confirmationToken)));
    } catch (error) {
        dispatch(setErrorAction(error));
    } finally {
        dispatch(setIsLoading(false));
    }
};
