import { headerGet, headersPost, sdkAuthRequest } from "..";
import { API_URL } from "../../../environments/environment";

export const acquireMembership = async membershipId => {
    try {
        const membershipAcquired = await sdkAuthRequest(`${API_URL}/memberships/${membershipId}/acquisitions/`, {
            method: 'POST',
            headers: headersPost,
        });
        return Promise.resolve(membershipAcquired.data.uri.match("/api/membership_acquisitions/(.*)/")[1]);
    } catch (error) {
        return Promise.reject(error.errors[0]);
    }
};


export const getMembershipAcquisitions = async () => {
    try {
        const membershipAcquisitions = await sdkAuthRequest(`${API_URL}/membership_acquisitions/`, {
            method: 'GET',
            headers: headerGet,
        });
        return Promise.resolve(membershipAcquisitions.data);
    } catch (error) {
        return Promise.reject(error.errors[0]);
    }
};

export const createMercadoPagoPreference = async membershipAcquisitionId => {
    try {
        const mercadoPagoPreference = await sdkAuthRequest(`${API_URL}/membership_acquisitions/${membershipAcquisitionId}/mp_preferences/`, {
            method: 'POST',
            headers: headersPost,
        });
        return Promise.resolve(mercadoPagoPreference.data.id);
    } catch (error) {
        return Promise.reject(error.errors[0]);
    }
};
