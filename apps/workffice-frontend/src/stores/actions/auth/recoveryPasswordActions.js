
import { setIsLoading } from '..';
import { recoveryPasswordAPI } from '../../../api/recoveryPassword';
import { setErrorAction, setSuccessAction } from "../notifications/writeNotificationActions";

export const FETCH_RECOVERY = 'FETCH_RECOVERY';

export const fetchRecovery = (userEmail) => {
    return {
        type: FETCH_RECOVERY,
        payload: userEmail ? userEmail : true
    }
};

export const recovery = (userEmail) => async (dispatch) => {
    dispatch(setIsLoading(true));

    try {
        dispatch(fetchRecovery(await recoveryPasswordAPI(userEmail)))
        dispatch(setSuccessAction())
    } catch (error) {
        dispatch(setErrorAction(error));
    } finally {
        dispatch(setIsLoading(false));
    }
};

