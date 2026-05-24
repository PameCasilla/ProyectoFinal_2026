import { createRole, deleteRole, fetchRoles, fetchRolesFromCollaborator } from "../../infra/api/backoffice/roles"

export const createRoleApi = async (officeBranchId, roleBody) => {
  return Promise.resolve(createRole(officeBranchId, roleBody))
}

export const deleteRoleApi = async roleId => {
  return Promise.resolve(deleteRole(roleId))
}

export const fetchRolesApi = async officeBranchId => {
  return Promise.resolve(fetchRoles(officeBranchId))
}

export const fetchRolesFromCollaboratorApi = async collaboratorId => {
  return Promise.resolve(fetchRolesFromCollaborator(collaboratorId))
}
