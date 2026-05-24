export const LOADING_BOOKING = 'LOADING_BOOKING';
export const STOP_LOADING_BOOKING = 'STOP_LOADING_BOOKING';

export const loadingBookingAction = () => ({
    type: LOADING_BOOKING,
})

export const stopLoadingBookingAction = () => ({
    type: STOP_LOADING_BOOKING,
})
