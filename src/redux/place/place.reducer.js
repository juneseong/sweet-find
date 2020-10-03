import { RECEIVE_PLACES } from './place.actions';

const placeReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_PLACES:
            return {
                ...state,
                ...action.places
            };
        default:
            return state;
    }
};

export default placeReducer;