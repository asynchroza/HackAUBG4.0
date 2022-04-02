import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Navigation from "./Navbar";
import styles from "./Styles";
const axios = require("axios").default;

const ChooseMock = () => {
  const getLocal = localStorage;
  const [formState, setFormState] = useState({});
  const onChange = (event) => {
    const target = event.target;
    const value = target.type;
    const name = target.name;

    formState = {
      //write some code here to create object to be passed
    };
  };

  const handleSubmit = (event) => {
    axios.post(`http://127.0.0.1:6969/get-interview/`, formState);
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
                  name="link"
                  type="text"
                  onChange={onChange}
                  placeholder="LinkedIn link, Programming language or the name of the job listing"
                ></Form.Control>
                <Form.Group className="group-form-number-qs">
                  <Form.Label>How many questions?</Form.Label>
                  <Form.Control
                    name="number"
                    type="number"
                    placeholder="We recommend at least 15"
                    onChange={onChange}
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
        >
          Generate Mokk
        </Button>
      </div>
    </div>
  );
};

export default ChooseMock;
