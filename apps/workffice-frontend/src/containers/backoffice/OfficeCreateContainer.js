

import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NewOffice } from '../../components/Offices/NewOffice';
import { readFromLocalStorage } from '../../infra/api/localStorage';
import {  createOffice } from '../../stores/actions/backoffice/office/officeActions';
import { getEquipments, getServices } from '../../stores/actions/backoffice/servicesEquipments/servicesEquipmentAction';
import { getUserMe } from '../../stores/actions/backoffice/userActions';
import { hideNotificationAction } from '../../stores/actions/notifications/writeNotificationActions';

export const OfficeCreateContainer = () => {
    const dispatch = useDispatch();
    const notification = useSelector(state => state.notification);
    const office = useSelector(state => state.office);
    const branch = useSelector(() => readFromLocalStorage("officeBranch"));
    const hideNotification = useCallback(() => {
        dispatch(hideNotificationAction());
    }, [dispatch]);
    React.useEffect(() => {
        dispatch(getUserMe());
    }, [dispatch])
    React.useEffect(()=>{
        dispatch(getEquipments(branch.id))
        dispatch(getServices(branch.id));
    },[])
    const equipments = useSelector(state => state.equipments.equipmentsList);
    const services = useSelector(state => state.services.servicesList);
    const loading = useSelector(state => state.loading);
    const onCreate = useCallback(async(officeBranchId, office) => {
        dispatch(await createOffice(officeBranchId, office));
    }, [dispatch]);
    return <NewOffice
        create={onCreate}
        office={office}
        branch={branch}
        equip={equipments}
        serv={services}
        notification={notification}
        hideNotification={hideNotification}
        loading={loading}
    />
}
