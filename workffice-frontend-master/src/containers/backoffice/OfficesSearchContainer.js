import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OfficesSearch } from '../../components/Offices/OfficesSearch';
import { searchOfficeBranches } from '../../stores/actions/search/officeBranchSearchActions';



export const OfficesSearchContainer = () => {
    const error = useSelector(state => state.error);
    const dispatch = useDispatch()
    const branch = useSelector(state => state.officeBranch);
    const officeBranches = useSelector(state => state.officesFound)
    const search = useCallback(async (values) => {
        dispatch(await searchOfficeBranches(values));
    });
    const loading = useSelector(state => state.loadingOfficeBranchSearch)
    return <OfficesSearch
        search={search}
        branch={branch}
        officeBranches={officeBranches}
        error={error}
        loading={loading}
    />;
};
