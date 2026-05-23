import { formatUrl } from 'url-lib';

/**
 * Replaces the specified history object with the specified request parameters
 * (particularly useful for initial server rendering)
 * @param {import("history").History} routerHistory The history object
 * @param {{path: string, params: object}} params
 */
export const updateHistory = (routerHistory, { path, params }) => {
  routerHistory.replace(formatUrl(path, params));
};
