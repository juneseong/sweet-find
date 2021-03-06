import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';

import SideBar from './components/side-bar/side-bar.component';
import GoogleMap from './components/google-map/google-map.component';
import { RECEIVE_CURRENT_POSITION, CurrentPositionType } from './redux/current-position/current-position.actions';
import { RECEIVE_PLACES, PlaceType } from './redux/place/place.actions';
import { RECEIVE_MAP, RECEIVE_ACTIVE_INFO_WINDOW, RECEIVE_ACTIVE_PLACE_ID } from './redux/map/map.actions';
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
  const receiveActivePlaceId = (placeId: string) => dispatch({ type: RECEIVE_ACTIVE_PLACE_ID, placeId });

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
          if (place.place_id) receiveActivePlaceId(place.place_id);
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
        position: currentPosition,
        title: 'Current Location'
      });
    }
  }, [map]);

  useEffect(() => {
    if (clickedMarker) {
      const { marker, place } = clickedMarker;
      const infoWindow = new window.google.maps.InfoWindow();

      if (activeInfoWindow) activeInfoWindow.close();

      const contentString = `
        <div style='padding: 5px;'>
          <div style='background-image: url(${place.photos[0].getUrl()}); 
            background-size: 100%;
            background-position: center;
            background-repeat: no-repeat;
            width: 100%; 
            min-width: 120px;
            min-height: 120px;
            border-radius: 3px;
            margin-bottom: 10px;'>
          </div>
          <p style='margin-bottom: 5px; font-weight: 500;'>${place.name}</p>
          <p style='margin-bottom: 5px;'>9 mins (walk)</p>
          <p><img src="https://img.icons8.com/office/16/000000/rating.png"/> ${place.rating}</p>
        </div>
      `

      infoWindow.setContent(contentString);
      infoWindow.open(map, marker);
      receiveActiveInfoWindow(infoWindow);
    }
  }, [clickedMarker]);

  const [width, setWidth] = useState<number>(50);
  const [dragging, setDragging] = useState<boolean>(false);
  const [cursor, setCursor] = useState<string>('auto');
  const [lineColor, setLineColor] = useState<string>('#ddd');

  const handleDrag = (e: React.MouseEvent) => {
    if (dragging) {
      const clientWidth = document.documentElement.clientWidth;
      const currentWidth = e.pageX;
      const currentPosition = (currentWidth / clientWidth) * 100 + 1;

      if (currentWidth > 450 && currentPosition <= 50) {
        setWidth(currentPosition);
      }
    }
  }

  return (
    <div
      className='app'
      onMouseMove={handleDrag}
      onMouseUp={() => { setDragging(false); setCursor('auto'); setLineColor('#ddd') }}
      style={{ cursor: `${cursor}` }}>
      <SideBar width={width} lineColor={lineColor} setLineColor={setLineColor} dragging={dragging} setDragging={setDragging} setCursor={setCursor} />
      <GoogleMap status={status} width={width} />
    </div>
  );
}

export default App;