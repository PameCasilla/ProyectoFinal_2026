import { addEquipmentsInfra, addServicesInfra, createOffice, deleteOfficeInfra, getOffice, getOfficeInactivities, getOffices, searchOfficeBranches, updateOffice } from "../../infra/api/backoffice/offices";

export const getOfficesAPI = officeHolderId => {
    return Promise.resolve(getOffices(officeHolderId));
}

export const getOfficeAPI = officeId => {
    return Promise.resolve(getOffice(officeId));
}

export const createOfficeAPI = (officeBranchId, office) => {
    return Promise.resolve(createOffice(officeBranchId, office));
}

export const updateOfficeAPI = (officeId, office) => {
    return Promise.resolve(updateOffice(officeId, office));
}
export const addServicesAPI = (officeId, services) => {
    return Promise.resolve(addServicesInfra(officeId, services));
}
export const addEquipmentsAPI = (officeId, services) => {
    return Promise.resolve(addEquipmentsInfra(officeId, services));
}


export const searchOfficeBranchesAPI = (params) => {
    return Promise.resolve(searchOfficeBranches(params));
}

export const getOfficeInactivitiesApi = officeId => {
    return Promise.resolve(getOfficeInactivities(officeId))
}

export const deleteOfficeAPI = officeId => {
    return Promise.resolve(deleteOfficeInfra(officeId))
}
