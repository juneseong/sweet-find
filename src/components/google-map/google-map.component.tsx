import React from 'react';

import './google-map.styles.scss';

interface GoogleMapProps {
    status: string;
    width: number;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ status, width }) => {
    width = 100 - width;

    return (
        <div className={`map-container ${status}`} style={{ width: `${width}vw` }}>
            <div id='map' />
        </div>
    )
}

export default GoogleMap;