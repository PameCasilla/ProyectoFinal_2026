import { headerGet, sdkAuthRequest } from '..';
import { API_OFFICE_BRANCHES_REPORTS } from "../../../environments/environment";

export const getTotalAmountPerOffice = async (officeBranchId, month) => {
    try {
        const offices = await sdkAuthRequest(
            `${API_OFFICE_BRANCHES_REPORTS}/${officeBranchId}/total_amount_per_office/?month=${month}`,
            {
                method: 'GET',
                headers: headerGet
            }
        );
        return Promise.resolve(offices.data);
    } catch (error) {
        return Promise.reject(error.errors[0]);
    }
}
export const getBookingOffice = async (officeBranchId, month) => {
    try {
        const offices = await sdkAuthRequest(
            `${API_OFFICE_BRANCHES_REPORTS}/${officeBranchId}/total_bookings_per_office/?month=${month}`,
            {
                method: 'GET',
                headers: headerGet
            }
        );
        return Promise.resolve(offices.data);
    } catch (error) {
        return Promise.reject(error.errors[0]);
    }
}
export const getTotalAmountPerYear = async (officeBranchId, month) => {
    try {
        const offices = await sdkAuthRequest(
            `${API_OFFICE_BRANCHES_REPORTS}/${officeBranchId}/total_amount_per_month/?year=${month}`,
            {
                method: 'GET',
                headers: headerGet
            }
        );
        return Promise.resolve(offices.data);
    } catch (error) {
        return Promise.reject(error.errors[0]);
    }
}
