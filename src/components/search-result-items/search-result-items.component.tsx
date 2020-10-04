import React from 'react';

import './search-result-items.styles.scss';

const SearchResultItems = ({ place }) => {

    const name = place.name.split(' ').map(name => (
        name[0].toUpperCase() + name.slice(1).toLowerCase()
    )).join(' ');

    if (place.photos) {
        return (
            <div className='place'>
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
        return null
    }
}

export default SearchResultItems;