import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EditOffice } from '../../components/Offices/EditOffice'
import { readFromLocalStorage } from '../../infra/api/localStorage'
import { getOffice, updateOffice, deleteOffice } from '../../stores/actions/backoffice/office/officeActions'
import { getOfficeInactivities } from '../../stores/actions/backoffice/office/officeInactivitiesAction'
import { getEquipments, getServices } from '../../stores/actions/backoffice/servicesEquipments/servicesEquipmentAction'
import { hideNotificationAction } from '../../stores/actions/notifications/writeNotificationActions'


export const OfficeEditContainer = () => {
    const dispatch = useDispatch()
    const office = useSelector(state => state.office)
    const notification = useSelector(state => state.notification)
    const branch = useSelector(() => readFromLocalStorage("officeBranch"));
    const hideNotification = useCallback(() => {
        dispatch(hideNotificationAction())
    }, [dispatch])
    React.useEffect(()=>{
        dispatch(getEquipments(branch.id))
        dispatch(getServices(branch.id));
    },[])
    const loading = useSelector(state => state.loadingOffice)
    const equipments = useSelector(state => state.equipments.equipmentsList);
    const services = useSelector(state => state.services.servicesList);
    const loadOffice = useCallback(officeId => {
        dispatch(getOffice(officeId))
    }, [dispatch])
    const update = useCallback((officeId, office) => {
        dispatch(updateOffice(officeId, office))
    }, [dispatch])
    const deleteOff = useCallback((officeId) => {
        dispatch(deleteOffice(officeId, office))
    }, [dispatch])
    const inactivities = useSelector(state => state.officeInactivities)
    const loadInactivities = useCallback(officeId => {
        dispatch(getOfficeInactivities(officeId))
    }, [dispatch])
    return <EditOffice
        office={office}
        loadOffice={loadOffice}
        loading={loading}
        inactivities={inactivities}
        equip={equipments}
        serv={services}
        loadInactivities={loadInactivities}
        update={update}
        notification={notification}
        hideNotification={hideNotification}
        deleteOffice={deleteOff}
    />
}
