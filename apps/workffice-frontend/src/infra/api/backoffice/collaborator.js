import { headerGet, headersPost, sdkAuthRequest } from "..";
import { API_OFFICE_BRANCHES, API_URL } from "../../../environments/environment";

export const createCollaborator = async (officeBranchId, collaboratorBody) => {
  try {
    const newColaborator = await sdkAuthRequest(`${API_OFFICE_BRANCHES}/${officeBranchId}/collaborators/`, {
      method: 'POST',
      headers: headersPost,
      body: JSON.stringify(collaboratorBody)
    });
    return Promise.resolve(newColaborator);
  } catch (error) {
    return Promise.reject(error.errors[0]);
  }
};

export const fetchCollaborators = async officeBranchId => {
  try {
    const collaborators = await sdkAuthRequest(`${API_OFFICE_BRANCHES}/${officeBranchId}/collaborators/`, {
      method: 'GET',
      headers: headerGet,
    });
    return Promise.resolve(collaborators.data);
  } catch (error) {
    return Promise.reject(error.errors[0]);
  }
}

export const updateCollaborator = async (collaboratorId, collaboratorBody) => {
  try {
    const response = await sdkAuthRequest(`${API_URL}/collaborators/${collaboratorId}/`, {
      method: 'PUT',
      headers: headersPost,
      body: JSON.stringify(collaboratorBody),
    });
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error.errors[0]);
  }
}


export const deleteCollaborator = async collaboratorId => {
  try {
    const response = await sdkAuthRequest(`${API_URL}/collaborators/${collaboratorId}/`, {
      method: 'DELETE',
      headers: headersPost,
    });
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error.errors[0]);
  }
}
