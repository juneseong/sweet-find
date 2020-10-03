import React from 'react';
import './custom-select.styles.scss';

const CustomSelect = ({ options, initial }) => {
    initial = initial ? initial : options[0];

    return (
        <div className='custom-select'>
            {initial} <i className='fas fa-angle-down'></i>
        </div>
    )
};

export default CustomSelect;