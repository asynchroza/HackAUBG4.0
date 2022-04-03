import React from 'react';
import Navigation from './Navbar';
import './LandingPage.css';
import styles from './Styles';
import {Button} from 'react-bootstrap';

const Graph = (props) => {
    return (
        <div className="container-for-all">
            <Navigation/>
            <div className='link-or-choose-graph'>
            
            <Button style={styles.customButton}>View your answers</Button>
            </div>
        </div>
    )
}

export default Graph;