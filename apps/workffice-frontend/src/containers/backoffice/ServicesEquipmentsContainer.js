import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { readFromLocalStorage } from '../../infra/api/localStorage';
import { createEquipment, createService } from '../../stores/actions/backoffice/servicesEquipments/servicesEquipmentAction';
import { getUserMe } from '../../stores/actions/backoffice/userActions';
import { hideNotificationAction } from '../../stores/actions/notifications/writeNotificationActions';
import { ServicesEquipment } from '../../views/pages/backoffice/ServicesEquipment';

export const ServicesEquipmentsContainer = () => {
    const dispatch = useDispatch();
    const notification = useSelector(state => state.notification);
    const hideNotification = useCallback(() => {
        dispatch(hideNotificationAction());
    }, [dispatch]);
    React.useEffect(() => {
        dispatch(getUserMe());
    }, [dispatch])
    const loading = useSelector(state => state.loading);
    const branch = useSelector(() => readFromLocalStorage("officeBranch"));
    const onCreateService = useCallback((officeBranchId, service) => {
        dispatch(createService(officeBranchId, service));
    }, [dispatch]);
    const onCreateEquipment = useCallback((officeBranchId, equipment) => {
        dispatch(createEquipment(officeBranchId, equipment));
    }, [dispatch]);

    return (
        <ServicesEquipment
            loading={loading}
            notification={notification}
            hideNotification={hideNotification}
            branch={branch}
            onCreateService={onCreateService}
            onCreateEquipment={onCreateEquipment}
        />


    )
}
