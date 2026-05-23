const BASE_URL = process.env.REACT_APP_SERVER_HOST;
const API = '/api';
const API_USERS = '/users';
const API_AUTHENTICATIONS = '/authentications';
const API_TOKENS = '/confirmation_tokens'
const OFFICE_HOLDER = '/office_holders';
const OFFICE_BRANCH_REPORTS = '/office_branch_reports'


export const API_URL = `${BASE_URL}${API}`;
export const API_AUTH_URL = `${API_URL}${API_USERS}`;
export const API_AUTHENTICATIONS_URL = `${API_URL}${API_AUTHENTICATIONS}`;
export const API_CONFIRMATION_TOKEN_URL = `${API_URL}${API_TOKENS}`;

// BACKOFFICE
export const API_OFFICE_HOLDERS = `${API_URL}${OFFICE_HOLDER}`

export const API_OFFICE_BRANCHES = `${API_URL}/office_branches`;
export const API_OFFICE_BRANCHES_REPORTS = `${API_URL}${OFFICE_BRANCH_REPORTS}`;
