import { SET_FOUND_ENTITY, SET_NOT_FOUND_ENTITY } from "../../actions/errors/notFoundActions"

export const entityNotFoundReducer = (state = [], { type, payload }) => {
    switch (type) {
        case SET_NOT_FOUND_ENTITY: return [...state, payload]
        case SET_FOUND_ENTITY: return state.filter(entity => entity !== payload)
        default: return state
    }
}
