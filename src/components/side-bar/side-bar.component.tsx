import React from 'react';
import './side-bar.styles.scss';

import SearchResult from '../search-result/search-result.component';
import CustomSelect from '../custom-select/custom-select.component';

const SideBar = () => {

    return (
        <div className='side-bar'>
            <div className='logo-container'>
                <div className='logo'>
                    <img src="https://img.icons8.com/office/40/000000/ice-cream-cone.png" />
                    <h1>sweet find</h1>
                </div>
                <div className='select-container'>
                    <CustomSelect
                        options={['All', 'Coffee', 'Tea', 'Cake', 'Smoothie', 'Ice Cream', 'Frozen Yogurt', 'Bubble Tea']}
                    />
                    <CustomSelect
                        options={['Rating', 'Distance']}
                        initial='Sort by'
                    />
                </div>
            </div>
            <SearchResult />
        </div>
    )
}

export default SideBar;