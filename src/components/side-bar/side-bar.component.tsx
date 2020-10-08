import React from 'react';
import './side-bar.styles.scss';

import SearchResult from '../search-result/search-result.component';
import CustomSelect from '../custom-select/custom-select.component';

interface SideBarProps {
    width: number;
    lineColor: string;
    setLineColor(value: string): void;
    dragging: boolean;
    setDragging(value: boolean): void;
    setCursor(value: string): void;
}

const SideBar: React.FC<SideBarProps> = ({ width, lineColor, setLineColor, dragging, setDragging, setCursor }) => {
    const handleDrag = (e: React.MouseEvent) => {
        setDragging(true);
        setLineColor('#f18f8f');
        setCursor('col-resize');
    }

    return (
        <div className='side-bar' style={{ width: `${width}vw` }}>
            <div
                className='resize-bar'
                onMouseDown={handleDrag}
                onMouseOver={() => setLineColor('#f18f8f')}
                onMouseLeave={() => { if (!dragging) setLineColor('#ddd') }}
                style={{ backgroundColor: `${lineColor}` }}
            />
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