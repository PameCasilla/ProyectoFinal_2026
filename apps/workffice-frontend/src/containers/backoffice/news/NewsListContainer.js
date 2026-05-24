import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NoticeListComponent } from '../../../components/Notice/NoticeListComponent'
import { readFromLocalStorage } from '../../../infra/api/localStorage'
import { deleteN, getAllNews, send } from '../../../stores/actions/backoffice/news/newsAction'
import { hideNotificationAction } from '../../../stores/actions/notifications/writeNotificationActions'


export const NewsListContainer = () => {
    const dispatch = useDispatch()
    const userMe = useSelector(state => state.userMe)
    useEffect(() => {
        dispatch(getAllNews(branch.id));
    }, []);
    const hideNotification = useCallback(() => {
        dispatch(hideNotificationAction())
    }, [dispatch]);
    const branch = useSelector(() => readFromLocalStorage("officeBranch"));
    const sendNews = useCallback((id) => {
        dispatch(send(id));
    }, [dispatch]);
    const deleteNews = useCallback((id) => {
        dispatch(deleteN(id, branch.id));
    }, [dispatch]);
    const loadNewsUpdated = useCallback(() => {
        dispatch(getAllNews(branch.id));
    }, [dispatch])
    const newsList = useSelector(state => state.news.newsList);
    const notification = useSelector(state => state.notification);
    let news = newsList;
    React.useEffect(() => {
        news = loadNews();
    }, [])
    const loadNews = () => {
        return newsList.sort((a, b) => {
            a = new Date(a.created);
            b = new Date(b.created);
            return a > b ? -1 : a < b ? 1 : 0;
        });
    }

    return (<NoticeListComponent
        notification={notification}
        hideNotification={hideNotification}
        newsUpdated={loadNewsUpdated}
        officeBranch={branch}
        userMe={userMe}
        news={news}
        sendNews={sendNews}
        deleteNews={deleteNews}
    />);
}
