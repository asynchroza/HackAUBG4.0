import React from "react";
import { Button } from "react-bootstrap";
import styles from "./Styles";
import RotateLogo from "../static/blackLogo.png";

const WelcomeBanner = () => {
  return (
    <div>
      <div className="banner-box">
        <div className="white-box-welcome">
          <img src={RotateLogo} className="rotate-logo" alt="" />
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
