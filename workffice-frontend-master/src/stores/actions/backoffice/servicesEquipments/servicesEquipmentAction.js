import { setIsLoading } from "../..";
import { createEquipmentsAPI, createServiceAPI, getEquipmentsAPI, getServicesAPI } from "../../../../api/backoffice/servicesEquioments";
import { setErrorAction } from "../../notifications/writeNotificationActions";


export const FETCH_CREATE_SERVICE = 'FETCH_CREATE_SERVICE';
export const FETCH_CREATE_EQUIPMENT = 'FETCH_CREATE_EQUIPMENT';
export const FETCH_EQUIPMENT = 'FETCH_EQUIPMENT';
export const FETCH_SERVICES = 'FETCH_SERVICES';


export const fetchCreateService = data => {
    return {
        type: FETCH_CREATE_SERVICE,
        payload: data
    };
};
export const fetchCreateEquipment = data => {
    return {
        type: FETCH_CREATE_EQUIPMENT,
        payload: data
    };
};
export const fetchServices = data => {
    return {
        type: FETCH_SERVICES,
        payload: data
    };
};
export const fetchEquipment = data => {
    return {
        type: FETCH_EQUIPMENT,
        payload: data
    };
};

export const createService = (officeBranchId, service) => async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
        dispatch(fetchCreateService(await createServiceAPI(officeBranchId, service)));
    } catch (error) {
        dispatch(setErrorAction(error));
    }
}
export const createEquipment = (officeBranchId, service) => async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
        dispatch(fetchCreateEquipment(await createEquipmentsAPI(officeBranchId, service)));
    } catch (error) {
        dispatch(setErrorAction(error));
    }
}
export const getEquipments = (officeBranchId) => async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
        dispatch(fetchEquipment(await getEquipmentsAPI(officeBranchId)));
    } catch (error) {
        dispatch(setErrorAction(error));
    }
}
export const getServices = (officeBranchId) => async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
        dispatch(fetchServices(await getServicesAPI(officeBranchId)));
    } catch (error) {
        dispatch(setErrorAction(error));
    }
}