import { setIsLoading } from "..";
import { setErrorAction } from "../notifications/writeNotificationActions";

export const SUCCESS_LOGOUT = 'SUCCESS_LOGOUT';

export const successLogout = () => (
  {
    type: SUCCESS_LOGOUT,
    payload: null,
  }
);

export const userLogout = () => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    dispatch(successLogout())
  } catch (error) {
    dispatch(setErrorAction(error));
  } finally {
    dispatch(setIsLoading(false));
  }
};
