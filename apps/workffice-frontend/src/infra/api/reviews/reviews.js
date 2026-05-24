import { headerGet, headersPost, sdkAuthRequest } from "..";
import { API_URL } from "../../../environments/environment";

export const createReviewInfra = async (officeId, review) => {
    try {
        const reviewCreated = await sdkAuthRequest(`${API_URL}/office_branches/${officeId}/reviews/`,
            {
                method: 'POST',
                headers: headersPost,
                body: JSON.stringify(review)
            });

        return Promise.resolve(reviewCreated);
    } catch (error) {
        return Promise.reject(error.errors[0]);
    }
}
export const getReviewsInfra = async (officeId) => {
    try {

        const allNews = await sdkAuthRequest(`${API_URL}/offices/${officeId}/reviews/?page=0&size=100`,
            {
                method: 'GET',
                headers: headerGet,
            });

        return Promise.resolve(allNews);
    } catch (error) {
        return Promise.reject(error.errors[0]);
    }
}