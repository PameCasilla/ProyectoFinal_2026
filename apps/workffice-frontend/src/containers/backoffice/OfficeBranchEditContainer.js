
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readFromLocalStorage } from '../../infra/api/localStorage';
import { deleteOfficeBranch, editOfficeBranch, getOfficeBranch } from '../../stores/actions/backoffice/officeBranch/officeBranchAdminActions';
import { EditOfficeBranch } from '../../views/pages/backoffice/EditOfficeBranch';
import { hideNotificationAction } from '../../stores/actions/notifications/writeNotificationActions';

export const OfficeBranchEditContainer = () => {
    const officeBranchSelected = readFromLocalStorage("officeBranch")
    const notification = useSelector(state => state.notification);
    const officeBranch = useSelector(state => state.officeBranch)
    const dispatch = useDispatch();
    const loadOfficeBranch = useCallback(() => {
        dispatch(getOfficeBranch(officeBranchSelected.id))
    }, [dispatch])
    const onEdit = useCallback(officeBranchBody => {
        dispatch(editOfficeBranch(officeBranchSelected.id, officeBranchBody));
    }, [dispatch]);
    
    const onDelete = useCallback(id => {
        dispatch(deleteOfficeBranch(id));
    }, [dispatch]);
    
    const hideNotification = useCallback(() => {
        dispatch(hideNotificationAction())
    }, [dispatch])
    return <EditOfficeBranch
        edit={onEdit}
        onDelete={onDelete}
        officeBranch={officeBranch}
        notification={notification}
        hideNotification={hideNotification}
        loadOfficeBranch={loadOfficeBranch}
    />;
};
