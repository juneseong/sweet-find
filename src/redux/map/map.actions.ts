export const RECEIVE_MAP = 'RECEIVE_MAP';
export const RECEIVE_ACTIVE_INFO_WINDOW = 'RECEIVE_ACTIVE_INFO_WINDOW';
export const RECEIVE_ACTIVE_PLACE_ID = 'RECEIVE_ACTIVE_PLACE_ID';

type ReceiveMap = {
    type: typeof RECEIVE_MAP;
    map: any;
}

type ReceiveActiveInfoWindow = {
    type: typeof RECEIVE_ACTIVE_INFO_WINDOW;
    infoWindow: any;
}

type ReceiveActivePlaceId = {
    type: typeof RECEIVE_ACTIVE_PLACE_ID;
    placeId: string;
}

export type Action = ReceiveMap | ReceiveActiveInfoWindow | ReceiveActivePlaceId;