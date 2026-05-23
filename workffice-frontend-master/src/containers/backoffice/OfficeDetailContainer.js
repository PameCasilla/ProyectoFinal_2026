import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { OfficeDetailComponent } from '../../components/Offices/OfficeDetailComponent'
import { readFromLocalStorage } from '../../infra/api/localStorage'
import { getOffice } from '../../stores/actions/backoffice/office/officeActions';
import { getOfficeInactivities } from '../../stores/actions/backoffice/office/officeInactivitiesAction'
import { getReviews } from '../../stores/actions/backoffice/reviews/reviewsActions'
import { hideNotificationAction } from '../../stores/actions/notifications/writeNotificationActions'


export const OfficeDetailContainer = () => {
    const dispatch = useDispatch()
    const office = useSelector(state => state.office)
    const inactivities = useSelector(state => state.officeInactivities)
    const loadReviews = useCallback(officeId => {
        dispatch(getReviews(officeId))
    },[])
    const notification = useSelector(state => state.notification)
    const branch = useSelector(() => readFromLocalStorage("officeBranch")) ? useSelector(() => readFromLocalStorage("officeBranch")) : useSelector(state => state.officeBranchDetail);
    const hideNotification = useCallback(() => {
        dispatch(hideNotificationAction())
    }, [dispatch]);
    const loading = useSelector(state => state.loadingOffice)
    const loadOffice = useCallback(officeId => {
        dispatch(getOffice(officeId))
    }, [dispatch])
    const reviews = useSelector(state => state.reviews.reviewList.data);
    const user = useSelector(state => state.userMe);

    const loadInactivities = useCallback(officeId => {
        dispatch(getOfficeInactivities(officeId))
    }, [dispatch])
    return <OfficeDetailComponent
        office={office}
        branch={branch}
        user={user}
        reviews={reviews}
        loading={loading}
        inactivities={inactivities}
        loadInactivities={loadInactivities}
        notification={notification}
        hideNotification={hideNotification}
        loadOffice={loadOffice}
        loadReviews={loadReviews}
    />
}
