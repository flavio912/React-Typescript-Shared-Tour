import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from "react-bootstrap";
import styled from 'styled-components';

import { voiceChattingDialogAction } from '../../../store/dialog/actions';
import { setTwilioConnectionAction } from '../../../store/virtualTour/actions';
import RequestHelper from '../../../utils/Request.Utils';
import * as Constants from '../../../constants';
import { DialogNames } from '../../../store/dialog/types';
import PhotoSvg from '../../../assets/images/photo.svg';
import MicSvg from '../../../assets/images/mic.svg';
import VolumnOn from '../../../assets/images/volumn-on.svg';
import ChatSvg from '../../../assets/images/chat.svg';
import ChatDisableSvg from '../../../assets/images/chat-disable.svg';

declare var io;
declare var Twilio;

type Props = {
  tourSession: any;
}

const ChattingPanel = ({tourSession}: Props) => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const { userInfo, dialogState, virtualTourState } = useSelector((state: any) => ({
    userInfo: state.user,
    dialogState: state.dialog,
    virtualTourState: state.virtualTour
  })); 
  const [chatHistories, setChatHistories] = useState([]);
  const [socket, setSocket] = useState(null);
  const [socketCode, setSocketCode] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const chattingEndRef = useRef(null);
  const [twilioToken, setTwilioToken] = useState('');

  useEffect(() => {
    if(!userInfo.user.ID) {
      setChatHistories([]);
      return;
    }

    async function fetchData() {
      const response = await RequestHelper.post(`/tour-session/${id}/start`, {});
      if(!response.data.success)
        console.log(response.data.error)
      else{
        setSocketCode(response.data.data.socketCode);
        setSocket(io(`api.burgess-shared-tour.devserver.london/${response.data.data.socketCode}`));
        const voiceName = generateVoiceName(response.data.data.socketCode, userInfo.user.name);
        initiateVoiceSetup(voiceName);
      }
    }
    fetchData();
  },[userInfo.user.ID]) // eslint-disable-line

  useEffect(() => {
    if(!socket) return;

    // sending message out
    socket.emit("ONLINE", {
      id: userInfo.user.ID,
      token: localStorage.token
    });

    // receiving message
    socket.on("ONLINE", (msg) => {
      console.log(msg);
    });

    socket.on("VOICE_READY", (msg) => {
      console.log("VOICE_READY", msg);
    })
  }, [socket]) // eslint-disable-line

  useEffect(() => {
    if(!socket) return;

    socket.on("CHAT", (res) => {
      setChatHistories([...chatHistories, {payload: {Name: res.Name, Message: res.Message}}]);
      chattingEndRef.current.scrollIntoView(true);
    });
  }, [socket, chatHistories]);

  useEffect(() => {
    async function fetchData() {
      const response = await RequestHelper.get(`/tour-session/${id}/messages`, {});
      if(!response.data.success){
        console.log(response.data.error);
      }else {
        let chat_histories = response.data.data.filter(item => item.action === 'CHAT').map(item => {return {...item, ...{payload: JSON.parse(item.payload)}}});
        setChatHistories(chat_histories);
        chattingEndRef.current.scrollIntoView(true);
      }
    }
    fetchData();
  }, [id, userInfo.token]);

  useEffect(() => {
    if(twilioToken === '') return;

    /* Callback to let us know Twilio Client is ready */
    Twilio.Device.ready((device) => {
      console.log("DEVICE READY");
    });
  
    /* Report any errors to the call status display */
    Twilio.Device.error((error) => {
      console.log("ERROR: " + error.message);
      const voiceName = generateVoiceName(socketCode, userInfo.user.name);
      initiateVoiceSetup(voiceName);
    });
  
    /* Callback for when Twilio Client initiates a new connection */
    Twilio.Device.connect((connection) => {
      console.log(connection);
    });
  
    /* Callback for when a call ends */
    Twilio.Device.disconnect((connection) => {
      console.log(connection);
    });

    /* Callback for when Twilio Client receives a new incoming call */
    Twilio.Device.incoming((connection) => {
      console.log("INCOMING", connection);
      dispatch(voiceChattingDialogAction({isOpened: true, role: 'slave', action: 'call'}));
      dispatch(setTwilioConnectionAction(connection));

      // Set a callback to be executed when the connection is accepted
      connection.accept(function() {
        console.log("In call with someone");
        dispatch(voiceChattingDialogAction({isOpened: true, role: 'master', action: 'start'}));
        dispatch(voiceChattingDialogAction({isOpened: true, role: 'slave', action: 'start'}));
      });
    });
  }, [twilioToken, voiceChattingDialogAction]); // eslint-disable-line

  const handleAcceptCall = () => {
    if(!virtualTourState.connection) return;
    
    virtualTourState.connection.accept();
  }

  useEffect(() => {
    if(dialogState.name !== DialogNames.VOICE_CHATTING_DIALOG) return;

    switch (dialogState.action) {
      case Constants.VoiceCallActions.call:
        // Twilio.Device.connect({name: })
        break;
      case Constants.VoiceCallActions.accept:
        handleAcceptCall();
        break;
      case Constants.VoiceCallActions.hangup:
        Twilio.Device.disconnectAll();
        break;
      case Constants.VoiceCallActions.decline:
        Twilio.Device.disconnectAll();
        break;
      default:
        break;
    }
  }, [dialogState, handleAcceptCall]);

  const handleSendMessage = () => {    
    socket.emit("CHAT", {
      message: newMessage
    });
    setNewMessage('');    
  }

  const initiateVoiceSetup = (voiceName) => {
    async function fetchData() {
      const response = await RequestHelper.post_voice('/token/generate', {name: voiceName});
      Twilio.Device.setup(response.data.token);
      setTwilioToken(response.data.token);
    }
    fetchData();
  }

  const generateVoiceName = (socketCode, name) => {
    const voiceName = `${socketCode}-${name.replace(/\s/g,'')}`;
    return voiceName;
  }

  const handleVoiceCall = (socketCode) => {
    if(!socketCode) return;

    let connectName;
    if(userInfo.user.role === Constants.UserRoles.broker)
      connectName = generateVoiceName(socketCode, tourSession.client.name);
    else if(userInfo.user.role === Constants.UserRoles.client)
      connectName = generateVoiceName(socketCode, tourSession.broker.name);

    Twilio.Device.connect({ name: connectName });
    dispatch(voiceChattingDialogAction({isOpened: true, role: 'master', action: 'call'}));
  } 

  return (
    <div className="left-panel d-flex flex-column mr-4">
      <div className="user-img h-20">
        {tourSession && (userInfo.user.role === Constants.UserRoles.broker)?
          <img src={tourSession.broker.avatar} />: null
        }
        {tourSession && (userInfo.user.role === Constants.UserRoles.client)?
          <img src={tourSession.client.avatar} />: null
        }        
      </div>
      <div className="control-div px-4 py-2 d-flex justify-content-between">
        <div className="d-flex flex-column pt-2">
          {tourSession && (userInfo.user.role === Constants.UserRoles.broker)?
            (
              <>
                <h5 className="name mb-0">{tourSession.broker.name}</h5>
                <p className="mb-0">Sales Broker</p>
                <p className="mb-0">Location: {tourSession.broker.country}</p>
                <p className="mb-0">Speaks: English</p>  
              </>
            ): null
          }
          {tourSession && (userInfo.user.role === Constants.UserRoles.client)?
            (
              <>
                <h5 className="name mb-0">{tourSession.client.name}</h5>
                <p className="mb-0">Client</p>
                <p className="mb-0">Location: {tourSession.client.country}</p>
                <p className="mb-0">Speaks: English</p>  
              </>
            ): null
          }
        </div>                  
        <div className="d-flex flex-column justify-content-between">
          <img className="ml-auto" src={VolumnOn} onClick={() => handleVoiceCall(socketCode)}/>
          <img className="ml-auto" src={MicSvg} onClick={() => {console.log("Click Mic")}}/>
          <img className="ml-auto" src={PhotoSvg} onClick={() => {console.log("Click Camera")}}/>
        </div>
      </div>
      <div className="chatting-info d-flex flex-column pl-4 pr-2 py-2">
        <div className="chatting-history">
          {chatHistories.map((historyItem, nIndex) => (
            <div key={nIndex} className="chating-text-box py-2 pr-3">
              {userInfo.user.name === historyItem.payload.Name ?
                <h5><ChatImg src={ChatSvg} />Me</h5> : 
                <h5><ChatImg src={ChatDisableSvg} />{historyItem?.payload.Name}</h5>
              }
              <p className="m-0">
                {historyItem?.payload.Message}
              </p>
            </div>
          ))}
          <div ref={chattingEndRef} />
        </div>
        <div className="last-chat">
          <textarea 
            className="mt-1" 
            placeholder="Type a message"
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
            }}
          >
          </textarea>
          <div className="btn-container d-flex justify-content-end">
            <Button className="btn-send btn-bugress-primary" onClick={() => handleSendMessage()}>Send</Button>
          </div>
        </div>
      </div>    
    </div>
  );
};

const ChatImg = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`

export default ChattingPanel;
