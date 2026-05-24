import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOfficeBranch } from '../../stores/actions/backoffice/officeBranch/officeBranchAdminActions';
import { CreateOfficeBranch } from '../../views/pages/backoffice/CreateOfficeBranch';
import { hideNotificationAction } from '../../stores/actions/notifications/writeNotificationActions';
export const OfficeBranchCreateContainer = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.userMe)
    const notification = useSelector(state => state.notification);
    const hideNotification = useCallback(async () => {
        await dispatch(hideNotificationAction())
    }, [dispatch])
    const onCreate = useCallback(officeBranchData => {
        dispatch(createOfficeBranch(officeBranchData, user.id));
    }, [user]);
    return <CreateOfficeBranch
        hideNotification={hideNotification}
        onCreate={onCreate}
        notification={notification}
    />;
};
