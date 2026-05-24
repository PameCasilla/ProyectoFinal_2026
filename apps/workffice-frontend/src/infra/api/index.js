import { authenticatedRequest } from './authentication';

export const headersPost = {
  'Accept': 'application/json, text/plain, */*',
  'Content-Type': 'application/json; charset=utf8',
};

export const headerGet = {
  'Accept': 'application/json, text/plain, */*',
  'Content-Type': 'application/json; charset=utf8',
};

/**
 * Generic request handler
 *
 * @param requestUrl string url for request the api endpoint
 * @param options options for specify the request parameters
 * @returns the resolved promise of the request in json format
 * @throws Generic error
 */
const sdkRequest = async (
  requestUrl,
  options
) => {
  let response;
  try {
    response = await (options ? fetch(requestUrl, options) : fetch(requestUrl));

    const result = await response.json();
    if (!response.ok) {
      return Promise.reject(result);
    }
    return result;
  } catch {
    return Promise.reject(new Error('API Error'));
  }
};

export const sdkNoAuthRequest = sdkRequest;

export const sdkAuthRequest = async (requestUrl, options) =>
  sdkRequest(requestUrl, await authenticatedRequest(options));
