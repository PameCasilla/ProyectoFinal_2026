import {
  API_AUTHENTICATIONS_URL,
  API_AUTH_URL,
  API_CONFIRMATION_TOKEN_URL,
} from '../../environments/environment';
import { getUserToken, isUserLoggedin } from '../../utils';
import { storeAccessToken } from './localStorage';
import { headersPost, sdkNoAuthRequest } from './index';

const authRequestOkAction = (userToken, options) =>
  Promise.resolve({
    ...(options ? options : {}),
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${userToken}`,
    },
  });

const authRequestRefreshAction = async ({ refreshToken }, options) => {
  try {
    const rawAccessToken = await sdkNoAuthRequest(
      `${API_AUTHENTICATIONS_URL}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: `refresh_token=${refreshToken}`,
      }
    );
    return authRequestOkAction(storeAccessToken(rawAccessToken), options);
  } catch {
    throw new Error('Not able to refresh the token');
  }
};

const authRequestAction = {
  ['OK']: authRequestOkAction,
  ['REFRESH']: authRequestRefreshAction,
  default: () => {
    throw new Error('Need to login');
  },
};

/**
 * This method is used to check if the user is LS user token is valid & refresh the token if it is necessary
 * @param options any
 */
export const authenticatedRequest = async options => {
  const userToken = getUserToken();
  return (
    authRequestAction[isUserLoggedin(userToken)]
  )(userToken, options);
};

/**
 * Login an user and store its token data in LS
 * @param credentials  username & passowrd
 */
export const loginUser = async (credentials) => {
  const userToken = getUserToken();
  if (userToken && isUserLoggedin(userToken) === 'OK') {
    return Promise.resolve(userToken);
  }

  try {
    const rawAccessToken = await sdkNoAuthRequest(
      `${API_AUTHENTICATIONS_URL}/`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json; charset=utf8',
        },
        body: JSON.stringify(credentials)
      }
    );

    return Promise.resolve(storeAccessToken(rawAccessToken));
  } catch (error) {
    return Promise.reject(error.errors[0]);
  }
};
/**
 * Register an user
 * @param credentials  username , passowrd & type ('OFFICE_HOLDER | RENTER')
 */
export const registerUser = async (credentials) => {
  try {
    const response = await sdkNoAuthRequest(`${API_AUTH_URL}/`, {
      method: 'POST',
      headers: headersPost,
      body: JSON.stringify(credentials)
    });
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(new Error(error.errors[0].error));
  }
};

export const recoveryPassword = async (userEmail) => {
  try {
    const response = await sdkNoAuthRequest(`${API_AUTH_URL}/password_reset_requests/`, {
      method: 'POST',
      headers: headersPost,
      body: JSON.stringify(userEmail)
    });
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error.errors[0]);
  }
}

export const resetUserPass = async (token, password) => {
  try {
    const result = await sdkNoAuthRequest(`${API_CONFIRMATION_TOKEN_URL}/password_resets/${token}/`, {
      method: 'POST',
      headers: headersPost,
      body: JSON.stringify(password)
    });
    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(error.errors[0]);
  }
}

export const activateUser = async (token) => {
  try {
    await sdkNoAuthRequest(`${API_CONFIRMATION_TOKEN_URL}/account_activations/${token}/`, {
      method: 'POST',
      headers: headersPost
    });
    return Promise.resolve(true);
  } catch (error) {
    return Promise.reject(new Error(error.errors[0].error));
  }
}
export const activatePass = async (token, newPassword) => {
  try {
    await sdkNoAuthRequest(`${API_CONFIRMATION_TOKEN_URL}/password_resets/${token}/`, {
      method: 'POST',
      headers: headersPost,
      body: JSON.stringify(newPassword)
    });
    return Promise.resolve(true);
  } catch (error) {
    return Promise.reject(new Error(error.errors[0].error));
  }
}


export const activateCollab = async (token) => {
  try {
    await sdkNoAuthRequest(`${API_CONFIRMATION_TOKEN_URL}/collaborator_activations/${token}/`, {
      method: 'POST',
      headers: headersPost
    });
    return Promise.resolve(true);
  } catch (error) {
    return Promise.reject(new Error(error.errors[0].error));
  }
}