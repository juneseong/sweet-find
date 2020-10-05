export const RECEIVE_CURRENT_POSITION = 'RECEIVE_CURRENT_POSITION';

export interface CurrentPositionType {
    lat: number;
    lng: number;
}

type ReceiveCurrentPosition = {
    type: typeof RECEIVE_CURRENT_POSITION;
    position: Array<CurrentPositionType>;
}

export type Action = ReceiveCurrentPosition;