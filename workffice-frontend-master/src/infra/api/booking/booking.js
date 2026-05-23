import { headerGet, headersPost, sdkAuthRequest } from "..";
import { API_URL } from "../../../environments/environment";

export const bookOffice = async (officeId, bookingBody) => {
    try {
        const booking = await sdkAuthRequest(`${API_URL}/offices/${officeId}/bookings/`, {
            method: 'POST',
            headers: headersPost,
            body: JSON.stringify(bookingBody)
        });
        return Promise.resolve(booking.data.uri.match("/api/bookings/(.*)/")[1]);
    } catch (error) {
        return Promise.reject(error.errors[0]);
    }
};

export const createMercadoPagoPreference = async bookingId => {
    try {
        const mpPreference = await sdkAuthRequest(`${API_URL}/bookings/${bookingId}/mp_preferences/`, {
            method: 'POST',
            headers: headersPost,
        });
        return Promise.resolve(mpPreference.data.id);
    } catch (error) {
        return Promise.reject(error.errors[0]);
    }
}

export const getBooking = async bookingId => {
    try {
        const booking = await sdkAuthRequest(`${API_URL}/bookings/${bookingId}/`, {
            method: 'GET',
            headers: headerGet,
        });
        return Promise.resolve(booking.data);
    } catch (error) {
        return Promise.reject(error.errors[0]);
    }
}

export const getUserCurrentBookings = async (userEmail, page) => {
    try {
        const bookings = await sdkAuthRequest(`${API_URL}/bookings/?renter_email=${userEmail}&current_bookings=true&page=${page}&size=10`, {
            method: 'GET',
            headers: headerGet,
        });
        return Promise.resolve(bookings);
    } catch (error) {
        return Promise.reject(error.errors[0]);
    }
}

export const getUserPastBookings = async (userEmail, page) => {
    try {
        const bookings = await sdkAuthRequest(`${API_URL}/bookings/?renter_email=${userEmail}&current_bookings=false&page=${page}&size=10`, {
            method: 'GET',
            headers: headerGet,
        });
        return Promise.resolve(bookings);
    } catch (error) {
        return Promise.reject(error.errors[0]);
    }
}

export const getOfficeBookings = async (officeId, date) => {
    try {
        const bookings = await sdkAuthRequest(`${API_URL}/offices/${officeId}/bookings/?date=${date}`, {
            method: 'GET',
            headers: headerGet,
        });
        return Promise.resolve(bookings.data);
    } catch (error) {
        return Promise.reject(error.errors[0]);
    }
}
