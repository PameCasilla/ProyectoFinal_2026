import { createEquipmentsInfra, createServiceInfra, getEquipmentsInfra, getServicesInfra } from "../../infra/api/backoffice/servicesEquipments";

export const createServiceAPI = (officeBranchId, services) => {
    return Promise.resolve(createServiceInfra(officeBranchId, services));
}
export const createEquipmentsAPI = (officeBranchId, equipments) => {
    return Promise.resolve(createEquipmentsInfra(officeBranchId, equipments));
}
export const getEquipmentsAPI = (officeBranchId) => {
    return Promise.resolve(getEquipmentsInfra(officeBranchId));
}
export const getServicesAPI = (officeBranchId) => {
    return Promise.resolve(getServicesInfra(officeBranchId));
}