import React from 'react';

import './custom-checkbox.styles.scss';

const CustomCheckbox = ({ children, checked, setCheck }) => {
    const check = () => {
        if (checked) {
            return (
                <div className='check'>
                    <i className='fas fa-check'></i>
                </div>
            )
        }
    }

    return (
        <div 
            className='checkbox-container'
            onClick={() => setCheck(!checked)}>
            <div className='checkbox'>
                {check()}
            </div>
            {children}
        </div>
    )
};

export default CustomCheckbox;