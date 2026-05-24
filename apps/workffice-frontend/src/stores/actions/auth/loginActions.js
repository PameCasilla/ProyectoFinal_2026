import { setIsLoading } from '..';
import { loginAPI } from '../../../api/login';
import { getUserMe } from '../backoffice/userActions';
import { setErrorAction } from "../notifications/writeNotificationActions";

export const FETCH_LOGIN = 'FETCH_LOGIN';

export const fetchLogin = (credentials) => (
  {
    type: FETCH_LOGIN,
    payload: credentials,
  }
);

export const userLogin = (credentials) => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    dispatch(fetchLogin(await loginAPI(credentials)));
    dispatch(getUserMe());
  } catch (error) {
    dispatch(setErrorAction(error));
  } finally {
    dispatch(setIsLoading(false));
  }
};
