
import { FETCH_CREATE_EQUIPMENT, FETCH_EQUIPMENT } from "../../../actions/backoffice/servicesEquipments/servicesEquipmentAction";

const initialState = {
    equipmentsList: [],
    equipment: null
};

export const equipmentsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_CREATE_EQUIPMENT: return { ...state, equipment: payload.data };
        case FETCH_EQUIPMENT: return { ...state, equipmentsList: payload.data };
        default: return state;
    }
}
