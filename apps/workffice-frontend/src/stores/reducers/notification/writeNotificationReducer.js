import { HIDE_NOTIFICATION, SET_ERROR, SET_SUCCESS } from "../../actions/notifications/writeNotificationActions";

const notificationInitialState = {
    message: null,
    isSuccess: false,
    isError: false,
    show: false,
    errorCode: null,
}
export const notificationReducer = (state = notificationInitialState, { type, payload }) => {
    switch (type) {
        case SET_SUCCESS:
            return {
                message: payload.message ? payload.message : null,
                errorCode: null,
                isSuccess: true,
                isError: false,
                show: true,
            }
        case SET_ERROR:
            return {
                message: payload.message ? payload.message : null,
                errorCode: payload.error ? payload.error : null,
                isSuccess: false,
                isError: true,
                show: true,
            }
        case HIDE_NOTIFICATION:
            return {
                message: null,
                errorCode: null,
                isSuccess: false,
                isError: false,
                show: false
            }
        default:
            return state
    }
};
