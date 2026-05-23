import { createMembershipInfra, deleteMembershipInfra, getMembershipInfra, updateMembershipInfra } from "../../infra/api/backoffice/membership";


export const createMembershipAPI = (officeBranchId, membeship) => {
    return Promise.resolve(createMembershipInfra(officeBranchId, membeship));
}
export const updateMembershipAPI = (newsId, membeship) => {
    return Promise.resolve(updateMembershipInfra(newsId, membeship));
}

export const getMembershipAPI = (officeBranchId) => {
    return Promise.resolve(getMembershipInfra(officeBranchId));
}
export const deleteAPI = (newsId) => {
    return Promise.resolve(deleteMembershipInfra(newsId));
}

