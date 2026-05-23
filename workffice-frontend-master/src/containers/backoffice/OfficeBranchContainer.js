import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OfficeBranch } from '../../components/OfficeBranch/OfficeBranch';
import { officeBranchList } from '../../stores/actions/backoffice/officeBranch/officeBranchesAdminActions';
import { hideNotificationAction} from '../../stores/actions/notifications/writeNotificationActions'

export const OfficeBranchContainer = () => {
  const loading = useSelector(state => state.isLoading);
  const notification = useSelector(state => state.notification);
  const hideNotification = useCallback(async () => {
    await dispatch(hideNotificationAction())
  })
  const userMe = useSelector(state => state.userMe)
  const dispatch = useDispatch();
  const loadBranches = useCallback(async (userId) => {
    await dispatch(officeBranchList(userId));
  }, []);
  const branches = useSelector(state => state.officeBranches);
  return <OfficeBranch
    loadBranches={loadBranches}
    branches={branches}
    userMe={userMe}
    loading={loading}
    notification={notification}
    hideNotification={hideNotification}
  />;
};
