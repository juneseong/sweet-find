import React from 'react';
import { useSelector } from 'react-redux';

import './search-result.styles.scss';
import SearchResultItems from '../search-result-items/search-result-items.component';
import { PlaceState } from '../../redux/place/place.reducer';

const SearchResult = () => {
    const places = Object.values(useSelector<PlaceState, PlaceState['places']>(state => state.places));

    const results = places.map((place, i) => (
        <li key={place.place_id}>
            <SearchResultItems place={place} number={i + 1} />
        </li>
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