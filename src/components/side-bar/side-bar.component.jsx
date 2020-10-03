import React from 'react';
import './side-bar.styles.scss';

import SearchResult from '../search-result/search-result.component';
import CustomSelect from '../custom-select/custom-select.component';

const SideBar = () => {

    return (
        <div className='side-bar'>
            <div className='logo-search-bar'>
                <div className='logo'>
                    <i className='fas fa-ice-cream'></i>
                    <h1>sweet <span className='find'>find</span></h1>
                </div>
                <CustomSelect
                    options={['All', 'Coffee', 'Tea', 'Cake', 'Smoothie', 'Ice Cream', 'Frozen Yogurt', 'Bubble Tea']}
                />
                <CustomSelect
                    options={['Rating', 'Distance']}
                    initial='Sort by'
                />
            </div>
            <SearchResult />
        </div>
    )
}

export default SideBar;