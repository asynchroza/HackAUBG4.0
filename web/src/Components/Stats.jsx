
import React from "react";
import Navigation from "./Navbar";
import { FormGroup, FormControl, Button } from "react-bootstrap";
import styles from "./Styles";
import { useState, useEffect } from "react";
import Graph from './Graph';
const axios = require("axios").default;


const Stats = (props) => {




  // questions arr to be changed with passed arr from back-end

    return (
      <div className="container-for-all">
        <Navigation></Navigation>
        <div className="link-or-choose">
          <div>
          <FormGroup>
          <ul>
              {props.data.interviews.map((inte, i)=>
                  <li key={i}>Interview {i+1}: {inte.score}</li>
              )}
          </ul>
          </FormGroup>
          </div>
        </div>
      </div>
      );
  
};

export default Stats;