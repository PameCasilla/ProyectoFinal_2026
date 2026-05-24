import { OfficeBranchCreateContainer } from "../containers/backoffice/OfficeBranchCreateContainer";
import { OfficeBranchSelectContainer } from "../containers/backoffice/OfficeBranchSelectContainer";

export const routes = [
    {
        path: '/select',
        name: 'Select',
        component: OfficeBranchSelectContainer,
        layout: '/office-branch',
    },
    {
        path: '/create',
        name: 'Nueva Sucursal',
        layout: '/office-branch',
        component: OfficeBranchCreateContainer,
    }
];
