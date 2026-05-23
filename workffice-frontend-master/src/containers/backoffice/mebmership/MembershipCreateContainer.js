import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NewMembership } from '../../../components/Membership/NewMembership'
import { readFromLocalStorage } from '../../../infra/api/localStorage'
import { createMember, getAllMembership, updateMember } from '../../../stores/actions/backoffice/membership/membership'
import { hideNotificationAction } from '../../../stores/actions/notifications/writeNotificationActions'


export const MembershipCreateContainer = () => {
    const dispatch = useDispatch()
    const userMe = useSelector(state => state.userMe)
    const notification = useSelector(state => state.notification)
    const hideNotification = useCallback(() => {
        dispatch(hideNotificationAction());
    }, [dispatch]);
    const branch = useSelector(() => readFromLocalStorage("officeBranch"));
    const onCreate = useCallback((officeBranchId, membership) => {
        dispatch(createMember(officeBranchId, membership));
    }, [dispatch]);
    const membership = useSelector(state=>state.memberships.membership);

    return <NewMembership
        notification={notification}
        hideNotification={hideNotification}
        officeBranch={branch}
        membership={membership}
        userMe={userMe}
        onCreate={onCreate}
    />;
}

export const MembershipEditContainer = () => {
    const dispatch = useDispatch()
    const userMe = useSelector(state => state.userMe)
    const notification = useSelector(state => state.notification)
    const hideNotification = useCallback(() => {
        dispatch(hideNotificationAction());
    }, [dispatch]);
    const branch = useSelector(() => readFromLocalStorage("officeBranch"));
    const loadMembership = useCallback((officeBranchId) => {
        dispatch(getAllMembership(officeBranchId));
    }, [dispatch]);
    const memberships = useSelector(state=>state.memberships.membershipList)
    const onUpdate = useCallback((officeBranchId, membership) => {
        dispatch(updateMember(officeBranchId, membership));
    }, [dispatch]);
    const membership = useSelector(state=>state.memberships.membership);
    const edit = true;

    return <NewMembership
        memberships={memberships}
        notification={notification}
        hideNotification={hideNotification}
        officeBranch={branch}
        memb={membership}
        userMe={userMe}
        loadMembership={loadMembership}
        onUpdate={onUpdate}
        edit={edit}
    />;
}
