import { currentPositionActionTypes } from './current-position.actions';

const currentPositionReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case currentPositionActionTypes.RECEIVE_CURRENT_POSITION:
            return {
                ...state,
                ...action.position
            };
        default:
            return state;
    }
};

export default currentPositionReducer;