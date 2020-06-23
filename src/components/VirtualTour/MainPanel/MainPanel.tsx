import React, { useState, useRef, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

import * as CONSTANTS from "../../../constants";
import CONFIG from '../../../config';
import ActionPanel from "./ActionPanel";
import BtnPanel from "./BtnPanel";
import TourDropDown from "../../../sharedComponents/TourDropDown";
// import OptionModal from "../../../sharedComponents/OptionModal";
import TransferModal from "../../../sharedComponents/TransferModal";
import ArrowSVG from '../../../assets/images/arrow.svg';

declare var TourSDK;

const MainPanel = () => {
  const [eventType, setEventType] = useState(CONSTANTS.VIRTUAL_TOUR_CONTROL_EVENT.INIT);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [curTour, setTour] = useState(CONSTANTS.HOME_TOURS[0]);
  const [embedUrl, setEmbedUrl] = useState('');
  const [tourToken, setTourToken] = useState('');
  const [curController, setController] = useState(CONSTANTS.UserRoles.broker);
  const iframeRef = useRef(null);

  const { virtualTourState, userState } = useSelector((state: any) => ({
    userState: state.user,
    virtualTourState: state.virtualTour
  })); 

  useEffect(() => {
    if(!virtualTourState.tourSession || !virtualTourState.socket) return;

    const socket = virtualTourState.socket;
    const selectedTour = CONSTANTS.HOME_TOURS.filter(tour => tour.name === virtualTourState.tourSession.tourName)[0];
    setTour(selectedTour);

    const token = virtualTourState.tourSession.tourUrl.split("/").pop();
    setEmbedUrl(`${CONFIG["TOUR_DEVSERVER_URL"]}/tour/${token}?sdk_enable=1`);
    setTourToken(token);

    if(!token || iframeRef.current.id !== `tour-${token}`) return;
    const tourControl = new TourSDK(`#tour-${token}`, "https://tour.burgess-shared-tour.devserver.london");

    // if(userState.user.role === CONSTANTS.UserRoles.client) {
    //   tourControl.lockControl();
    // }

    tourControl.on('PLAYER_START_AUTO_SPIN', (data) => {
      // callback when the tour auto plays
      console.log('tour auto plays');
      if(userState.user.role === curController){
        socket.emit("TOUR_CONTROL", {
          event: "PLAYER_START_AUTO_SPIN",
          data,
        });
      }
    });
  
    tourControl.on('PLAYER_STOP_AUTO_SPIN', (data) => {
      // callback when the tour stops auto play
      console.log('tour stops auto play');
      if(userState.user.role === curController){
        socket.emit("TOUR_CONTROL", {
          event: "PLAYER_STOP_AUTO_SPIN",
          data,
        });
      }
    });
  
    tourControl.on('PLAYER_TRANSITION_TO', (data) => {
      // callback when the tour navigate to somewhere
      if(userState.user.role === curController){
        socket.emit("TOUR_CONTROL", {
          event: "PLAYER_TRANSITION_TO",
          data,
        });
      }
    });
 
    tourControl.on('PLAYER_TRANSITION_TO_IMMEDIATELY', (data) => {
      // callback when the tour navigate immediately to somewhere
      // if(userState.user.role === curController){
      //   socket.emit("TOUR_CONTROL", {
      //     event: 'PLAYER_TRANSITION_TO_IMMEDIATELY',
      //     data,
      //   });
      // }
    });

    tourControl.on('THUMBNAIL_PLAY_CLICK', (data) => {
      // callback when the middle play icon is clicked
      console.log('THUMBNAIL_PLAY_CLICK', data);
    });
    
    // in client code, replicate the tour action when receiving socket event
    socket.on("TOUR_CONTROL", (data) => {
      switch (data.event) {
        case "THUMBNAIL_PLAY_CLICK":{
          tourControl.thumbnailPlayClick();
          setEventType(CONSTANTS.VIRTUAL_TOUR_CONTROL_EVENT.START);
          break;
        }
        case "PLAYER_TRANSITION_TO":
        case "PLAYER_TRANSITION_TO_IMMEDIATELY": {
          tourControl.transitionTo(data.data);
          break;
        }
        case "PLAYER_START_AUTO_SPIN":
          tourControl.startAutoSpin();
          break;
        case "PLAYER_STOP_AUTO_SPIN":
          tourControl.stopAutoSpin();
          break;
        default:
          break;
      }        
    });

    socket.on("SWITCH_CONTROL_TO_CLIENT", data => {
      setController(CONSTANTS.UserRoles.client);
    });
    socket.on("SWITCH_CONTROL_TO_BROKER", data => {
      setController(CONSTANTS.UserRoles.broker);
    });
  }, [virtualTourState.tourSession, tourToken, virtualTourState.socket]) // eslint-disable-line

  const handleEvent = (eventType: string) => {
    if(eventType === CONSTANTS.VIRTUAL_TOUR_CONTROL_EVENT.INIT){
      virtualTourState.socket.emit("TOUR_CONTROL", {
        event: "THUMBNAIL_PLAY_CLICK",
        data: null
      })
    }else {
      if(eventType === CONSTANTS.VIRTUAL_TOUR_CONTROL_EVENT.GOTO) {
        const win = window.open(`${CONFIG['BASE_URL']}/tour/view/${tourToken}` , '_blank');
        win.focus();
      }

      setEventType(eventType);
    }
  };

  const changeTourSession = (tour) => {
    setTour(tour);
    // setTourSessionAction(tour);
  }

  const handleTransferControl = (isOk: boolean) => {
    console.log(curController);
    if(isOk) {
      if(curController === CONSTANTS.UserRoles.broker)
        virtualTourState.socket.emit("SWITCH_CONTROL_TO_CLIENT");
      else if(curController === CONSTANTS.UserRoles.client)
        virtualTourState.socket.emit("SWITCH_CONTROL_TO_BROKER");
    }
    setShowTransferModal(false);    
  }

  return (
    <div className="right-panel d-flex flex-column">
      <div className="main-header d-flex flex-column">
        <div className="d-flex justify-content-between">
          <h1 className="title">{virtualTourState.tourSession? virtualTourState.tourSession.tourName: ''}</h1>
          <div className="d-flex flex-column">
            <TourDropDown 
              curTour={curTour}
              isDisable={userState.user.role === curController? false: true}
              changeTour={(tour: any) => {changeTourSession(tour)}} 
            />
            {eventType !== CONSTANTS.VIRTUAL_TOUR_CONTROL_EVENT.INIT && (
              <ArrowBtn 
                className={`${userState.user.role === curController ? '': 'btn-disable'}`}
                onClick={() => {setShowTransferModal(true)}}
              >
                <img src={ArrowSVG} style={{width: '39px', height: '35px'}}/>
              </ArrowBtn>
            )}
          </div>
        </div>
        <div className="d-flex flex-column">
          <h3 className="description">{curTour.info.length}</h3>
          <h3 className="description">
            {curTour.info.year} {curTour.info.content}
          </h3>
        </div>
      </div>
      <iframe id={`tour-${tourToken}`} ref={iframeRef} src={embedUrl} width="100%" height="100%" style={{border: 'none'}} />
      {/* <ActionPanel curPage={curPage} setPage={(selectedOne: string) => {onClickStart(selectedOne)}} /> */}
      <BtnPanel controller={curController} status={eventType} handleEvent={(eventType: string) => {handleEvent(eventType)}}/>
      {/* <OptionModal isShow={showOptionModal} hideModal={() => setShowOptionModal(false)} /> */}
      <TransferModal isShow={showTransferModal} hideModal={(isOk: boolean) => handleTransferControl(isOk)} />
    </div>
  );
};

const ArrowBtn = styled(Button)`
  margin-top: 1rem;
  background: transparent !important;
  border: 0 !important;
  outline: none !important;
  box-shadow: none !important;
  padding: 0;
  cursor: pointer;
  &:after {
    display: none;
  }

  @media screen and (max-width: 991px) {
    margin-top: 0.5rem;
  }
`

export default MainPanel;
