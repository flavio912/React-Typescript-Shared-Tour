import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from "react-bootstrap";
import styled from 'styled-components';

import RequestHelper from '../../../utils/Request.Utils';
import * as Constants from '../../../constants';
import UserImg from '../../../assets/images/left-back1.png';
import PhotoSvg from '../../../assets/images/photo.svg';
import MicSvg from '../../../assets/images/mic.svg';
import VolumnOn from '../../../assets/images/volumn-on.svg';
import ChatSvg from '../../../assets/images/chat.svg';
import ChatSvgDisableSvg from '../../../assets/images/chat-disable.svg';

declare var io;
declare var Twilio;

type Props = {
  tourSession: any;
}

const ChattingPanel = ({tourSession}: Props) => {
  let { id } = useParams();
  const { userInfo } = useSelector((state: any) => ({
    userInfo: state.user
  }))
  const [chatHistories, setChatHistories] = useState([]);
  const [socket, setSocket] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {    
    if(!userInfo.user.ID) return;

    async function fetchData() {
      let socketCode = '';
      const response = await RequestHelper.post(`/tour-session/${id}/start`, {});
      if(!response.data.success)
        console.log(response.data.error)
      else{
        socketCode = response.data.data.socketCode;
        setSocket(io(`api.burgess-shared-tour.devserver.london/${socketCode}`));

        initiateVoiceSetup(socketCode, userInfo.user.name);
        // receiving message
        // socket.on("ONLINE", (msg) => {
        //   console.log(msg);
        // });

        // // sending message out
        // socket.emit("ONLINE", {
        //   id: userInfo.user.ID,
        //   token: localStorage.token
        // });
      }
    }
    fetchData();
  },[userInfo.user.ID]) // eslint-disable-line

  useEffect(() => {
    async function fetchData() {
      const response = await RequestHelper.get(`/tour-session/${id}/messages`, {});
      if(!response.data.success){
        console.log(response.data.error);
      }else {
        let chat_histories = response.data.data.filter(item => item.action === 'CHAT').map(item => {return {...item, ...{payload: JSON.parse(item.payload)}}});
        setChatHistories(chat_histories);
      }
    }
    fetchData();
  }, [id])

  const handleSendMessage = () => {    
    socket.emit("CHAT", {
      message: newMessage
    });
    
    socket.on("CHAT", (res) => {
      setChatHistories([...chatHistories, {payload: {Name: res.Name, Message: res.Message}}])
    });

    setNewMessage('');    
  }

  const initiateVoiceSetup = (socketCode, name) => {
    const voiceName = `${socketCode}-${name}-${Date.now()}`;
    async function fetchData() {
      const response = await RequestHelper.post_voice('/token/generate', {name: voiceName});
      console.log(response);
      Twilio.Device.setup(response.data.token);
    }
    fetchData();
  }

  /* Callback to let us know Twilio Client is ready */
  Twilio.Device.ready((device) => {
    console.log("DEVICE READY");
  });

  /* Report any errors to the call status display */
  Twilio.Device.error((error) => {
    console.log("ERROR: " + error.message);
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
    console.log("INCOMING");
    // Set a callback to be executed when the connection is accepted
    connection.accept(function() {
      console.log("In call with someone");
    });

    // Set a callback on the answer button and enable it
    console.log(1);
  });

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
          <img className="ml-auto" src={VolumnOn} onClick={() => {console.log("Click Volumn")}}/>
          <img className="ml-auto" src={MicSvg} onClick={() => {console.log("Click Mic")}}/>
          <img className="ml-auto" src={PhotoSvg} onClick={() => {console.log("Click Camera")}}/>
        </div>
      </div>
      <div className="chatting-info d-flex flex-column pl-4 pr-2 py-2">
        <div className="chatting-history">
          {chatHistories.map((historyItem, nIndex) => (
                <div key={nIndex} className="chating-text-box py-2 pr-3">
                  <h5><ChatImg src={ChatSvgDisableSvg} />{historyItem?.payload.Name}</h5>
                  <p className="m-0">
                    {historyItem?.payload.Message}
                  </p>
                </div>
              )
            )
          }          
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
