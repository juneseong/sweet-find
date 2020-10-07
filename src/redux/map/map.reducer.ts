import { RECEIVE_MAP, RECEIVE_ACTIVE_INFO_WINDOW, RECEIVE_ACTIVE_PLACE_ID, Action } from './map.actions';

export interface MapState {
    map: any;
}

export interface InfoWindowState {
    map: any;
}

const mapReducer = (state = {}, action: Action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_MAP:
            return {
                ...state,
                map: action.map
            }
        case RECEIVE_ACTIVE_INFO_WINDOW:
            return {
                ...state,
                infoWindow: action.infoWindow
            }
        case RECEIVE_ACTIVE_PLACE_ID:
            return {
                ...state,
                placeId: action.placeId
            }
        default:
            return state;
    }
};

export default mapReducer;