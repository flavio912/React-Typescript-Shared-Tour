import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from "react-bootstrap";
import styled from 'styled-components';

import { voiceChattingDialogAction } from '../../../store/dialog/actions';
import RequestHelper from '../../../utils/Request.Utils';
import { generateVoiceName } from '../../../utils/Common.Utils';
import * as Constants from '../../../constants';
import { DialogNames } from '../../../store/dialog/types';
import PhotoSvg from '../../../assets/images/photo.svg';
import MicSvg from '../../../assets/images/mic.svg';
import VoiceCallSvg from '../../../assets/images/voice-call.svg';
import VoiceCallActiveSvg from '../../../assets/images/voice-call-active.svg';
import ChatSvg from '../../../assets/images/chat.svg';
import ChatDisableSvg from '../../../assets/images/chat-disable.svg';
import DefaultAvatarSvg from '../../../assets/images/default-avatar-filled.svg';

declare var Twilio;

type Props = {
  isCalling: boolean
}

const ChattingPanel = ({isCalling}: Props) => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const { userInfo, dialogState, virtualTourState } = useSelector((state: any) => ({
    userInfo: state.user,
    dialogState: state.dialog,
    virtualTourState: state.virtualTour
  })); 
  const [chatHistories, setChatHistories] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chattingEndRef = useRef(null);
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await RequestHelper.get(`/tour-session/${id}/messages`, {});
      if(!response.data.success){
        console.log(response.data.error);
      }else {
        let chat_histories = response.data.data.filter(item => item.action === 'CHAT').map(item => {return {...item, ...{payload: JSON.parse(item.payload)}}}).reverse();
        setChatHistories(chat_histories);
        chattingEndRef.current.scrollIntoView(true);
      }
    }
    fetchData();
  }, [id, userInfo.token]); // eslint-disable-line

  useEffect(() => {
    if(!userInfo.user.role || !virtualTourState.tourSession) return;

    if(userInfo.user.role === Constants.UserRoles.broker) {
      if(virtualTourState.tourSession.broker.avatar)
        setAvatar(virtualTourState.tourSession.broker.avatar);
      else
        setAvatar(DefaultAvatarSvg);
    }else if (userInfo.user.role === Constants.UserRoles.client) {
      if(virtualTourState.tourSession.client.avatar)
        setAvatar(virtualTourState.tourSession.client.avatar);
      else
        setAvatar(DefaultAvatarSvg);
    }
  }, [userInfo.user.role, virtualTourState.tourSession])

  useEffect(() => {
    if(!virtualTourState.socket) return;

    const socket = virtualTourState.socket;
    socket.on("CHAT", (res) => {
      console.log("CHAT", "RECEIVED MESSAGES");
      setChatHistories([...chatHistories, {payload: {Name: res.Name, Message: res.Message}}]);
      chattingEndRef.current.scrollIntoView(true);
    });
  }, [virtualTourState.socket, chatHistories]);

  useEffect(() => {
    if(dialogState.name !== DialogNames.VOICE_CHATTING_DIALOG) return;

    switch (dialogState.action) {
      case Constants.VoiceCallActions.call:
        // Twilio.Device.connect({name: })
        break;
      case Constants.VoiceCallActions.accept:{
        if(!virtualTourState.twilioConnection) return;
        virtualTourState.twilioConnection.accept();
        
        virtualTourState.socket.emit("VOICE_READY", {
          deviceName: virtualTourState.twilioConnection.device._clientName
        })
        break;
      }
      case Constants.VoiceCallActions.hangup:
        Twilio.Device.disconnectAll();
        break;
      case Constants.VoiceCallActions.decline:
        Twilio.Device.disconnectAll();
        break;
      default:
        break;
    }
  }, [dialogState, virtualTourState.socket]) // eslint-disable-line

  const sendMessage = () => {
    if(!virtualTourState.socket) return;

    const socket = virtualTourState.socket;
    socket.emit("CHAT", {
      message: newMessage
    });
    setNewMessage('');
  }

  const startCall = () => {
    if(!virtualTourState.socketCode) return;

    if(virtualTourState.twilioConnection) {
      dispatch(voiceChattingDialogAction({isOpened: true, role: 'master', action: 'start'}));
      dispatch(voiceChattingDialogAction({isOpened: true, role: 'slave', action: 'start'}));
    }else {
      const socketCode = virtualTourState.socketCode;
      let connectName;
      if(userInfo.user.role === Constants.UserRoles.broker)
        connectName = generateVoiceName(socketCode, virtualTourState.tourSession.client.name);
      else if(userInfo.user.role === Constants.UserRoles.client)
        connectName = generateVoiceName(socketCode, virtualTourState.tourSession.broker.name);
  
      Twilio.Device.connect({ name: connectName });
      dispatch(voiceChattingDialogAction({isOpened: true, role: 'master', action: 'call'}));
    }
  }

  const sendMessageByEnter = (event) => {
    if(event.key === "Enter"){
      event.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="left-panel d-flex flex-column mr-4">
      <div className="user-img h-20">
        <img src={avatar} />
      </div>
      <div className="control-div px-4 py-2 d-flex justify-content-between">
        <div className="d-flex flex-column pt-2">
          {virtualTourState.tourSession && (userInfo.user.role === Constants.UserRoles.broker)?
            (
              <>
                <h5 className="name mb-0">{virtualTourState.tourSession.broker.name}</h5>
                <p className="mb-0">Sales Broker</p>
                <p className="mb-0">Location: {virtualTourState.tourSession.broker.country}</p>
                <p className="mb-0">Speaks: English</p>  
              </>
            ): null
          }
          {virtualTourState.tourSession && (userInfo.user.role === Constants.UserRoles.client)?
            (
              <>
                <h5 className="name mb-0">{virtualTourState.tourSession.client.name}</h5>
                <p className="mb-0">Client</p>
                <p className="mb-0">Location: {virtualTourState.tourSession.client.country}</p>
                <p className="mb-0">Speaks: English</p>  
              </>
            ): null
          }
        </div>                  
        <div className="d-flex flex-column justify-content-between">
          {!isCalling ?
            <div className="call-btn"><img className="ml-auto" src={VoiceCallSvg} onClick={() => startCall()}/></div>
            :
            <div className="call-btn calling"><img className="ml-auto" src={VoiceCallActiveSvg} onClick={() => startCall()}/></div>
          }

          {/* <img className="ml-auto" src={MicSvg} onClick={() => {console.log("Click Mic")}}/>
          <img className="ml-auto" src={PhotoSvg} onClick={() => {console.log("Click Camera")}}/> */}
        </div>
      </div>
      <div className="chatting-info d-flex flex-column pl-4 pr-2 py-2">
        <div className="chatting-history">
          <div className="message-wrapper">
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
        </div>
        <div className="last-chat">
          <textarea 
            className="my-1 float-left"
            placeholder="Type a message"
            value={newMessage}
            onKeyPress={(e) => sendMessageByEnter(e)}
            onChange={(e) => {
              setNewMessage(e.target.value);
            }}
          >
          </textarea>
          <div className="btn-container d-flex justify-content-end mt-1 w-100 float-left">
            <Button className="btn-send btn-bugress-primary" onClick={() => sendMessage()}>Send</Button>
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

  @media (max-width: 1199px) {
    width: 18px;
    height: 18px;
  }
`

export default ChattingPanel;
