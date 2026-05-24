export const COLLABORATOR_FORBIDDEN_MESSAGE = "No tienes acceso para ver los colaboradores de esta sucursal"

export const ACCESS_TYPE_READ = "read"
export const ACCESS_TYPE_WRITE = "write"

export const getStatus = status => {
    switch (status) {
        case "PENDING": return "PENDIENTE"
        case "ACTIVE": return "ACTIVO"
        case "INACTIVE": return "INACTIVO"
    }
}

export const getErrorMessage = (error) => {
    switch (error) {
        case "COLLABORATOR_ALREADY_EXISTS": return "Ya existe un colaborador con el email especificado"
        case "OFFICE_BRANCH_FORBIDDEN": return "No tienes permisos para crear colaboradores"
        case "COLLABORATOR_FORBIDDEN": return "No tienes permisos para editar colaboradores"
        case "INVALID_ROLEIDS": return "Debe elegir al menos un rol"
    }
}
