import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NewNotice } from '../../../components/Notice/NewNotice';
import { readFromLocalStorage } from '../../../infra/api/localStorage'
import { create } from '../../../stores/actions/backoffice/news/newsAction'
import { hideNotificationAction } from '../../../stores/actions/notifications/writeNotificationActions'


export const newsContainer = () => {
    const dispatch = useDispatch()
    const userMe = useSelector(state => state.userMe)
    const notification = useSelector(state => state.notification)
    const hideNotification = useCallback(() => {
        dispatch(hideNotificationAction());
    }, [dispatch]);
    const branch = useSelector(() => readFromLocalStorage("officeBranch"));
    const onCreate = useCallback((officeBranchId, newData) => {
        dispatch(create(officeBranchId, newData));
    }, [dispatch]);

    return <NewNotice
        notification={notification}
        hideNotification={hideNotification}
        officeBranch={branch}
        userMe={userMe}
        onCreate={onCreate}
    />;
}
