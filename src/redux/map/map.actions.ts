export const RECEIVE_MAP = 'RECEIVE_MAP';
export const RECEIVE_ACTIVE_INFO_WINDOW = 'RECEIVE_ACTIVE_INFO_WINDOW';

type ReceiveMap = {
    type: typeof RECEIVE_MAP;
    map: any;
}

type ReceiveActiveInfoWindow = {
    type: typeof RECEIVE_ACTIVE_INFO_WINDOW;
    infoWindow: any;
}

export type Action = ReceiveMap | ReceiveActiveInfoWindow;