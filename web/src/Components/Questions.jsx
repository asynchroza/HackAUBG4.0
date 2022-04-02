import React from "react";
import Navigation from "./Navbar";
import { FormGroup, FormControl, Button } from "react-bootstrap";
import styles from "./Styles";
import { useState } from "react";

const Questions = () => {
  const [CQ, setQ] = useState(0);
  const [btnText, setBtnText] = useState("Next");
  let index = 0;


  const questions = [
    "How do you reverse a linked list?",
    "How do you call when you search by level in a tree?",
  ];

  // questions arr to be changed with passed arr from back-end

  return (
    <div className="container-for-all">
      <Navigation></Navigation>
      <div className="link-or-choose">
        <div className="question-section"></div>
        <p className="questions-text-box">{questions[CQ]}</p>
        <FormGroup>
          <FormControl type="text" placeholder="Input answer here" />
        </FormGroup>
        <Button
          style={styles.customButton}
          className="btn-generate"
          onClick={() => {
            if (btnText == "Finish") {
                // generate resume
            }
            if (CQ + 1 >= questions.length - 1) {
              setQ(++index);
              setBtnText("Finish");
            } else {
              setQ(++index);
            }
          }}
        >
          {btnText}
        </Button>
      </div>
    </div>
  );
};

export default Questions;
