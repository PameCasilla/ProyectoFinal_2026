import { setIsLoading } from "../..";
import { createNewsAPI, deleteAPI, getNewsAPI, sendNewsAPI, updateNewsAPI } from "../../../../api/backoffice/news";
import { setErrorAction, setSuccessAction } from "../../notifications/writeNotificationActions";


export const CREATE_NEWS = 'CREATE_NEWS';
export const FETCH_ALL_NEWS = 'FETCH_ALL_NEWS';
export const UPDATE_NEWS = 'UPDATE_NEWS';
export const SEND_NEWS = 'SEND_NEWS';
export const DELETE_NEWS = 'DELETE_NEWS';


export const createNews = newData => {
    return {
        type: CREATE_NEWS,
        payload: newData
    };
};

export const getNews = newsData => {
    return {
        type: FETCH_ALL_NEWS,
        payload: newsData
    };
};
export const updateNews = newsData => {
    return {
        type: UPDATE_NEWS,
        payload: newsData
    };
};
export const sendNews = newsData => {
    return {
        type: SEND_NEWS,
        payload: newsData
    };
};
export const deleteNews = newsData => {
    return {
        type: DELETE_NEWS,
        payload: newsData
    };
};

export const create = (officeBranchId, newsData) => async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
        dispatch(createNews(await createNewsAPI(officeBranchId, newsData)));
        dispatch(setSuccessAction())
    } catch (error) {
        dispatch(setErrorAction(error));
    } finally {
        dispatch(setIsLoading(false));
    }
}

export const getAllNews = (officeBranchId) => async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
        dispatch(getNews(await getNewsAPI(officeBranchId)));
    } catch (error) {
        dispatch(setErrorAction(error));
    } finally {
        dispatch(setIsLoading(false));
    }
}
export const updateN = (newsId, newsData) => async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
        dispatch(updateNews(await updateNewsAPI(newsId, newsData)));
        dispatch(setSuccessAction())
    } catch (error) {
        dispatch(setErrorAction(error));
    } finally {
        dispatch(setIsLoading(false));
    }
}
export const send = (newsId) => async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
        dispatch(sendNews(await sendNewsAPI(newsId)));
        dispatch(setSuccessAction())
    } catch (error) {
        dispatch(setErrorAction(error));
    } finally {
        dispatch(setIsLoading(false));
    }
}
export const deleteN = (newsId, branchId) => async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
        dispatch(deleteNews(await deleteAPI(newsId)));
        dispatch(getAllNews(branchId));
        dispatch(setSuccessAction())
    } catch (error) {
        dispatch(setErrorAction(error));
    } finally {
        dispatch(setIsLoading(false));
    }
}
