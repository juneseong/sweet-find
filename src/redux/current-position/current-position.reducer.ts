import { RECEIVE_CURRENT_POSITION } from './current-position.actions';

const currentPositionReducer = (state = {}, action) => {
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