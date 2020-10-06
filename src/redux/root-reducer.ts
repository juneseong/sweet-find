import { combineReducers } from 'redux';
import placeReducer from './place/place.reducer';
import currentPositionReducer from './current-position/current-position.reducer';
import mapReducer from './map/map.reducer';

const rootReducer = combineReducers({
    places: placeReducer,
    currentPosition: currentPositionReducer,
    map: mapReducer
});

export default rootReducer;