import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';

import SideBar from './components/side-bar/side-bar.component';
import GoogleMap from './components/google-map/google-map.component';
import { RECEIVE_CURRENT_POSITION, CurrentPositionType } from './redux/current-position/current-position.actions';
import { RECEIVE_PLACES, PlaceType } from './redux/place/place.actions';
import { RECEIVE_MAP } from './redux/map/map.actions';
import { RECEIVE_ACTIVE_INFO_WINDOW } from './redux/map/map.actions';
import { InfoWindowState } from './redux/map/map.reducer';

const App = () => {
  const [map, setMap] = useState<any | null>(null);
  const [currentPosition, setCurrentPosition] = useState<CurrentPositionType | null>(null);
  const [clickedMarker, setClickedMarker] = useState<any>(null);
  const [status, setStatus] = useState('loading');
  const dispatch = useDispatch();
  const receivePlaces = (places: any) => dispatch({ type: RECEIVE_PLACES, places });
  const receiveMap = (map: any) => dispatch({ type: RECEIVE_MAP, map });
  const receiveCurrentPosition = (position: CurrentPositionType) => dispatch({ type: RECEIVE_CURRENT_POSITION, position });
  const receiveActiveInfoWindow = (infoWindow: any) => dispatch({ type: RECEIVE_ACTIVE_INFO_WINDOW, infoWindow });
  const activeInfoWindow = useSelector<InfoWindowState, InfoWindowState['map']>(state => state.map.infoWindow);

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
      if (currentPosition && mapNode) {
        setStatus('success');
        receiveCurrentPosition(currentPosition);

        const { lat, lng } = currentPosition;
        const options = {
          center: new window.google.maps.LatLng(lat, lng),
          zoom: 16,
          scrollwheel: false,
          navigationControl: false,
          mapTypeControl: false,
          scaleControl: false,
          draggable: false
        }

        const newMap = new window.google.maps.Map(mapNode, options);
        setMap(newMap);
        receiveMap(newMap);
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
      return () => script.removeEventListener('load', onLoad);
    } else {
      onLoad();
    }

    return;

  }, [currentPosition]);

  useEffect(() => {
    if (currentPosition && map) {
      const { lat, lng } = currentPosition;
      const location = new window.google.maps.LatLng(lat, lng);
      const radius = 1000;
      const types = ['cafe', 'bakery'];
      const request = { location, radius, types, keyword: 'coffee' };
      const service = new window.google.maps.places.PlacesService(map);

      const createMarker = (place: PlaceType) => {
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

        window.google.maps.event.addListener(marker, 'click', () => {
          setClickedMarker({ marker, place });
        });
      }

      service.nearbySearch(request, (places, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          receivePlaces(places);

          for (let i = 0; i < places.length; i++) {
            const place = places[i];
            createMarker(place);
          }
        }
      });

      const icon = {
        url: 'https://img.icons8.com/office/40/000000/map-pin.png',
        scaledSize: new google.maps.Size(40, 40)
      }

      new window.google.maps.Marker({
        map,
        icon,
        position: currentPosition
      });
    }
  }, [map]);

  useEffect(() => {
    if (clickedMarker) {
      const { marker, place } = clickedMarker;
      const infoWindow = new window.google.maps.InfoWindow();

      if (activeInfoWindow) activeInfoWindow.close();

      const contentString = `
        <div style='background-image: url(${place.photos[0].getUrl()}); 
          background-size: 100%;
          width: 100px; 
          height: 100px;'>
        </div>
        <h1>${place.name}</h1>
        <h2>${place.rating}</h2>
      `

      infoWindow.setContent(contentString);
      infoWindow.open(map, marker);
      receiveActiveInfoWindow(infoWindow);
    }
  }, [clickedMarker]);

  return (
    <div className='app'>
      <SideBar />
      <GoogleMap status={status} />
    </div>
  );
}

export default App;