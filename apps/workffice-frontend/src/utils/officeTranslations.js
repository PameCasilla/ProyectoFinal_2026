export const getErrorMessage = error => {
    switch (error) {
        case ("OFFICE_BRANCH_FORBIDDEN"): return "No tienes permisos para crear oficinas en esta sucursal"
        case ("OFFICE_FORBIDDEN"): return "No tienes permisos para editar la oficina"
        default: return "Oops algo salio mal"
    }
}
