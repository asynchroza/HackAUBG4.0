import React from 'react';
import Navigation from './Navbar';
import './LandingPage.css';

const Graph = (props) => {
    return (
        <div className="container-for-all">
            <Navigation/>
            <div className="link-or-choose-graph">
            </div>
        </div>
    )
}

export default Graph;