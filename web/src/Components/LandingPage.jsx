import React from 'react';
import Navigation from './Navbar';
import './LandingPage.css';
import LandingBox from './LandingBox';

const LandingPage = () => {
    return (
        <div className='container-for-all'>
            <Navigation className="fixed-top"></Navigation>
            <LandingBox></LandingBox>
        </div>

    )
}

export default LandingPage;