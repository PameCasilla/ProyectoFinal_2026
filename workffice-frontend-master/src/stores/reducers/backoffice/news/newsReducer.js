import { CREATE_NEWS, DELETE_NEWS, FETCH_ALL_NEWS, SEND_NEWS, UPDATE_NEWS } from "../../../actions/backoffice/news/newsAction";

const initialState = {
    newsList: [],
    news: null
};

export const newsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CREATE_NEWS: return { ...state, news: payload.data };
        case DELETE_NEWS: return { ...state, news: payload.data };
        case UPDATE_NEWS: return { ...state, news: payload.data };
        case SEND_NEWS: return { ...state, news: payload };
        case FETCH_ALL_NEWS: return { ...state, newsList: payload.data };
        default: return state;
    }
}
