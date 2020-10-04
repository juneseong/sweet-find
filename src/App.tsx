import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './App.css';

import SideBar from './components/side-bar/side-bar.component';
import GoogleMap from './components/google-map/google-map.component';
import { RECEIVE_CURRENT_POSITION, CurrentPositionType } from './redux/current-position/current-position.actions';
import { RECEIVE_PLACES } from './redux/place/place.actions';

declare const google: any;

const App = () => {
  const [map, setMap] = useState();
  const [currentPosition, setCurrentPosition] = useState<CurrentPositionType | null>(null);
  const [status, setStatus] = useState('loading');
  const dispatch = useDispatch();

  const receivePlaces = (places: any) => dispatch({ type: RECEIVE_PLACES, places });
  const receiveCurrentPosition = (position: CurrentPositionType) => dispatch({ type: RECEIVE_CURRENT_POSITION, position });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      }, () => {
        setStatus('error');
      }, { timeout: 10000 });
    }
  }, []);

  useEffect(() => {
    const mapNode = document.getElementById('map');

    const onLoad = () => {
      if (currentPosition) {
        setStatus('success');
        receiveCurrentPosition(currentPosition);

        const { lat, lng } = currentPosition;
        const center = new google.maps.LatLng(lat, lng);
        setMap(new google.maps.Map(mapNode, { center, zoom: 15 }));
      }
    };

    if (!google) {
      const apiKey = process.env.REACT_APP_API_KEY;
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      script.addEventListener('load', onLoad);
      return () => script.removeEventListener('load', onLoad);
    } else {
      onLoad();
    }

    return;

  }, [currentPosition]);

  useEffect(() => {
    if (currentPosition && map) {
      const { lat, lng } = currentPosition;
      const location = new google.maps.LatLng(lat, lng);
      const radius = '1000';
      const types = ['cafe', 'bakery'];
      const request = { location, radius, types, keyword: 'coffee' };
      const service = new google.maps.places.PlacesService(map);

      service.nearbySearch(request, (places: any, status: boolean) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          receivePlaces(places);

          const createMarker = (place: any) => {

            const marker = new google.maps.Marker({
              map,
              title: place.name,
              position: place.geometry.location
            });

            const infoWindow = new google.maps.InfoWindow();

            google.maps.event.addListener(marker, 'click', () => {
              infoWindow.setContent(marker.title);
              infoWindow.open(map, marker);
            });
          };

          for (let i = 0; i < places.length; i++) {
            const place = places[i];
            createMarker(place);
          }
        }
      });
    }
  }, [map]);

  return (
    <div className='app'>
      <SideBar />
      <GoogleMap status={status} />
    </div>
  );
}

export default App;