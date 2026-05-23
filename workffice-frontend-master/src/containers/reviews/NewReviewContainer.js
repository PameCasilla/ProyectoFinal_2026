import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NewReviews } from '../../components/reviews/NewReviews'
import { readFromLocalStorage } from '../../infra/api/localStorage'
import { getOffice } from '../../stores/actions/backoffice/office/officeActions'
import { fetchOfficesList } from '../../stores/actions/backoffice/office/officesActions'
import { getOfficeBranch } from '../../stores/actions/backoffice/officeBranch/officeBranchAdminActions'
import { createReview } from '../../stores/actions/backoffice/reviews/reviewsActions'
import { hideNotificationAction } from '../../stores/actions/notifications/writeNotificationActions'


export const NewReviewContainer = () => {
    const dispatch = useDispatch()
    const userMe = useSelector(state => state.userMe)
    const notification = useSelector(state => state.notification)
    const hideNotification = useCallback(() => {
        dispatch(hideNotificationAction());
    }, [dispatch]);
    const branch = useSelector(() => readFromLocalStorage("officeBranch")) ? useSelector(() => readFromLocalStorage("officeBranch")) : useSelector(state => state.officeBranchSelected);
    const user = useSelector(state => state.userMe);
    const office = useSelector(state => state.office);
    const loadBranch = useCallback(id => {
        dispatch(getOfficeBranch(id));
    }, [dispatch]);
    const loadOffice = useCallback(id => {
        dispatch(getOffice(id));
    }, [dispatch]);
    const offices = useSelector(state => state.offices);
    const loadOffices = useCallback(id => {
        dispatch(fetchOfficesList(id));
    }, [dispatch]);
    const onCreate = useCallback((officeBranchId = branch.id, review) => {
        dispatch(createReview(officeBranchId, review));
    }, [dispatch]);

    return <NewReviews
        user={user}
        branch={branch}
        notification={notification}
        hideNotification={hideNotification}
        officeBranch={branch}
        userMe={userMe}
        onCreate={onCreate}
        loadOffices={loadOffices}
        offices={offices}
        loadOffice={loadOffice}
        loadBranch={loadBranch}
        office={office}
    />;
}
