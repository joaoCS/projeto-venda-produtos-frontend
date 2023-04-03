import React from 'react';
import logo from '../../img/home-logo.jpg';
import './home.css';

export const Home = () => {
    return (
        <div >
            <img className='home-logo' src={logo} alt="" />
        </div>
    );
}