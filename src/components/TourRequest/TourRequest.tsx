import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Alert } from 'react-bootstrap';
import styled from 'styled-components';

import NavMenu from '../../sharedComponents/NavMenu';
import RequestHelper from '../../utils/Request.Utils';
import { loginUserDialogAction } from '../../store/dialog/actions';
import RegisterModal from '../../sharedComponents/RegisterModal';
import SigninModal from '../../sharedComponents/SigninModal';
import EnterCodeModal from '../../sharedComponents/EnterCodeModal';
import ThankyouModal from '../../sharedComponents/ThankyouModal';
import ForgotPasswordModal from '../../sharedComponents/ForgotPasswordModal';
import ResetPasswordModal from '../../sharedComponents/ResetPasswordModal';

const qs = require('qs');

type Props = {
  loginUserDialogAction: Function,
  location: any
}

const TourRequest = ({ location, loginUserDialogAction }: Props) => {
  const [curTourUrl, setTourUrl] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailAlert, setShowFailAlert] = useState(false);

  useEffect(() => {
    const token = RequestHelper.getToken();
    const params = qs.parse(location.search);
    setTourUrl(params['?url']);
    
    if(token === ''){
      loginUserDialogAction(true);
    }else {
      if(curTourUrl !== '') {
        RequestHelper
        .post('/tour-session/request', {
          tourUrl: curTourUrl,
          scheduleTime: new Date()
        })
        .then((res) => {
          if(res.data.success){
            setShowSuccessAlert(true);
            window.setTimeout(() => {setShowSuccessAlert(false)}, 3000);
          }else {
            setShowFailAlert(true);
            window.setTimeout(() => {setShowFailAlert(false)}, 3000);
          }
        })
        .catch((error) => {
          console.log(error);
        })
      }
    }
  }, [curTourUrl, location.search, loginUserDialogAction])

  return (
    <>
      <NavMenu />
      <CustomContainer>
        <iframe src={curTourUrl} width="100%" height="100%" style={{border: 'none'}} />
      </CustomContainer>
      <Alert variant="success" show={showSuccessAlert}>Tour Request sent successfully!</Alert>
      <Alert variant="danger" show={showFailAlert}>Error! Tour Request Error!</Alert>

      <RegisterModal role="client" />
      <SigninModal role="client" />
      <EnterCodeModal />
      <ThankyouModal />
      <ForgotPasswordModal />
      <ResetPasswordModal />
    </>
  )
}

const CustomContainer = styled.div`
  height: calc(100vh - 97px);

  @media screen and (max-width: 991px) {
    height: calc(100vh - 60px);
  }
`

export default withRouter(connect(null, { loginUserDialogAction })(TourRequest));