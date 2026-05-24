import { setIsLoading } from "..";
import { setErrorAction, setSuccessAction } from "../notifications/writeNotificationActions";
import { updateUserApi, userMeAPI } from "../../../api/backoffice/users";


export const FETCH_ME = 'FETCH_ME';
export const UPDATE_USER = "UPDATE_USER"

export const fetchMe = (userMe) => {
    return {
        type: FETCH_ME,
        payload: userMe
    };
};

export const getUserMe = () => async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
        dispatch(fetchMe(await userMeAPI()));
    } catch (error) {
        dispatch(setErrorAction(error));
    }

}


export const updateUserAction = () => {
    return {
        type: UPDATE_USER,
        payload: null
    }
}

export const updateUser = (userId, userBody) => async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
        dispatch(updateUserAction(await updateUserApi(userId, userBody)));
        dispatch(setSuccessAction())
        dispatch(fetchMe(await userMeAPI()));
    } catch (error) {
        dispatch(setErrorAction(error));
    } finally {
        dispatch(setIsLoading(false));
    }
};
