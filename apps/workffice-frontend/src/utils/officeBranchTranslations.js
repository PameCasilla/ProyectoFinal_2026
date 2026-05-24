export const getErrorMessage = error => {
    if (error === "OFFICE_BRANCH_FORBIDDEN")
        return "No tienes permisos para editar la sucursal"
    if (error === "OFFICE_BRANCH_HAS_CREATED_OFFICES")
        return "No puedes eliminar una sucursal que tiene oficinas activas."
}
