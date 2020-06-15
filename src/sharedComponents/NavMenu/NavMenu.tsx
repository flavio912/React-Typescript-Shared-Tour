import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, withRouter } from "react-router-dom";

import { loginUserDialogAction, resetPasswordDialogAction } from '../../store/dialog/actions';
import RequestHelper from '../../utils/Request.Utils';
import UserSvg from '../../assets/images/users.svg';
import LogoutSvg from '../../assets/images/signs.svg';
const qs = require('qs');

type Props = {
  location: any,
  loginUserDialogAction: Function,
  resetPasswordDialogAction: Function
}

const NavMenu = ({location, loginUserDialogAction, resetPasswordDialogAction}: Props) => {
  const [curPath, setCurPath] = useState('');
  const [userToken, setUserToken] = useState(RequestHelper.getToken());
  const { userInfo } = useSelector((state: any) => ({
    userInfo: state.user
  }))

  useEffect(() => {
    setCurPath(location.pathname);
    if(location.pathname === '/reset-password') {
      const params = qs.parse(location.search);
      resetPasswordDialogAction({isOpened: true, code: params['?code']});
    }
    else {
      if(RequestHelper.getToken() === '')
        loginUserDialogAction(true);
    }
  }, [location, location.pathname, location.search, loginUserDialogAction, resetPasswordDialogAction])

  const handleLogout = () => {
    RequestHelper.removeToken();
    setUserToken('');
  }

  return (
    <Navbar id="bugress-nav" bg="white" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="navbar-bugress">
        {(curPath === '/dashboard' || curPath.slice(0, curPath.lastIndexOf('/')) === '/virtual-tour') ? (
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
        
        {(curPath === '/dashboard' || curPath.slice(0, curPath.lastIndexOf('/')) === '/virtual-tour') ? (
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

export default withRouter(connect(null, { loginUserDialogAction, resetPasswordDialogAction })(NavMenu));