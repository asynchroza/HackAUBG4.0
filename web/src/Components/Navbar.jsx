import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";

const Navigation = () => {
  return (
    <Navbar variant="dark" className="justify-content-center">
        <Navbar.Brand href="/">
          {/* <img
            alt=""
            src="/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "} */}
          MOKKAI
        </Navbar.Brand>
    </Navbar>
  );
};

export default Navigation;
