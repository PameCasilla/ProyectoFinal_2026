import { setIsLoading } from '..';
import { registerAPI } from '../../../api/register';
import { setErrorAction } from '../notifications/writeNotificationActions';

export const FETCH_REGISTER = 'FETCH_REGISTER';

export const fetchRegister = credentials => ({
  type: FETCH_REGISTER,
  payload: credentials ? credentials : null,
});

export const register = (credentials) => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    dispatch(fetchRegister(await registerAPI(credentials)));
  } catch (error) {
    dispatch(setErrorAction(error));
  } finally {
    dispatch(setIsLoading(false));
  }
};
