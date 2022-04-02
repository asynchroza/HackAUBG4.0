import React from "react";
import dev_task_img from "../Static/proud_coder.svg";
import { Button } from "react-bootstrap";
import styles from "./Styles";

const WelcomeBanner = () => {
  return (
    <div>
      <div className="banner-box">
        <div className="white-box-welcome">
          <Button style={styles.customButton} className="proceed-button" href="/typeofmock">
            Proceed
          </Button>
        </div>
      </div>
      <div className="following-banner-box"></div>
    </div>
  );
};

export default WelcomeBanner;
