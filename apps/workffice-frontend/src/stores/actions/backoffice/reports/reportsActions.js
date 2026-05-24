import { amountPerOfficeAPI, amountPerYearAPI, bookingOfficeAPI } from "../../../../api/backoffice/reports";
import { REPORT_RESOURCE, setForbiddenAccessAction } from "../../errors/permissionActions";

export const FETCH_AMOUNT_PER_OFFICE = 'FETCH_AMOUNT_PER_OFFICE';
export const FETCH_OFFICE_BOOKING = 'FETCH_OFFICE_BOOKING';
export const FETCH_AMOUNT_PER_YEAR = 'FETCH_AMOUNT_PER_YEAR';

export const fetch_amount_per_office = report => ({
    type: FETCH_AMOUNT_PER_OFFICE,
    payload: report
});
export const fetch_booking_office = report => ({
    type: FETCH_OFFICE_BOOKING,
    payload: report
});
export const fetch_amount_per_year = report => ({
    type: FETCH_AMOUNT_PER_YEAR,
    payload: report
});

export const amountPerOffice = (officeBranchId, month) => async (dispatch) => {
    try {
        dispatch(fetch_amount_per_office(await amountPerOfficeAPI(officeBranchId, month)));
    } catch (error) {
        if (error.error === "OFFICE_BRANCH_FORBIDDEN")
            dispatch(setForbiddenAccessAction(REPORT_RESOURCE));
    }
}

export const amountPerYear = (officeBranchId, year) => async (dispatch) => {
    try {
        dispatch(fetch_amount_per_year(await amountPerYearAPI(officeBranchId, year)));
    } catch (error) {
        if (error.error === "OFFICE_BRANCH_FORBIDDEN")
            dispatch(setForbiddenAccessAction(REPORT_RESOURCE));
    }
}


export const booking = (officeBranchId, month) => async (dispatch) => {
    try {
        dispatch(fetch_booking_office(await bookingOfficeAPI(officeBranchId, month)));
    } catch (error) {
        if (error.error === "OFFICE_BRANCH_FORBIDDEN")
            dispatch(setForbiddenAccessAction(REPORT_RESOURCE));
    }
}