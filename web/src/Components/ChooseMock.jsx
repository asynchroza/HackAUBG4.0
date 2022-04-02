import React from "react";
import { Form } from "react-bootstrap";
import Navigation from "./Navbar";

const ChooseMock = () => {
    return (
        <div className="container-for-all">
        <Navigation></Navigation>
        <div className="link-or-choose">
            <div className="link-paster">
                <div className="link-paster-row">
                    <h3 className="linkedin-text-h1">Paste a link to a LinkedIn job or input the language</h3>
                    <Form>
                        <Form.Group>
                            <Form.Control type="text" placeholder="LinkedIn link, Programming language or the name of the job listing"></Form.Control>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </div>
        </div>
    )
}

export default ChooseMock;