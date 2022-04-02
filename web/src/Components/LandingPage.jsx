import React from 'react';
import Navigation from './Navbar';
import './LandingPage.css';
import WelcomeBanner from './WelcomeBanner';

const LandingPage = () => {
    return (
        <div className='container-for-all'>
            <Navigation className="fixed-top"></Navigation>
            <WelcomeBanner></WelcomeBanner>
        </div>

    )
}

export default LandingPage;