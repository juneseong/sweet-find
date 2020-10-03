import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './App.css';

import SideBar from './components/side-bar/side-bar.component';
import GoogleMap from './components/google-map/google-map.component';
import { RECEIVE_CURRENT_POSITION } from './redux/current-position/current-position.actions';
import { RECEIVE_PLACES } from './redux/place/place.actions';

const App = () => {
  const [map, setMap] = useState();
  const [currentPosition, setCurrentPosition] = useState();
  const [status, setStatus] = useState('loading');
  const dispatch = useDispatch();

  const receivePlaces = places => dispatch({ type: RECEIVE_PLACES, places });
  const receiveCurrentPosition = position => dispatch({ type: RECEIVE_CURRENT_POSITION, position });

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
        const center = new window.google.maps.LatLng(lat, lng);
        setMap(new window.google.maps.Map(mapNode, { center, zoom: 15 }));
      }
    };

    if (!window.google) {
      const apiKey = process.env.REACT_APP_API_KEY;
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      script.addEventListener('load', onLoad);
      return () => script.removeEventListener('load', mapNode);
    } else {
      onLoad();
    }
  }, [currentPosition]);

  useEffect(() => {
    if (currentPosition && map) {
      const { lat, lng } = currentPosition;
      const location = new window.google.maps.LatLng(lat, lng);
      const radius = '1000';
      const types = ['cafe', 'bakery'];
      const request = { location, radius, types, keyword: 'coffee' };
      const service = new window.google.maps.places.PlacesService(map);

      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          receivePlaces(results);

          const createMarker = place => {

            const marker = new window.google.maps.Marker({
              map,
              title: place.name,
              position: place.geometry.location
            });

            const infoWindow = new window.google.maps.InfoWindow();

            window.google.maps.event.addListener(marker, 'click', () => {
              infoWindow.setContent(marker.title);
              infoWindow.open(map, marker);
            });
          };

          for (let i = 0; i < results.length; i++) {
            const place = results[i];
            createMarker(place);
          }
        }
      });
    }
  }, [map]);

  return (
    <div className='app'>
      <SideBar />
      <GoogleMap map={map} status={status} />
    </div>
  );
}

export default App;