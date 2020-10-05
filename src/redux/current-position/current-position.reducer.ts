import { RECEIVE_CURRENT_POSITION, Action } from './current-position.actions';

const currentPositionReducer = (state = {}, action: Action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_CURRENT_POSITION:
            return {
                ...state,
                ...action.position
            };
        default:
            return state;
    }
};

export default currentPositionReducer;