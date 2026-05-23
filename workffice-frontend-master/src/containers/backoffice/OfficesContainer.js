import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OfficesListComponent } from '../../components/Offices/OfficesListComponent';
import { fetchOfficesList } from '../../stores/actions/backoffice/office/officesActions';

export const OfficesContainer = () => {
  const loading = useSelector(state => state.loadingOffice);
  const error = useSelector(state => state.error);
  const userMe = useSelector(state => state.userMe)
  const officeBranch = useSelector(state => state.officeBranch);
  const dispatch = useDispatch();
  const offices = useSelector(state => state.offices)
  const loadOffices = useCallback((officeBranchId) => {
    dispatch(fetchOfficesList(officeBranchId))
  }, [dispatch])
  const permission = useSelector(state => state.permission)
  return <OfficesListComponent
    offices={offices}
    officeBranch={officeBranch}
    userMe={userMe}
    loading={loading}
    error={error}
    loadOffices={loadOffices}
    permission={permission}
  />;
};
