import { headerGet, headersPost, sdkAuthRequest } from "..";
import { API_OFFICE_BRANCHES, API_URL } from "../../../environments/environment";

export const createMembershipInfra = async (officeBranchId, membership) => {
    try {
        const membershipCreated = await sdkAuthRequest(`${API_OFFICE_BRANCHES}/${officeBranchId}/memberships/`,
            {
                method: 'POST',
                headers: headersPost,
                body: JSON.stringify(membership)
            });

        return Promise.resolve(membershipCreated);
    } catch (error) {
        return Promise.reject(error.errors[0]);
    }
}

export const updateMembershipInfra = async (membershipId, membership) => {
    try {

        const membershipUpdated = await sdkAuthRequest(`${API_URL}/memberships/${membershipId}/`,
            {
                method: 'PUT',
                headers: headersPost,
                body: JSON.stringify(membership)
            });

        return Promise.resolve(membershipUpdated);
    } catch (error) {
        return Promise.reject(error.errors[0]);
    }
}
export const getMembershipInfra = async (officeBranchId) => {
    try {

        const allNews = await sdkAuthRequest(`${API_OFFICE_BRANCHES}/${officeBranchId}/memberships/`,
            {
                method: 'GET',
                headers: headerGet,
            });

        return Promise.resolve(allNews);
    } catch (error) {
        return Promise.reject(error.errors[0]);
    }
}
export const deleteMembershipInfra = async (membershipId) => {
    try {
        const membershipDeleted = await sdkAuthRequest(`${API_URL}/memberships/${membershipId}/`,
            {
                method: 'DELETE',
                headers: headerGet,
            });

        return Promise.resolve(membershipDeleted);
    } catch (error) {
        return Promise.reject(error.errors[0]);
    }
}