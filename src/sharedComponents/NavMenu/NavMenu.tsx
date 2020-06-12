import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";

import { loginUserDialogAction } from '../../store/dialog/actions';
import RequestHelper from '../../utils/Request.Utils';
import UserSvg from '../../assets/images/users.svg';
import LogoutSvg from '../../assets/images/signs.svg';

type Props = {
  page?: string,
  loginUserDialogAction: Function
}

const NavMenu = ({page, loginUserDialogAction}: Props) => {
  const [userToken, setUserToken] = useState(RequestHelper.getToken());

  const { userInfo } = useSelector((state: any) => ({
    userInfo: state.user
  }))

  useEffect(() => {
    if(userToken === '')
      loginUserDialogAction(true);
  },[loginUserDialogAction, userToken])

  const handleLogout = () => {
    RequestHelper.removeToken();
    setUserToken('');
  }

  return (
    <Navbar id="bugress-nav" bg="white" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="navbar-bugress">
        {page === 'dashboard' ? (
          <Nav>
            <img src={UserSvg} />
            <span className="ml-2"></span>
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
            {(userToken !== '' || userInfo.token !== '') ? (
              <Nav.Link className="logout" onClick={() => handleLogout()}>
                <span className="mr-2">Logout</span>
                <img src={LogoutSvg} />
              </Nav.Link>
            ): (
              <Nav.Link className="login" onClick={() => loginUserDialogAction(true)}>
                <span className="mr-2">Login</span>
              </Nav.Link>
            )}
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

export default connect(null, {loginUserDialogAction})(NavMenu);