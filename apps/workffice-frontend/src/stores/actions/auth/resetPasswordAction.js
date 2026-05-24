import { setIsLoading } from "..";
import { resetUserPass } from "../../../infra/api/authentication";
import { setErrorAction, setSuccessAction } from "../notifications/writeNotificationActions";


export const FETCH_RESET = 'FETCH_RESET';

export const fetchReset = password => {
    return {
        type: FETCH_RESET,
        payload: password
    }
};

export const resetPassword = (token, password) => async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
        dispatch(fetchReset(await resetUserPass(token, password)));
        dispatch(setSuccessAction())
    } catch (error) {
        dispatch(setErrorAction(error));
    } finally {
        dispatch(setIsLoading(false));
    }
}