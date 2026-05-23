import { FETCH_CREATE_SERVICE, FETCH_SERVICES } from "../../../actions/backoffice/servicesEquipments/servicesEquipmentAction";


const initialState = {
    servicesList: [],
    service: null
};

export const servicesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_CREATE_SERVICE: return { ...state, service: payload.data };
        case FETCH_SERVICES: return { ...state, servicesList: payload.data };
        default: return state;
    }
}
