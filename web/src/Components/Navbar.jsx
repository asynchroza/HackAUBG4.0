import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";

const Navigation = () => {
  return (
    <Navbar variant="dark" className="justify-content-center">
        <Navbar.Brand href="/" className="remove-padding-brand">
            MOKKAI
        </Navbar.Brand>
    </Navbar>
  );
};

export default Navigation;
