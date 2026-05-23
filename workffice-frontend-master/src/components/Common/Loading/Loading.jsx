import React from 'react'
import logo from '../../../assets/img/logo3.svg';

export const Loading = () => {
    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <img className="loading" src={logo}/>
        </div>
    )
}
