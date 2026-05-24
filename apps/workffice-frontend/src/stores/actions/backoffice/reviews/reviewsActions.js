import { setIsLoading } from "../..";
import { createReviewAPI, getReviewsAPI } from "../../../../api/reviews/reviewsApi";
import { setErrorAction, setSuccessAction } from "../../notifications/writeNotificationActions";

export const FETCH_REVIEWS = 'FETCH_REVIEWS';
export const CREATE_REVIEW = 'CREATE_REVIEW';


export const fetchReviewsAction = reviews => {
    return {
        type: FETCH_REVIEWS,
        payload: reviews
    };
};

export const createReviewsAction = reviews => {
    return {
        type: FETCH_REVIEWS,
        payload: reviews
    };
};

export const getReviews = (officeId) => async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
        dispatch(fetchReviewsAction(await getReviewsAPI(officeId)));
    } catch (error) {
        dispatch(setErrorAction(error));
    } finally {
        dispatch(setIsLoading(false));
    }
}

export const createReview = (officeBranchId, review) => async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
        dispatch(createReviewsAction(await createReviewAPI(officeBranchId, review)));
        dispatch(setSuccessAction())
    } catch (error) {
        dispatch(setErrorAction(error));
    } finally {
        dispatch(setIsLoading(false));
    }
}

