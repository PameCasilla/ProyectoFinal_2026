import { setIsLoading } from '../..';
import { createCollaboratorApi, deleteCollaboratorApi, fetchCollaboratorsApi, updateCollaboratorApi } from '../../../../api/backoffice/collaborator';
import { setErrorAction, setSuccessAction } from '../../notifications/writeNotificationActions';
import { collaboratorsList, fetchCollaboratorsList } from './collaboratorsAction';

export const CREATE_COLLABORATOR = 'CREATE_COLABORATOR';
export const UPDATE_COLLABORATOR = 'UPDATE_COLABORATOR';
export const DELETE_COLLABORATOR = 'DELETE_COLLABORATOR';

export const fetchCreateCollaborator = response => ({
  type: CREATE_COLLABORATOR,
  payload: response,
});

export const createColaborator = (officeBranchId, collaboratorBody) => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    dispatch(fetchCreateCollaborator(await createCollaboratorApi(officeBranchId, collaboratorBody)));
    dispatch(setSuccessAction())
    dispatch(fetchCollaboratorsList(await fetchCollaboratorsApi(officeBranchId)))
  } catch (error) {
    dispatch(setErrorAction(error ? error : 'No ha sido posible crear el colaborador'));
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const updateCollaboratorAction = response => ({
  type: UPDATE_COLLABORATOR,
  payload: response,
});

export const updateCollaborator = (collaboratorId, collaboratorBody) => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    dispatch(updateCollaboratorAction(await updateCollaboratorApi(collaboratorId, collaboratorBody)));
    dispatch(setSuccessAction())
  } catch (error) {
    dispatch(setErrorAction(error ? error : 'No ha sido posible actualizar el colaborador'));
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const deleteCollaboratorAction = response => ({
  type: DELETE_COLLABORATOR,
  payload: response,
});

export const deleteCollaborator = collaboratorId => async dispatch => {
  dispatch(setIsLoading(true));
  try {
    await deleteCollaboratorApi(collaboratorId)
    dispatch(deleteCollaboratorAction(collaboratorId));
    dispatch(collaboratorsList())
    dispatch(setSuccessAction())
  } catch (error) {
    dispatch(setErrorAction(error));
  } finally {
    dispatch(setIsLoading(false));
  }
};
