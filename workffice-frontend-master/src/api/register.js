import { registerUser, activateUser, activatePass, activateCollab } from '../infra/api/authentication';

export const registerAPI = async credentials => {
  return Promise.resolve(registerUser(credentials));
};

export const activateUserAPI = async (confirmationToken) => {
  return Promise.resolve(activateUser(confirmationToken));
}

export const activateCollabAPI = async (confirmationToken) => {
  return Promise.resolve(activateCollab(confirmationToken));
}

export const activatePasswordAPI = async (confirmationToken, newPassword) => {
  return Promise.resolve(activatePass(confirmationToken, newPassword));
}
