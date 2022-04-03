import React from "react";
import Navigation from "./Navbar";
import { FormGroup, FormControl, Button } from "react-bootstrap";
import styles from "./Styles";
import { useState, useEffect } from "react";
import Graph from './Graph';
const axios = require("axios").default;


const Questions = () => {
  const [CQ, setCQ] = useState(-1);
  const [btnText, setBtnText] = useState("Next");
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [iData, setiData] = useState(null);
  const [loadingF, setLoadingF] = useState(false);

  useEffect(()=>{
    axios.get(`http://127.0.0.1:6969/get-interview/${localStorage.getItem("uuid")}`).then(res=>{
      console.log(res.data)
      setInterview(res.data);
      setLoading(false);
      setCQ(0);
    });
  }, []);


  const handleClick = () =>{

  }
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
  else if(interview && answers.length < interview['interview_set'].length){
    return (
      <div className="container-for-all">
        <Navigation></Navigation>
        <div className="link-or-choose">
          <div className={loading == true? "hidden-class":""}>
          <p className="questions-text-box">{interview['interview_set'][CQ]['question']}</p>
          <FormGroup>
            <FormControl onChange={(e)=>setAnswer(e.target.value)} type="text" value={answer} placeholder="Input answer here" />
          </FormGroup>
          <Button
            style={styles.customButton}
            className="btn-generate"
            onClick={() => {
              if (CQ+2> interview['interview_set'].length && btnText == "Finish") {
                  let q = interview['interview_set'][CQ];
                  q['answer'] = answer;
                  setAnswers([...answers, q])
                  setInterview({...interview, interview_set:[...answers,q]});
                  console.log({...interview, interview_set:[...answers,q]})
                  axios({
                    method: "post",
                    url:`http://127.0.0.1:6969/get-score/`, 
                    headers:{},
                    data:{...interview, interview_set:[...answers,q]}
                  })
                  .then((res)=>{
                    // window.location.href = '/mockinterview';
                    // getLocal.setItem("uuid",res.data.uuid)
                    console.log(res.data)
                  })
                  .catch((err)=>{
                    console.log(err);
                    console.log(err.response.data)
                  })

                  axios.get(`http://127.0.0.1:6969/get-interview-stats/${localStorage.getItem("user")}`)
                  .then(res=>{
                      setiData(res.data);
                      setLoadingF(true);
                  })
                }
              
              else if (CQ+2== interview['interview_set'].length) {
                let q = interview['interview_set'][CQ];
                q['answer'] = answer;
                setAnswers([...answers, q]);
                setAnswer("");
                setCQ(CQ+1);
                setBtnText("Finish");
              } else {
                let q = interview['interview_set'][CQ];
                q['answer'] = answer;
                setAnswers([...answers, q]);
                setAnswer("");
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
      <Graph handleClick={handleClick} data={iData}></Graph>
    )
  }

        return(
            <div>Test</div>
        )
  
};

export default Questions;
