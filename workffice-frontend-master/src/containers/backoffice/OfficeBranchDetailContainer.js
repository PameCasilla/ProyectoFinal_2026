import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OfficeBranchDetail } from '../../components/OfficeBranch/OfficeBranchDetail';
import { readFromLocalStorage, USER_TYPE } from '../../infra/api/localStorage';
import { getAllMembership } from '../../stores/actions/backoffice/membership/membership';
import { fetchOfficesList } from '../../stores/actions/backoffice/office/officesActions';
import { getOfficeBranchDetail } from '../../stores/actions/backoffice/officeBranch/officeBranchDetailActions';
import { acquireMembership, createMercadoPagoPreference } from '../../stores/actions/booking/membershipAcquisitionActions';
import { OFFICE_BRANCH_ENTITY } from '../../stores/actions/errors/notFoundActions';

export const OfficeBranchDetailContainer = () => {
    const dispatch = useDispatch();
    const officeBranch = useSelector(state => state.officeBranchDetail)
    const role = readFromLocalStorage(USER_TYPE);
    const officeBranchIdAdmin = role === "RENTER" ? undefined : readFromLocalStorage("officeBranch").id
    const loadOfficeBranch = useCallback(officeBranchId => {
        dispatch(getOfficeBranchDetail(officeBranchId));
    }, [dispatch]);
    const loadOffices = useCallback(officeBranchId => {
        dispatch(fetchOfficesList(officeBranchId));
    }, [dispatch]);
    const offices = useSelector(state => state.offices)
    const loadingOffices = useSelector(state => state.loadingOffice);
    const error = useSelector(state => state.entitiesNotFound.includes(OFFICE_BRANCH_ENTITY))
    const loadMemberships = useCallback(officeBranchId => {
        dispatch(getAllMembership(officeBranchId));
    }, [dispatch])
    const memberships = useSelector(state => state.memberships.membershipList);
    const buyMembership = useCallback(membershipId => {
        dispatch(acquireMembership(membershipId))
    }, [dispatch])
    const membershipAcquisitionId = useSelector(state => state.newMembershipAcquisition.id)
    const createMercadoPagoPreferenceForMembershipAcquisition = useCallback(membershipAcquisitionId => {
        dispatch(createMercadoPagoPreference(membershipAcquisitionId))
    }, [dispatch])
    const mercadoPagoPreferenceId = useSelector(state => state.mercadoPagoPreferenceMembershipAcquisition)
    return <OfficeBranchDetail
        officeBranch={officeBranch}
        offices={offices}
        loadOffices={loadOffices}
        loadOfficeBranch={loadOfficeBranch}
        officeBranchIdAdmin={officeBranchIdAdmin}
        loadingOffices={loadingOffices}
        error={error}
        loadMemberships={loadMemberships}
        memberships={memberships}
        membershipAcquisitionId={membershipAcquisitionId}
        buyMembership={buyMembership}
        createMercadoPagoPreference={createMercadoPagoPreferenceForMembershipAcquisition}
        mercadoPagoPreferenceId={mercadoPagoPreferenceId}
    />;
};
