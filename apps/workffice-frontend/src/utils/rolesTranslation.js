export const ROLE_FORBIDDEN_MESSAGE = "No tienes acceso para ver los roles de esta sucursal"


export const getAccessLabel = access => {
  switch (access) {
    case "WRITE": return "Lectura 📖 / Escritura ✏️"
    case "READ": return "Lectura 📖"
    default: return "N/A"
  }
}

export const getResourceLabel = resource => {
  switch (resource) {
    case "OFFICE": return "Oficina"
    case "MEMBERSHIP": return "Membresia"
    case "ROLE": return "Rol"
    case "COLLABORATOR": return "Colaborador"
    case "BOOKING": return "Reservas"
    case "REPORT": return "Reportes"
    default: return "N/A"
  }
}

export const getErrorMessage = error => {
  switch (error) {
    case "OFFICE_BRANCH_FORBIDDEN": return "No tienes acceso para crear roles"
    case "ROLE_FORBIDDEN": return "No tienes acceso para modificar los roles de esta sucursal"
  }
}
