import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark" className="fixed-top">
      <Container>
        <Navbar.Brand href="#home">
          {/* <img
            alt=""
            src="/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "} */}
          MOKKAI
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Navigation;
