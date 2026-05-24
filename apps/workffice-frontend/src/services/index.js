import axios from 'axios';
import { getUserToken } from '../utils';

async function createConfig(
  method,
  path,
  body,
  additionalHeaders = undefined,
  requiredAuth = true
) {
  let authHeaders = {};
  const accessToken = await getUserToken();
  if (requiredAuth) {
    authHeaders = {
      Authorization: `Bearer ${accessToken}`,
    };
  }

  let headers = {
    'Content-Type': 'application/json',
    ...authHeaders,
  };
  if (additionalHeaders) {
    headers = {
      ...headers,
      ...additionalHeaders,
    };
  }

  let config = {
    method,
    url: path,
    headers,
  };

  if (body) {
    if (method === 'get') {
      config = {
        ...config,
        params: body,
      };
    } else {
      config = {
        ...config,
        data: body,
      };
    }
  }

  return config;
}

async function callApi(method, path, body, additionalHeaders = undefined) {
  const config = await createConfig(method, path, body, additionalHeaders);
  return axios(config);
}

export default callApi;
