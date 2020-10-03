export const placeActionTypes = {
    RECEIVE_PLACES: 'RECEIVE_PLACES'
};

export const receivePlaces = places => ({
    type: placeActionTypes.RECEIVE_PLACES,
    places
});