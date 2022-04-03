import React from "react";
import { Button } from "react-bootstrap";
import styles from "./Styles";
import RotateLogo from "../Static/MOKKAI.png";

const WelcomeBanner = () => {
  return (
    <div>
      <div className="banner-box">
        <div className="white-box-welcome">
          <img src={RotateLogo} className="rotate-logo" alt="" />
          <div className="">
            <p>Mock interview platform powered by state of art AI <br/> Dedicated in helping you peek top performance during interviews<br/>Made by people who are taking interviews weekly for the ones who are afraid of weekly interviews</p> 
          </div>
          <Button
            style={styles.customButton}
            className="proceed-button"
            href="/typeofmock"
          >
            Get Started
          </Button>
        </div>
      </div>
      <div className="following-banner-box">
        <div className="following-banner-footer"></div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
