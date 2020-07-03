import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

import NavMenu from './../../sharedComponents/NavMenu';
import ChattingPanel from './ChattingPanel';
import MainPanel from './MainPanel';
import { 
  setTourSessionAction, 
  setSocketCodeAction, 
  setSocketAction, 
  setTwilioConnectionAction,
  setTourControllerAction,
  setTourTokenAction,
  setEventTypeAction,
} from '../../store/virtualTour/actions';
import { 
  voiceChattingDialogAction,
} from '../../store/dialog/actions';

import RegisterModal from '../../sharedComponents/RegisterModal';
import SigninModal from '../../sharedComponents/SigninModal';
import ThankyouModal from '../../sharedComponents/ThankyouModal';
import ForgotPasswordModal from '../../sharedComponents/ForgotPasswordModal';
import ResetPasswordModal from '../../sharedComponents/ResetPasswordModal';
import VoiceChattingModal from '../../sharedComponents/VoiceChattingModal';
import RequestHelper from '../../utils/Request.Utils';
import { generateVoiceName } from '../../utils/Common.Utils';
import * as CONSTANTS from '../../constants';

declare var io;
declare var Twilio;

const VirtualTour = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const { userState, virtualTourState } = useSelector((state: any) => ({
    userState: state.user,
    virtualTourState: state.virtualTour
  }));
  const history = useHistory();
  const [twilioToken, setTwilioToken] = useState(null);
  const [alert, setAlert] = useState({isShow: false, status: 'success', msg: ''});

  useEffect(() => {
    if(!userState.token) return;

    async function fetchData() {
      const tour_session_res = await RequestHelper.get(`/tour-session/${id}`, {});
      if(!tour_session_res.data.success){
        console.log(tour_session_res.data.error);
        setAlert({isShow: true, status: 'danger', msg: tour_session_res.data.error});
        window.setTimeout(() => {
          setAlert({...alert, isShow: false});
        }, 3000);
      }else {
        dispatch(setTourSessionAction(tour_session_res.data.data));
        dispatch(setTourTokenAction(tour_session_res.data.data.tourUrl.split("/").pop()));
        dispatch(setEventTypeAction(CONSTANTS.VIRTUAL_TOUR_CONTROL_EVENT.INIT));
      }

      const tour_session_start_res = await RequestHelper.post(`/tour-session/${id}/start`, {});
      if(!tour_session_start_res.data.success){
        console.log(tour_session_start_res.data.error);
        setAlert({isShow: true, status: 'danger', msg: tour_session_start_res.data.error});
        window.setTimeout(() => {
          setAlert({...alert, isShow: false});
        }, 3000);
      }else {
        dispatch(setSocketCodeAction(tour_session_start_res.data.data.socketCode));
        dispatch(setSocketAction(io(`api.burgess-shared-tour.devserver.london/${tour_session_start_res.data.data.socketCode}`)));
        dispatch(setTourControllerAction(CONSTANTS.UserRoles.broker));
        localStorage.setItem("controller", CONSTANTS.UserRoles.broker);
        const voiceName = generateVoiceName(tour_session_start_res.data.data.socketCode, userState.user.name);
        initiateVoiceSetup(voiceName);
      }
    }
    fetchData();
  }, [id, userState.token]) // eslint-disable-line

  useEffect(() => {
    if(!virtualTourState.socket) return;

    const socket = virtualTourState.socket;
    // sending message out
    socket.emit("ONLINE", {
      id: userState.user.ID,
      token: localStorage.token
    });

    // receiving message
    socket.on("ONLINE", (msg) => {
      console.log("ONLINE", msg);      
    });

    socket.on("OFFLINE", (msg) => {
      console.log("OFFLINE", msg);
      dispatch(setEventTypeAction(CONSTANTS.VIRTUAL_TOUR_CONTROL_EVENT.INIT));

      if(userState.user.role !== localStorage.controller) {
        if(userState.user.role === CONSTANTS.UserRoles.broker)
          history.push("/dashboard");
        else
          history.push("/");
      }
    });

    socket.on("VOICE_READY", (msg) => {
      console.log("VOICE_READY", msg);
      dispatch(voiceChattingDialogAction({isOpened: true, role: 'master', action: 'start'}));
      dispatch(voiceChattingDialogAction({isOpened: true, role: 'slave', action: 'start'}));
    })
  }, [virtualTourState.socket]) // eslint-disable-line

  useEffect(() => {
    if(twilioToken === '') return;

    /* Callback to let us know Twilio Client is ready */
    Twilio.Device.ready((device) => {
      console.log("TWILIO DEVICE READY");
    });
  
    /* Report any errors to the call status display */
    Twilio.Device.error((error) => {
      console.log("TWILIO ERROR: " + error.message);
      const voiceName = generateVoiceName(virtualTourState.socketCode, userState.user.name);
      initiateVoiceSetup(voiceName);
    });
  
    /* Callback for when Twilio Client initiates a new connection */
    Twilio.Device.connect((connection) => {
      console.log("TWILIO CONNECT:", connection);
      dispatch(setTwilioConnectionAction(connection));
    });
  
    /* Callback for when a call ends */
    Twilio.Device.disconnect((connection) => {
      console.log("TWILIO DISCONNECT:", connection);
      dispatch(setTwilioConnectionAction(null));
      dispatch(voiceChattingDialogAction({isOpened: false, role: 'master', action: 'start'}));
      dispatch(voiceChattingDialogAction({isOpened: false, role: 'slave', action: 'start'}));
    });

    /* Callback for when Twilio Client receives a new incoming call */
    Twilio.Device.incoming((connection) => {
      console.log("INCOMING", connection);
      dispatch(voiceChattingDialogAction({isOpened: true, role: 'slave', action: 'call'}));
      dispatch(setTwilioConnectionAction(connection));

      // Set a callback to be executed when the connection is accepted
      connection.accept(function() {
        console.log("In call with someone");
      });
    });
  }, [twilioToken, voiceChattingDialogAction]); // eslint-disable-line

  const initiateVoiceSetup = async(voiceName) => {
    const response = await RequestHelper.post_voice('/token/generate', {name: voiceName});
    Twilio.Device.setup(response.data.token);
    setTwilioToken(response.data.token);
  }

  return (
    <>
      <NavMenu />
      <div className="main-container container">
        <div className="main-page-section">
          <ChattingPanel />
          <MainPanel />
        </div>        
      </div>

      <Alert variant="success" show={alert.isShow && alert.status==='success'}>{alert.msg}</Alert>
      <Alert variant="danger" show={alert.isShow && alert.status==='danger'}>{alert.msg}</Alert>

      <RegisterModal role="client" />
      <SigninModal role="all" />
      <ThankyouModal type="register" />
      <ForgotPasswordModal />
      <ResetPasswordModal />
      <VoiceChattingModal />      
    </>
  )
}

export default VirtualTour