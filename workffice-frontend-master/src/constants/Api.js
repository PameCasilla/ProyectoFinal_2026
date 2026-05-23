import { API_AUTH_URL } from '../environment/environment';

export const HTTP_METHODS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete',
};

export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
};

export const AUTH_ENDPOINTS = {
  CREATE: '/create',
  LOGIN: '/login',
  CHANGE_PASSWORD: '/change-password',
  RECOVER_PASSWORD: '/reset-password',
  LOGOUT: '/logout',
};

export const USER_ENDPOINTS = {
  USER_PATH: '/users/me',
};

export const AUTH_CREATE_URL = `${API_AUTH_URL}`;
// export const AUTH_LOGIN_URL = `${API_AUTHENTICATIONS_URL}${AUTH_ENDPOINTS.LOGIN}`;
// export const AUTH_CHANGE_PASSWORD_URL = `${API_AUTH_URL}${AUTH_ENDPOINTS.CHANGE_PASSWORD}`;
// export const AUTH_RECOVER_PASSWORD_URL = `${API_AUTH_URL}${AUTH_ENDPOINTS.RECOVER_PASSWORD}`;
// export const AUTH_LOGOUT_URL = `${API_AUTHENTICATIONS_URL}${AUTH_ENDPOINTS.LOGOUT}`; //falta ver lo del token
