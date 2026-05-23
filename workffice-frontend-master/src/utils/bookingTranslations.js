export const getErrorMessage = error => {
    switch (error) {
        case ("OFFICE_IS_NOT_AVAILABLE"): return "La oficina no se encuentra disponible en la fecha solicitada"
        case ("MEMBERSHIP_ACQUISITION_NOT_FOUND"): return "El código de compra introducido es invalido"
        case ("MEMBERSHIP_ACQUISITION_FORBIDDEN"): return "El código de compra no pertenece a este usuario"
        case ("MEMBERSHIP_ACQUISITION_IS_NOT_ACTIVE"): return "El código de compra no se encuentra disponible para la fecha solicitada"
        case ("INVALID_OFFICE_ID"): return "El código de compra es invalido" // TODO fix backend response
        default: return "Oops algo salio mal"
    }
}
