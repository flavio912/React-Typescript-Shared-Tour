import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Button } from "react-bootstrap";
import styled from 'styled-components';

import RequestHelper from '../../../utils/Request.Utils';
import UserImg from '../../../assets/images/left-back1.png';
import PhotoSvg from '../../../assets/images/photo.svg';
import MicSvg from '../../../assets/images/mic.svg';
import VolumnOn from '../../../assets/images/volumn-on.svg';
import ChatSvg from '../../../assets/images/chat.svg';
import ChatSvgDisableSvg from '../../../assets/images/chat-disable.svg';

import io from '../../../utils/Socket.Utils';

const ChattingPanel = () => {
  let { id } = useParams();
  const [socketCode, setSocketCode] = useState('');
  const curUser = RequestHelper.getMe();
  const token = RequestHelper.getToken();

  useEffect(() => {
    console.log(id);
    RequestHelper
      .post(`/tour-session/${id}/start`, {})
      .then((res) => {
        if(res.data.success)
          setSocketCode(res.data.data.socketCode);
      })
      .catch(error => console.log(error));
  },[id])

  useEffect(() => {
    if(socketCode !== ''){
      // let socket = io("api.burgess-shared-tour.devserver.london"+"/"+socketCode);

      // removeSocketScript();

      // let script = document.createElement('script');
      // script.setAttribute('id', 'socketEmbed');

      // script.onload = () => {
      //   let newScript = document.createElement('script');
      //   newScript.setAttribute('id', 'socketScript');
      //   let inlineScript = document.createTextNode('var socketCode = "'+ socketCode +'"; var socket = io("api.burgess-shared-tour.devserver.london"+"/"+socketCode);');

      //   // Online Socket Script
      //   let socketOnlineScript = document.createTextNode('socket.on("ONLINE", function(msg){console.log("ONLINE:", msg);}); socket.emit("ONLINE", {id: '+curUser.ID+', token: "'+token+'"});');
      //   // Offline Socket Script
      //   let socketOfflineScript = document.createTextNode('socket.on("OFFLINE", function(msg){console.log("OFFLINE:", msg);});');
      //   // Chat socket script
      //   let socketChatScript = document.createTextNode('socket.emit("CHAT", {message: "testtest"}); socket.on("CHAT", function(data){console.log("CHAT:", data);});');
        
      //   newScript.appendChild(inlineScript); 
      //   newScript.appendChild(socketOnlineScript); 
      //   newScript.appendChild(socketOfflineScript); 
      //   newScript.appendChild(socketChatScript); 
      //   document.getElementsByTagName('head')[0].appendChild(newScript); 
      // };
  
      // script.src = "https://api.burgess-shared-tour.devserver.london/socket.js";
      // document.getElementsByTagName('head')[0].appendChild(script);
    }
  }, [socketCode]) // eslint-disable-line

  const removeSocketScript = () => {
    let socketEmbed = document.getElementById('socketEmbed');
    let socketScript = document.getElementById('socketScript');
    if (socketEmbed && socketScript) {
      socketEmbed.remove(); 
      socketScript.remove();
    }
  }

  return (
    <div className="left-panel d-flex flex-column mr-4">
      <div className="user-img h-20">
        <img src={UserImg} />        
      </div>
      <div className="control-div px-4 py-2 d-flex justify-content-between">
        <div className="d-flex flex-column pt-2">
          <h5 className="name mb-0">Tim Vickers</h5>          
          <p className="mb-0">Sales Broker</p>                  
          <p className="mb-0">Location: Monaco</p>
          <p className="mb-0">Speaks: English</p>  
        </div>                  
        <div className="d-flex flex-column justify-content-between">
          <img className="ml-auto" src={VolumnOn} onClick={() => {console.log("Click Volumn")}}/>
          <img className="ml-auto" src={MicSvg} onClick={() => {console.log("Click Mic")}}/>
          <img className="ml-auto" src={PhotoSvg} onClick={() => {console.log("Click Camera")}}/>
        </div>
      </div>
      <div className="chatting-info d-flex flex-column pl-4 pr-2 py-2">
        <div className="chatting-history">
          <div className="chating-text-box py-2 pr-3">
            <h5><ChatImg src={ChatSvg} />Tim Vickers</h5>
            <p className="m-0">
              Ad aut consequatur blanditiis iure molestiae consequuntur
              consequatur cum. Velit non sed voluptas in ut incidunt impedit.
              Incidunt reiciendis fugiat iste occaecati hic dicta quia.
              Consequuntur dicta autem molestiae quis id illum.
            </p>
          </div>
          <div className="chating-text-box py-2 pr-3">
            <h5><ChatImg src={ChatSvgDisableSvg} />You</h5>
            <p className="m-0">
              Ad aut consequatur blanditiis iure molestiae consequuntur
              consequatur cum. Velit non sed voluptas in ut incidunt impedit.
              Incidunt reiciendis fugiat iste occaecati hic dicta quia.
              Consequuntur dicta autem molestiae quis id illum.
            </p>
          </div>
          <div className="chating-text-box py-2 pr-3">
            <h5><ChatImg src={ChatSvg} />You</h5>
            <p className="m-0">
              Ad aut consequatur blanditiis iure molestiae consequuntur
              consequatur cum. Velit non sed voluptas in ut incidunt impedit.
              Incidunt reiciendis fugiat iste occaecati hic dicta quia.
              Consequuntur dicta autem molestiae quis id illum.
            </p>
          </div>
        </div>
        <div className="last-chat">
          <textarea className="mt-1" placeholder="Type a message"></textarea>
          <div className="btn-container d-flex justify-content-end">
            <Button className="btn-send btn-bugress-primary">Send</Button>
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
