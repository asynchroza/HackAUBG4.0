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
            <ul>
                {props.data.interviews.map((inte, i)=>
                    <li key={i}>Interview {i+1}: {inte.score}</li>
                )}
            </ul>
            <Button style={styles.customButton} onClick={()=>{window.location.href = '/viewanswers';}}>View your answers</Button>
            </div>
        </div>
    )
}

export default Graph;