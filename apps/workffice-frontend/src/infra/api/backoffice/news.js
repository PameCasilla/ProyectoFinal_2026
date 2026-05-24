import { headerGet, headersPost, sdkAuthRequest } from "..";
import { API_OFFICE_BRANCHES, API_URL } from "../../../environments/environment";

export const createNewInfra = async (officeBranchId, news) => {
    try {

        const newsCreated = await sdkAuthRequest(`${API_OFFICE_BRANCHES}/${officeBranchId}/news/`,
            {
                method: 'POST',
                headers: headersPost,
                body: JSON.stringify(news)
            });

        return Promise.resolve(newsCreated);
    } catch (error) {
        return Promise.reject(error.errors[0]);
    }
}
export const sendNewsInfra = async (newsId) => {
    try {

        const newsCreated = await sdkAuthRequest(`${API_URL}/news/${newsId}/messages/`,
            {
                method: 'POST',
                headers: headersPost
            });

        return Promise.resolve(newsCreated);
    } catch (error) {
        return Promise.reject(error.errors[0]);
    }
}
export const updateNewInfra = async (newsId, news) => {
    try {

        const newsUpdated = await sdkAuthRequest(`${API_URL}/news/${newsId}/`,
            {
                method: 'PUT',
                headers: headersPost,
                body: JSON.stringify(news)
            });

        return Promise.resolve(newsUpdated);
    } catch (error) {
        return Promise.reject(error.errors[0]);
    }
}
export const getNewInfra = async (officeBranchId) => {
    try {

        const allNews = await sdkAuthRequest(`${API_OFFICE_BRANCHES}/${officeBranchId}/news/`,
            {
                method: 'GET',
                headers: headerGet,
            });

        return Promise.resolve(allNews);
    } catch (error) {
        return Promise.reject(error.errors[0]);
    }
}
export const deleteInfra = async (newsId) => {
    try {
        const newsDeleted = await sdkAuthRequest(`${API_URL}/news/${newsId}/`,
            {
                method: 'DELETE',
                headers: headerGet,
            });

        return Promise.resolve(newsDeleted);
    } catch (error) {
        return Promise.reject(error.errors[0]);
    }
}