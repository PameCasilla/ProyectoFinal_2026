export const LOADING_COLLABORATOR = 'LOADING_COLLABORATOR';
export const STOP_LOADING_COLLABORATOR = 'STOP_LOADING_COLLABORATOR';

export const loadingCollaboratorAction = () => ({
    type: LOADING_COLLABORATOR,
})

export const stopLoadingCollaboratorAction = () => ({
    type: STOP_LOADING_COLLABORATOR,
})
