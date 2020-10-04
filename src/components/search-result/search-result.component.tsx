import React from 'react';
import { useSelector } from 'react-redux';

import './search-result.styles.scss';
import SearchResultItems from '../search-result-items/search-result-items.component';

const SearchResult = () => {
    const places = Object.values(useSelector(state => state.places));

    const results = places.map(place => (
        <li key={place.place_id}><SearchResultItems place={place} /></li>
    ));

    return (
        <div className='search-result'>
            {places.length > 0
                ? <ul>{results}</ul>
                : <div>No sweets found.</div>
            }
        </div>
    )
}

export default SearchResult;