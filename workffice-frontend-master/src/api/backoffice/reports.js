import { getBookingOffice, getTotalAmountPerOffice, getTotalAmountPerYear } from "../../infra/api/backoffice/reports";

export const amountPerOfficeAPI = (officeBranchId, month) => {
    return Promise.resolve(getTotalAmountPerOffice(officeBranchId, month));
}
export const bookingOfficeAPI = (officeBranchId, month) => {
    return Promise.resolve(getBookingOffice(officeBranchId, month));
}
export const amountPerYearAPI = (officeBranchId, month) => {
    return Promise.resolve(getTotalAmountPerYear(officeBranchId, month));
}
