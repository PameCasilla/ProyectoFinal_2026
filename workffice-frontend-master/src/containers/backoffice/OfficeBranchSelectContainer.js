import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanOfficeBranchAction, getOfficeBranch } from '../../stores/actions/backoffice/officeBranch/officeBranchAdminActions';
import { collaboratorOfficeBranchList, officeBranchList } from '../../stores/actions/backoffice/officeBranch/officeBranchesAdminActions';
import { getUserMe } from '../../stores/actions/backoffice/userActions';
import { OfficeBranchSelect } from '../../views/pages/backoffice/OfficeBranchSelect';

export const OfficeBranchSelectContainer = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.userMe)
    const selectOfficeBranch = useCallback(async (officeBranchId) => {
        await dispatch(getOfficeBranch(officeBranchId));
    }, [dispatch]);
    const cleanOfficeBranch = useCallback(async () => {
        await dispatch(cleanOfficeBranchAction())
    }, [dispatch])
    const officeBranches = useSelector(state => state.officeBranches);
    const loading = useSelector(state => state.loadingOfficeBranch)
    const loadOfficeBranches = useCallback((userId, userEmail) => {
        dispatch(officeBranchList(userId))
        dispatch(collaboratorOfficeBranchList(userEmail))
    }, [dispatch]);
    const loadUser = useCallback(async () => {
        await dispatch(getUserMe())
    }, [dispatch]);
    const officeBranch = useSelector(state => state.officeBranch);
    return <OfficeBranchSelect
        selectOfficeBranch={selectOfficeBranch}
        officeBranches={officeBranches}
        loadOfficeBranches={loadOfficeBranches}
        currentOfficeBranch={officeBranch}
        cleanOfficeBranch={cleanOfficeBranch}
        loadUser={loadUser}
        user={user}
        loading={loading}
    />;
};
