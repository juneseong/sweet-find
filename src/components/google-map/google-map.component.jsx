import React from 'react';

import './google-map.styles.scss';

const GoogleMap = ({ status }) => {

    return (
        <div className={`map-container ${status}`}>
            <div id='map' />
        </div>
    )
}

export default GoogleMap;