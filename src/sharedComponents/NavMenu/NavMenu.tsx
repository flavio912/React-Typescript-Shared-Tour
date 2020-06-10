import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import { Link } from "react-router-dom";

import RequestHelper from '../../utils/Request.Utils';
import UserSvg from '../../assets/images/users.svg';
import LogoutSvg from '../../assets/images/signs.svg';

type Props = {
  page?: string
}

const NavMenu = ({page}: Props) => {

  const handleLogout = () => {
    RequestHelper.removeToken();
  }

  return (
    <Navbar id="bugress-nav" bg="white" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="navbar-bugress">
        {page === 'dashboard' ? (
          <Nav>
            <img src={UserSvg} />
            <span className="ml-2">Tim Vickers</span>
          </Nav>
        ): (
          <Nav>
            <Nav.Link href="#home">Charter</Nav.Link>
            <Nav.Link href="#home">Buy</Nav.Link>
            <Nav.Link href="#home">Sell</Nav.Link>
            <Nav.Link href="#home">Build</Nav.Link>
            <Nav.Link href="#home">Manage</Nav.Link>
          </Nav>
        )}        
        <Navbar.Brand className="bugres-brand" >
          <Link to="/">BURGESS</Link>
        </Navbar.Brand>
        
        {page === 'dashboard' ? (
          <Nav>
            <Nav.Link className="logout" onClick={() => handleLogout}>
              <span className="mr-2">Logout</span>
              <img src={LogoutSvg} />
            </Nav.Link>
          </Nav>
        ): (
          <Nav>
            <Nav.Link href="#home">Charter</Nav.Link>
            <Nav.Link href="#home">Buy</Nav.Link>
            <Nav.Link href="#home">Sell</Nav.Link>
            <Nav.Link href="#home">Build</Nav.Link>
            <Nav.Link href="#home">Manage</Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>  
  )
}

export default NavMenu;