import React, { useEffect } from "react";
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

type Props = {
  tourSession: any;
}

const ChattingPanel = ({tourSession}: Props) => {
  let { id } = useParams();
  const { userInfo } = useSelector((state: any) => ({
    userInfo: state.user
  }))
console.log(userInfo);  
console.log(tourSession);
  useEffect(() => {    
    if(!userInfo.user.ID) return;

    async function fetchData() {
      let socketCode = '';
      const response = await RequestHelper.post(`/tour-session/${id}/start`, {});
      if(!response.data.success)
        console.log(response.data.error)
      else{
        socketCode = response.data.data.socketCode;
        let socket = io(`api.burgess-shared-tour.devserver.london/${socketCode}`);

        // receiving message
        socket.on("ONLINE", (msg) => {
          console.log(msg);
        });

        // sending message out
        socket.emit("ONLINE", {
          id: userInfo.user.ID,
          token: localStorage.token
        });

        socket.emit("CHAT", {
          message: "testtest"
        })

        socket.on("CHAT", (res) => {
          console.log(res);
        })
      }
    }
    fetchData();
  },[userInfo.user.ID]) // eslint-disable-line

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
