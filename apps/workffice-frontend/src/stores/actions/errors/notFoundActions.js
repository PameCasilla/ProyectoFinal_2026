export const OFFICE_BRANCH_ENTITY = "OFFICE_BRANCH_ENTITY"
export const OFFICE_ENTITY = "OFFICE_ENTITY"

export const SET_NOT_FOUND_ENTITY = 'SET_NOT_FOUND_ENTITY'
export const SET_FOUND_ENTITY = 'SET_FOUND_ENTITY'


export const setNotFoundEntity = entity => ({
    type: SET_NOT_FOUND_ENTITY,
    payload: entity,
})

export const setFoundEntity = entity => ({
    type: SET_FOUND_ENTITY,
    payload: entity,
})
