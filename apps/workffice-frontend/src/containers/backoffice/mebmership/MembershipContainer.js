import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MembershipListComponent } from '../../../components/Membership/MembershipListComponent'
import { readFromLocalStorage } from '../../../infra/api/localStorage'
import { deleteMember, getAllMembership } from '../../../stores/actions/backoffice/membership/membership'
import { hideNotificationAction } from '../../../stores/actions/notifications/writeNotificationActions'


export const MembershipsContainer = () => {
    const dispatch = useDispatch()
    const userMe = useSelector(state => state.userMe)
    useEffect(() => {
        dispatch(getAllMembership(branch.id));
    }, [dispatch]);
    const hideNotification = useCallback(() => {
        dispatch(hideNotificationAction())
    }, [dispatch]);
    const branch = useSelector(() => readFromLocalStorage("officeBranch")) ? useSelector(() => readFromLocalStorage("officeBranch")) :  useSelector(state => state.branch.id) ;
    const deleteMembership = useCallback((id) => {
        dispatch(deleteMember(id, branch.id));
    }, [dispatch]);
    const loadMembershipsUpdated = useCallback(()=>{
        dispatch(getAllMembership(branch.id));
    },[dispatch])
    const memberships = useSelector(state => state.memberships.membershipList);
    const notification = useSelector(state => state.notification);


    return (<MembershipListComponent
        notification={notification}
        hideNotification={hideNotification}
        loadMemberships={loadMembershipsUpdated}
        officeBranch={branch}
        userMe={userMe}
        memberships={memberships}
        deleteMembership={deleteMembership}
    />);
}
