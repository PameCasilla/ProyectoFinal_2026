import { loginUser } from '../infra/api/authentication';

export const loginAPI = async credentials => {
  return Promise.resolve(loginUser(credentials));
};
