import { CREATE_REVIEW, FETCH_REVIEWS } from "../../actions/backoffice/reviews/reviewsActions";

const initialState = {
    reviewList: [],
    review: null
};

export const reviewReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_REVIEWS: return { ...state, reviewList: payload };
        case CREATE_REVIEW: return { ...state, review: payload.data };
        default: return state;
    }
}
