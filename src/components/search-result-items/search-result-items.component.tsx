import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './search-result-items.styles.scss';

import { PlaceType } from '../../redux/place/place.actions';
import { RECEIVE_ACTIVE_INFO_WINDOW } from '../../redux/map/map.actions';
import { MapState, InfoWindowState } from '../../redux/map/map.reducer';
import { RECEIVE_ACTIVE_PLACE_ID } from '../../redux/map/map.actions';

interface SearchResultItemsProps {
    place: PlaceType;
    number: number;
}

const SearchResultItems: React.FC<SearchResultItemsProps> = ({ place, number }) => {
    const dispatch = useDispatch();

    const name = place.name.split(' ').map(name => (
        name[0].toUpperCase() + name.slice(1).toLowerCase()
    )).join(' ');

    const map = useSelector<MapState, MapState['map']>(state => state.map.map);
    const activePlaceId = useSelector<MapState, MapState['map']>(state => state.map.placeId);
    const activeInfoWindow = useSelector<InfoWindowState, InfoWindowState['map']>(state => state.map.infoWindow);
    const receiveActiveInfoWindow = (infoWindow: any) => dispatch({ type: RECEIVE_ACTIVE_INFO_WINDOW, infoWindow });
    const receiveActivePlaceId = (placeId: string) => dispatch({ type: RECEIVE_ACTIVE_PLACE_ID, placeId });

    const active = activePlaceId === place.place_id;

    const handleClick = () => {
        if (activeInfoWindow) activeInfoWindow.close();

        const icon = {
            url: 'https://img.icons8.com/office/40/000000/marker.png',
            scaledSize: new google.maps.Size(40, 40)
        }

        const marker = new window.google.maps.Marker({
            map,
            icon,
            title: place.name,
            position: place.geometry.location
        });

        const infoWindow = new window.google.maps.InfoWindow();

        infoWindow.setContent(place.name);
        infoWindow.open(map, marker);
        receiveActiveInfoWindow(infoWindow);
        if (place.place_id) receiveActivePlaceId(place.place_id);
    }

    if (place.photos && place.rating !== undefined && place.vicinity) {
        const address = place.vicinity.split(',')[0];

        return (
            <div
                className={`place ${active ? 'active' : ''}`}
                onClick={handleClick}>
                <div
                    className='place-photo'
                    style={{ backgroundImage: `url(${place.photos[0].getUrl()})` }}
                />
                <div className='place-info'>
                    <div className='name-address'>
                        <div className='name'>{number}. {name}</div>
                        <div className='address'>{address} · 9 mins</div>
                    </div>
                    <div className={`rating ${place.rating >= 4.5 ? 'high' : ''}`}>
                        {place.rating === 0 ? <span className='new'>NEW</span> : place.rating.toFixed(1)}
                    </div>
                </div>
            </div>
        )
    } else {
        return null;
    }
}

export default SearchResultItems;