import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Alert } from 'react-bootstrap';
import styled from 'styled-components';

import NavMenu from '../../sharedComponents/NavMenu';
import RequestHelper from '../../utils/Request.Utils';
import { 
  loginUserDialogAction,
  thankyouDialogAction,
  enterCodeDialogAction
} from '../../store/dialog/actions';
import RegisterModal from '../../sharedComponents/RegisterModal';
import SigninModal from '../../sharedComponents/SigninModal';
import ThankyouModal from '../../sharedComponents/ThankyouModal';
import ForgotPasswordModal from '../../sharedComponents/ForgotPasswordModal';
import ResetPasswordModal from '../../sharedComponents/ResetPasswordModal';
import EnterCodeModal from '../../sharedComponents/EnterCodeModal';

const qs = require('qs');

const TourRequest = ({ location }: RouteComponentProps) => {
  const dispatch = useDispatch();
  const [curTourUrl, setTourUrl] = useState('');
  const [alert, setAlert] = useState({isShow: false, status: '', msg: ''});
  const [token, setToken] = useState('');
  const [requestId, setRequestId] = useState('');

  useEffect(() => {
    const params = qs.parse(location.search);
    const tourUrl = params['?url'];
    setToken(tourUrl.split('/').pop());    
    setTourUrl(`${tourUrl}?sdk_enable=1&redirect_domain=burgess-shared-tour.devserver.london&redirect_ssl=1`);
    
    if(!localStorage.token){
      dispatch(loginUserDialogAction(true));
    }else {
      if(tourUrl !== '') {
        RequestHelper
        .post('/tour-session/request', {
          tourUrl: tourUrl,
          scheduleTime: new Date()
        })
        .then((res) => {
          if(res.data.success){
            setRequestId(res.data.data.requestId);
            dispatch(enterCodeDialogAction(true));
          }else {
            setAlert({isShow: true, status: 'danger', msg: res.data.error});
            window.setTimeout(() => {
              setAlert({...alert, isShow: false});
            }, 3000);
          }
        })
        .catch((error) => {
          console.log(error);
        })
      }
    }
  }, [location.search]) // eslint-disable-line

  const handleEnterCode = async(code: string) => {
    if(code.length === 4){
      const data = {
        id: requestId,
        confirmCode: code,
      }
      const tour_session_verify_res = await RequestHelper.post(`/tour-session/request/verify`, data);
      if(!tour_session_verify_res.data.success){
        console.log(tour_session_verify_res.data.error);
        setAlert({isShow: true, status: 'danger', msg: 'Invalid Code'});
        window.setTimeout(() => {
          setAlert({...alert, isShow: false});
        }, 3000);
      }else {
        dispatch(thankyouDialogAction(true));
      }
    } else {
      dispatch(enterCodeDialogAction(true));
    }
  }

  return (
    <>
      <NavMenu />
      <CustomContainer>
        <iframe id={`tour-${token}`} src={curTourUrl} width="100%" height="100%" style={{border: 'none'}} />
      </CustomContainer>
      <Alert variant="success" show={alert.isShow && alert.status==='success'}>{alert.msg}</Alert>
      <Alert variant="danger" show={alert.isShow && alert.status==='danger'}>{alert.msg}</Alert>

      <RegisterModal role="client" />
      <SigninModal role="client" />
      <ThankyouModal type="tour-session" />
      <ForgotPasswordModal />
      <ResetPasswordModal />
      <EnterCodeModal returnCode={(code: string) => handleEnterCode(code)} />
    </>
  )
}

const CustomContainer = styled.div`
  height: calc(100vh - 97px);

  @media screen and (max-width: 991px) {
    height: calc(100vh - 60px);
  }
`

export default withRouter(TourRequest);