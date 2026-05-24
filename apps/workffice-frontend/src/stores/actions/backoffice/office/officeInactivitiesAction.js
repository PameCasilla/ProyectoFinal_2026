import { getOfficeInactivitiesApi } from "../../../../api/backoffice/offices";
import { setErrorAction } from "../../notifications/writeNotificationActions";

export const FETCH_OFFICE_INACTIVITIES = "FETCH_OFFICE_INACTIVITIES"


export const getOfficeInactivitiesAction = inactivities => ({
    type: FETCH_OFFICE_INACTIVITIES,
    payload: inactivities
});

export const getOfficeInactivities = officeId => async dispatch => {
    try {
        dispatch(getOfficeInactivitiesAction(await getOfficeInactivitiesApi(officeId)))
    } catch (error) {
        dispatch(setErrorAction(error))
    }
}
