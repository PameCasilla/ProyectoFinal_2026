import { createReviewInfra, getReviewsInfra } from "../../infra/api/reviews/reviews";



export const createReviewAPI = (officeBranchId, review) => {
    return Promise.resolve(createReviewInfra(officeBranchId, review));
}

export const getReviewsAPI = (officeId) => {
    return Promise.resolve(getReviewsInfra(officeId));
}
