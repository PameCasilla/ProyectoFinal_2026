import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EditNotice } from '../../../components/Notice/EditNotice'
import { readFromLocalStorage } from '../../../infra/api/localStorage'
import { updateN } from '../../../stores/actions/backoffice/news/newsAction'
import { hideNotificationAction } from '../../../stores/actions/notifications/writeNotificationActions'


export const NewsEditContainer = () => {
    const dispatch = useDispatch()
    const userMe = useSelector(state => state.userMe)
    const notification = useSelector(state => state.notification)
    const hideNotification = useCallback(() => {
        dispatch(hideNotificationAction());
    }, [dispatch]);
    const newsList = useSelector(state => state.news.newsList);
    const loadNews = (id) => {
        return newsList.find(n => n.id === id);
    };
    const branch = useSelector(() => readFromLocalStorage("officeBranch"));
    const update = useCallback((newsId, newData) => {
        dispatch(updateN(newsId, newData));
    }, [dispatch]);

    return <EditNotice
        notification={notification}
        hideNotification={hideNotification}
        officeBranch={branch}
        userMe={userMe}
        update={update}
        loadNews={loadNews}
        news={newsList}
    />;
}
