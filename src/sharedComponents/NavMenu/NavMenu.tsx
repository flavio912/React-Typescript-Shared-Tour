import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap';
import { RouteComponentProps, Link, withRouter } from "react-router-dom";

import { loginUserDialogAction, resetPasswordDialogAction } from '../../store/dialog/actions';
import { updateUserAction, logoutUserAction } from '../../store/user/actions';
import RequestHelper from '../../utils/Request.Utils';
import UserSvg from '../../assets/images/users.svg';
import LogoutSvg from '../../assets/images/signs.svg';

const qs = require('qs');

const NavMenu = ({ location }: RouteComponentProps) => {
  const dispatch = useDispatch();
  const [curPath, setCurPath] = useState(location.pathname);
  const { userInfo } = useSelector((state: any) => ({
    userInfo: state.user
  }))

  useEffect(() => {
    if(location.pathname === '/reset-password') {
      const params = qs.parse(location.search);
      dispatch(resetPasswordDialogAction({isOpened: true, code: params['?code']}));
    } else {
      if(!localStorage.token) {
        dispatch(loginUserDialogAction(true));
      } else {
        if(userInfo.token === "") {
          // RequestHelper
          //   .post('/tour-session/clear-all/t3339yw4kn3vjmmz', {})
          //   .then((res) => {
          //     console.log(res.data);
          //   })
          //   .catch(error => console.log(error));
            
          RequestHelper
            .get('/users/me', {})
            .then((res) => {
              if(res.data.success) dispatch(updateUserAction({token: localStorage.token, user: res.data.data}));
            })
            .catch(error => console.log(error));
        }  
      }
    }
  }, []) // eslint-disable-line

  const handleLogout = () => {
    dispatch(logoutUserAction());
    dispatch(loginUserDialogAction(true));
  }

  return (
    <Navbar id="bugress-nav" bg="white" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="navbar-bugress">
        {(curPath === '/dashboard' || curPath.slice(0, curPath.lastIndexOf('/')) === '/virtual-tour') ? (
          <Nav>
            <img src={UserSvg} />
            <span className="ml-2">{userInfo.user.name}</span>
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
            {userInfo.token !== '' ? (
              <Nav.Link className="logout" onClick={() => handleLogout()}>
                <span className="mr-2">Logout</span>
                <img src={LogoutSvg} />
              </Nav.Link>
            ): (
              <Nav.Link className="login" onClick={() => {dispatch(loginUserDialogAction(true))}}>
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

export default withRouter(NavMenu);