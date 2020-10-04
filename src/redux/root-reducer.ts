import { combineReducers } from 'redux';
import placeReducer from './place/place.reducer';
import currentPositionReducer from './current-position/current-position.reducer';

const rootReducer = combineReducers({
    places: placeReducer,
    currentPosition: currentPositionReducer
});

export default rootReducer;