import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './search-result-items.styles.scss';

import { PlaceType } from '../../redux/place/place.actions';
import { RECEIVE_ACTIVE_INFO_WINDOW } from '../../redux/map/map.actions';
import { MapState, InfoWindowState } from '../../redux/map/map.reducer';

interface SearchResultItemsProps {
    place: PlaceType;
}

const SearchResultItems: React.FC<SearchResultItemsProps> = ({ place }) => {
    const dispatch = useDispatch();

    const name = place.name.split(' ').map(name => (
        name[0].toUpperCase() + name.slice(1).toLowerCase()
    )).join(' ');

    const map = useSelector<MapState, MapState['map']>(state => state.map.map);
    const activeInfoWindow = useSelector<InfoWindowState, InfoWindowState['map']>(state => state.map.infoWindow);
    const receiveActiveInfoWindow = (infoWindow: any) => dispatch({ type: RECEIVE_ACTIVE_INFO_WINDOW, infoWindow });

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
    }

    if (place.photos && place.rating) {
        return (
            <div className='place' onClick={handleClick}>
                <div
                    className='place-photo'
                    style={{ backgroundImage: `url(${place.photos[0].getUrl()})` }}
                />
                <div className='place-info'>
                    <div className={`rating ${place.rating >= 4.5 ? 'high' : ''}`}>
                        {place.rating === 0 ? 'New' : place.rating.toFixed(1)}
                    </div>
                    <div className='name'>{name}</div>
                    <div className='distance'>
                        9 mins
                    </div>
                </div>
            </div>
        )
    } else {
        return null;
    }
}

export default SearchResultItems;