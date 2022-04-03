import React from "react";
import Navigation from "./Navbar";
import { FormGroup, FormControl, Button } from "react-bootstrap";
import styles from "./Styles";
import { useState, useEffect } from "react";
import Graph from './Graph';
const axios = require("axios").default;


const AnswerView = () => {
  const [CQ, setCQ] = useState(-1);
  const [btnText, setBtnText] = useState("Next");
  const [userInterview, setUserInterview] = useState(null);
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    axios.get(`http://127.0.0.1:6969/get-user-answers/${localStorage.getItem("uuid")}`).then(res=>{
      setUserInterview(res.data);
    });

    axios.get(`http://127.0.0.1:6969/get-interview/${localStorage.getItem("uuid")}`).then(res=>{
        setInterview(res.data);
        setLoading(false);
        setCQ(0);
        console.log(userInterview);
        console.log(interview);
    });
  }, []);



  // questions arr to be changed with passed arr from back-end

  if(loading || CQ < 0){
    return (<div>
      <div className="container-for-all">
        <Navigation></Navigation>
        <div className="link-or-choose">
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
      </div>
    </div>);
  }
  else if(interview){
    console.log(interview);
    console.log(userInterview)
    return (
      <div className="container-for-all">
        <Navigation></Navigation>
        <div className="link-or-choose">
          <div className={loading == true? "hidden-class":""}>
          <p className="questions-text-box">{interview['interview_set'][CQ]['question']}</p>
          <FormGroup>
          <p className="answers-text-box">{userInterview['interview_set'][CQ]['answer']}</p>
          <p className="answers-text-box">{interview['interview_set'][CQ]['answer']}</p>
          </FormGroup>
          <Button
            style={styles.customButton}
            className="btn-generate"
            onClick={() => {
              if (CQ+2> interview['interview_set'].length) {
                  let q = interview['interview_set'][CQ];
                  console.log()
                }
               else {
                let q = interview['interview_set'][CQ];
                setCQ(CQ+1);
              }
            }}
          >
            {btnText}
          </Button>
          </div>
        </div>
      </div>
      );
  }
  console.log(interview)
    return(
        <div>
            Bla
        </div>
    )
  
};

export default AnswerView;
