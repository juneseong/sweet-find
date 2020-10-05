export const RECEIVE_PLACES = 'RECEIVE_PLACES';

export interface PlaceType {
    name: string;
    photos?: Array<any> | undefined;
    rating?: number | undefined;
    geometry?: any;
}

type ReceivePlaces = {
    type: typeof RECEIVE_PLACES;
    places: Array<PlaceType>;
}

export type Action = ReceivePlaces;