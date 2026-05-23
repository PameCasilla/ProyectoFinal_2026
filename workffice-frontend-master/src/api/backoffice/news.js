import { createNewInfra, deleteInfra, getNewInfra, sendNewsInfra, updateNewInfra } from "../../infra/api/backoffice/news";


export const createNewsAPI = (officeBranchId, newsData) => {
    return Promise.resolve(createNewInfra(officeBranchId, newsData));
}
export const updateNewsAPI = (newsId, newsData) => {
    return Promise.resolve(updateNewInfra(newsId, newsData));
}

export const getNewsAPI = (officeBranchId) => {
    return Promise.resolve(getNewInfra(officeBranchId));
}
export const deleteAPI = (newsId) => {
    return Promise.resolve(deleteInfra(newsId));
}
export const sendNewsAPI = (newsId) => {
    return Promise.resolve(sendNewsInfra(newsId));
}

