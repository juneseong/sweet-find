import { RECEIVE_PLACES, Action, PlaceType } from './place.actions';

export interface PlaceState {
    places: PlaceType;
}

const placeReducer = (state = {}, action: Action) => {
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