import React from 'react';

import './google-map.styles.scss';

interface GoogleMapProps {
    status: string
}

const GoogleMap: React.FC<GoogleMapProps> = ({ status }) => {

    return (
        <div className={`map-container ${status}`}>
            <div id='map' />
        </div>
    )
}

export default GoogleMap;