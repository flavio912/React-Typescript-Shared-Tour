import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import { Link } from "react-router-dom";

const NavMenu = () => {
  return (
    <Navbar id="bugress-nav" bg="white" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="navbar-bugress">
        <Nav>
          <Nav.Link href="#home">Charter</Nav.Link>
          <Nav.Link href="#home">Buy</Nav.Link>
          <Nav.Link href="#home">Sell</Nav.Link>
          <Nav.Link href="#home">Build</Nav.Link>
          <Nav.Link href="#home">Manage</Nav.Link>
        </Nav>
        <Navbar.Brand className="bugres-brand" >
          <Link to="/">BURGESS</Link>
        </Navbar.Brand>
        <Nav>
          <Nav.Link href="#home">Charter</Nav.Link>
          <Nav.Link href="#home">Buy</Nav.Link>
          <Nav.Link href="#home">Sell</Nav.Link>
          <Nav.Link href="#home">Build</Nav.Link>
          <Nav.Link href="#home">Manage</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>  
  )
}

export default NavMenu;