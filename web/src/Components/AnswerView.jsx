import React from "react";
import Navigation from "./Navbar";
import { FormGroup, FormControl, Button } from "react-bootstrap";
import styles from "./Styles";
import { useState, useEffect } from "react";
import Stats from './Stats';
const axios = require("axios").default;


const AnswerView = () => {
  const [CQ, setCQ] = useState(-1);
  const [btnText, setBtnText] = useState("Next");
  const [userInterview, setUserInterview] = useState(null);
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingF, setLoadingF] = useState(false);
  const [iData, setiData] = useState(null);

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
  else if(interview && !iData){
    console.log(interview);
    console.log(userInterview)
    return (
      <div className="container-for-all">
        <Navigation></Navigation>
        <div className="link-or-choose-bigger">
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
                //   axios.get(`http://127.0.0.1:6969/get-interview-stats/${localStorage.getItem("user")}`)
                //   .then(res=>{
                //       setiData(res.data);
                //       setLoadingF(true);
                //   })
                }
                else if(CQ+2==interview['interview_set'].length){
                let q = interview['interview_set'][CQ];
                setCQ(CQ+1);
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
  else if(loadingF){
    return(
        <Stats data={iData}></Stats>
    )
    }
    else{
        return(
            <div>Test</div>
        )
    }
};

export default AnswerView;
