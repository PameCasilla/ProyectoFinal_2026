import React from 'react';
import '../../assets/scss/paper-dashboard/custom.scss';

export const ServEquipTarget = ({name}) => {
    return (
        <div className='containTarget'>
            <label>{name}</label>
        </div>
    )
}
