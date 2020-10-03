import React from 'react';
import { connect } from 'react-redux';

import './search-result.styles.scss';
import SearchResultItems from '../search-result-items/search-result-items.component';

const SearchResult = ({ places }) => {
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

const mapStateToProps = state => ({
    places: Object.values(state.places)
});

export default connect(mapStateToProps)(SearchResult);