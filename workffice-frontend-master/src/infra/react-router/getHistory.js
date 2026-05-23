import { createBrowserHistory } from 'history';

/**
 * Provides an environment appropriate history management object for react-router
 */
export const getHistory = () => createBrowserHistory();
