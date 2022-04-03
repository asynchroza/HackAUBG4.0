import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Navigation from "./Navbar";
import styles from "./Styles";
const axios = require("axios").default;

const ChooseMock = (props) => {
  const getLocal = localStorage;
  const [formState, setFormState] = useState({
    str: "",
    number: 0,
    user_token: ""
  });
  const handleChange = (event) => {
    const target = event.target;
    const value = target.type == 'number' ? Number(target.value) : target.value;
    const name = target.name;

    setFormState ({
      ...formState,
      [name]:value
    });
    console.log(formState)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({...formState,user_token: getLocal.getItem("user")})
    axios({
      method: "post",
      url:`http://127.0.0.1:6969/get-interview/`, 
      headers:{},
      data:{...formState, user_token: getLocal.getItem("user")}
    })
    .then((res)=>{
      getLocal.setItem("uuid",res.data.uuid)
      window.location.href = '/mockinterview';
      console.log(res)
    })
    .catch((err)=>{
      console.log(err);
      console.log(err.response.data)
    });
  };

  return (
    <div className="container-for-all">
      <Navigation></Navigation>
      <div className="link-or-choose">
        <div className="link-paster">
          <div className="link-paster-row">
            <Form>
              <Form.Group>
                <Form.Label>
                  Paste a link to a LinkedIn job or input the language
                </Form.Label>
                <Form.Control
                  name="str" // name for first input
                  type="text"
                  onChange={handleChange}
                  placeholder="LinkedIn link, Programming language or the name of the job listing"
                ></Form.Control>
                <Form.Group className="group-form-number-qs">
                  <Form.Label>How many questions?</Form.Label>
                  <Form.Control
                    name="number" // name for second input
                    type="number"
                    placeholder="We recommend at least 15"
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>
              </Form.Group>
            </Form>
          </div>
        </div>
        <Button
          
          style={styles.customButton}
          type="submit"
          className="btn-generate"
          href="/mockinterview"
          onClick={handleSubmit}
        >
          Generate Mokk
        </Button>
      </div>
    </div>
  );
};

export default ChooseMock;
