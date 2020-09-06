import React, { useEffect, useRef } from 'react';
import './side-bar.styles.scss';

const SideBar = () => {
    const searchInput = useRef();

    useEffect(() => {
        searchInput.current.focus();
    }, []);

    return (
        <div className='side-bar'>
            <div className='logo'>
                <i className='fas fa-ice-cream'></i>
                <h1>sweet <span className='find'>find</span></h1>
            </div>
            <div className='search-bar'>
                <input 
                    ref={searchInput}
                    type='text' 
                    placeholder='Enter your address or zip code' 
                />
                <div className='search-button'>
                    <i className='fas fa-search'></i>
                </div>
            </div>
        </div>
    )
}

export default SideBar;