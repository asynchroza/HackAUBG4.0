import React from "react";
import { Form, Button } from "react-bootstrap";
import Navigation from "./Navbar";
import styles from "./Styles";

const ChooseMock = () => {
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
                  type="text"
                  placeholder="LinkedIn link, Programming language or the name of the job listing"
                ></Form.Control>
                <Form.Group className="group-form-number-qs">
                  <Form.Label>How many questions?</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="We recommend at least 15"
                  ></Form.Control>
                </Form.Group>
              </Form.Group>
            </Form>
          </div>
        </div>
        <Button style={styles.customButton} className="btn-generate" href="/mockinterview">
          Generate Mokk
        </Button>
      </div>
    </div>
  );
};

export default ChooseMock;
