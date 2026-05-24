import { AUTH_TOKEN, readFromLocalStorage, USER_TYPE } from '../infra/api/localStorage';

export const getOneErrors = errors => {
  if (Array.isArray(errors) && errors.length > 0) {
    return errors[0];
  }
  return errors;
};

export const getUserToken = () => {
  return readFromLocalStorage(AUTH_TOKEN) ? readFromLocalStorage(AUTH_TOKEN).accessToken : readFromLocalStorage(AUTH_TOKEN);
}

export const isSessionValid = () => {
  const authType = isUserLoggedin(getUserToken());
  return authType;
};

export const isUserLoggedin = authData => {
  if (!authData) {
    return false;
  }
  return 'OK';
};

export const logout = ()=>{
  return 
}

export const isAuthorizedUser = ()=>{
  return readFromLocalStorage(USER_TYPE);
}
