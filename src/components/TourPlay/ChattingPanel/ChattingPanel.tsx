import React from "react";
import { Button } from "react-bootstrap";
import UserImg from '../../../assets/images/left-back1.png';
import PhotoSvg from '../../../assets/images/photo.svg';
import MicSvg from '../../../assets/images/mic.svg';
import VolumnOn from '../../../assets/images/volumn-on.svg';
import ChatSvg from '../../../assets/images/chat.svg';
import ChatSvgDisableSvg from '../../../assets/images/chat-disable.svg';
import styled from 'styled-components';

const ChattingPanel = () => {
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
          <img className="ml-auto mb-1" src={VolumnOn} onClick={() => {console.log("Click Volumn")}}/>
          <img className="ml-auto mb-1" src={MicSvg} onClick={() => {console.log("Click Mic")}}/>
          <img className="ml-auto mb-1" src={PhotoSvg} onClick={() => {console.log("Click Camera")}}/>
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
  width: 31.85px;
  height: 30.5px;
  margin-right: 10px;
`


export default ChattingPanel;
