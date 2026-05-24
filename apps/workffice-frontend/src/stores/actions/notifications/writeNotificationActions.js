export const SET_ERROR = 'SET_ERROR';
export const SET_SUCCESS = 'SET_SUCCESS';
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';


export const setErrorAction = error => ({
    type: SET_ERROR,
    payload: error,
});

export const setSuccessAction = () => ({
    type: SET_SUCCESS,
    payload: {},
});

export const hideNotificationAction = () => ({
    type: HIDE_NOTIFICATION,
    payload: null,
});
