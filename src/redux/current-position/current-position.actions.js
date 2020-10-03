export const currentPositionActionTypes = {
    RECEIVE_CURRENT_POSITION: 'RECEIVE_CURRENT_POSITION'
};

export const receiveCurrentPosition = position => ({
    type: currentPositionActionTypes.RECEIVE_CURRENT_POSITION,
    position
});