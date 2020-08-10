import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps, withRouter, useHistory } from "react-router-dom";
import { Alert, Spinner } from 'react-bootstrap';
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
declare var TourSDK;

const TourRequest = ({ location }: RouteComponentProps) => {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const [curTourUrl, setTourUrl] = useState('');
  const [alert, setAlert] = useState({isShow: false, status: '', msg: '', isRequestError: false});
  const [token, setToken] = useState('');
  const [requestId, setRequestId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params = qs.parse(location.search);
    const tourUrl = params['?url'];
    setToken(tourUrl.split('/').pop());
    setTourUrl(`${tourUrl}?sdk_enable=1&request_shared_tour_event=1`);
    
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
            // setAlert({
            //   ...alert,
            //   isShow: true, 
            //   status: 'danger', 
            //   isRequestError: true
            // });
            // window.setTimeout(() => {
            //   setAlert({...alert, isShow: false});
            // }, 5000);
          }
        })
        .catch((error) => {
          console.log(error);
        })
      }
    }
  }, [location.search]) // eslint-disable-line

  useEffect(() => {
    if(!curTourUrl || curTourUrl === '') return;

    const params = qs.parse(location.search);
    const tourUrl = params['?url'];
    const token = tourUrl.split('/').pop();
    const tourControl = new TourSDK(`#tour-${token}`, "https://tour.burgess-shared-tour.devserver.london");
    tourControl.on('REQUEST_SHARED_TOUR', () => {
      console.log('User has requested shared tour session');
      history.push(`/request-tour?url=${tourUrl}`);
    });
  }, [curTourUrl, history, location.search])

  const handleEnterCode = async(code: string) => {
    if(code.length === 4){
      setIsLoading(true);
      const data = {
        id: requestId,
        confirmCode: code,
      }
      const tour_session_verify_res = await RequestHelper.post(`/tour-session/request/verify`, data);
      if(!tour_session_verify_res.data.success){
        console.log(tour_session_verify_res.data.error);
        setAlert({
          ...alert,
          isShow: true, 
          status: 'danger', 
          msg: 'Invalid Code'
        });
        window.setTimeout(() => {
          setAlert({...alert, isShow: false});
        }, 3000);
      }else {
        dispatch(thankyouDialogAction(true));
      }
      setIsLoading(false);
    } else {
      dispatch(enterCodeDialogAction(true));
    }
  }

  return (
    <>
      {isLoading && (
        <CustomSpinner>
          <Spinner animation="border" variant="info" />
        </CustomSpinner>
      )}
      <NavMenu />
      <CustomContainer>
        <iframe id={`tour-${token}`} src={curTourUrl} width="100%" height="100%" style={{border: 'none'}} />
      </CustomContainer>
      <Alert variant="success" show={alert.isShow && alert.status==='success'}>{alert.msg}</Alert>
      <Alert variant="danger" show={alert.isShow && alert.status==='danger' && !alert.isRequestError}>{alert.msg}</Alert>
      {/* <Alert variant="danger" show={alert.isShow && alert.status==='danger' && alert.isRequestError}>
        Please log in to your console to view this content - 
        <Alert.Link href={`${CONFIG['BASE_URL']}/dashboard`}>{CONFIG['BASE_URL']}/dashboard</Alert.Link>
      </Alert> */}

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
  height: calc(100vh - 70px);

  @media screen and (max-width: 991px) {
    height: calc(100vh - 60px);
  }
`

const CustomSpinner = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(255,255,255, 0.4);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1100;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 10px #ddd;
`

export default withRouter(TourRequest);