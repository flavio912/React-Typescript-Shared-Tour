import React, { useState, useRef, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

import * as CONSTANTS from "../../../constants";
import CONFIG from '../../../config';
import ActionPanel from "./ActionPanel";
import BtnPanel from "./BtnPanel";
import TourDropDown from "../../../sharedComponents/TourDropDown";
import OptionModal from "../../../sharedComponents/OptionModal";
import TransferModal from "../../../sharedComponents/TransferModal";
import ArrowSVG from '../../../assets/images/arrow.svg';

declare var TourSDK;

const MainPanel = () => {
  const [curPage, setCurPage] = useState(CONSTANTS.TOUR_HOME_PAGE);
  const [showOptionModal, setShowOptionModal] = useState(false);
  const [curTour, setTour] = useState(CONSTANTS.HOME_TOURS[0]);
  const [embedUrl, setEmbedUrl] = useState('');
  const [tourToken, setTourToken] = useState('');
  const iframeRef = useRef(null);
  const [tourControl, setTourControl] = useState(null);

  const { virtualTourState, userState } = useSelector((state: any) => ({
    userState: state.user,
    virtualTourState: state.virtualTour
  })); 

  const onClickStart = (selectedOne:string) => {
    setCurPage(selectedOne);
  };

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
    setTourControl(tourControl);

    tourControl.on('PLAYER_START_AUTO_SPIN', (data) => {
      // callback when the tour auto plays
      console.log('tour auto plays');
    });
  
    tourControl.on('PLAYER_STOP_AUTO_SPIN', (data) => {
      // callback when the tour stops auto play
      console.log('tour stops auto play');
    });
  
    tourControl.on('PLAYER_TRANSITION_TO', (data) => {
      // callback when the tour navigate to somewhere
      console.log('PLAYER_TRANSITION_TO', data);
      socket.emit("TOUR_CONTROL", {
        event: "PLAYER_TRANSITION_TO",
        data,
      });
    });
 
    tourControl.on('PLAYER_TRANSITION_TO_IMMEDIATELY', (data) => {
      // callback when the tour navigate immediately to somewhere
      if(userState.user.role === CONSTANTS.UserRoles.broker){
        socket.emit("TOUR_CONTROL", {
          event: 'PLAYER_TRANSITION_TO_IMMEDIATELY',
          data,
        });
      }
    });

    tourControl.on('THUMBNAIL_PLAY_CLICK', (data) => {
      // callback when the middle play icon is clicked
      // console.log('THUMBNAIL_PLAY_CLICK', data);
    });
    
    // in client code, replicate the tour action when receiving socket event
    socket.on("TOUR_CONTROL", (data) => {
      if(userState.user.role !== CONSTANTS.UserRoles.client) return;

      switch (data.event) {
        case "THUMBNAIL_PLAY_CLICK":
          tourControl.thumbnailPlayClick();    
          break;
        case "PLAYER_TRANSITION_TO":
        case "PLAYER_TRANSITION_TO_IMMEDIATELY": {
          tourControl.transitionTo(data.data);
          break;
        }      
        default:
          break;
      }        
    });
  }, [virtualTourState.tourSession, tourToken, virtualTourState.socket]) // eslint-disable-line
  
  const clickPlayThumbnail = () => {
    // console.log(tourControl);
    tourControl.thumbnailPlayClick();
    virtualTourState.socket.emit("TOUR_CONTROL", {
      event: "THUMBNAIL_PLAY_CLICK",
      data: null
    })
  }

  const clickRandomGo = () => {
    const ids = ["1606", "1605", "7906", "7905"];
    const randomIndex = Math.floor(Math.random() * ids.length);
    tourControl.transitionTo([ ids[randomIndex] ]);
    // tourControl.startAutoSpin();
  }

  const changeTourSession = (tour) => {
    setTour(tour);
    // setTourSessionAction(tour);
  }

  return (
    <div className="right-panel d-flex flex-column">
      <div className="main-header d-flex flex-column">
        <div className="d-flex justify-content-between">
          <h1 className="title">{virtualTourState.tourSession? virtualTourState.tourSession.tourName: ''}</h1>
          <div className="d-flex flex-column">
            <TourDropDown curTour={curTour} changeTour={(tour: any) => {changeTourSession(tour)}} />
            {curPage !== CONSTANTS.TOUR_HOME_PAGE && (
              <ArrowBtn onClick={() => {setShowOptionModal(true)}}>
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
      {/* <ActionPanel tourSession={tourSession} curPage={curPage} setPage={(selectedOne: string) => {onClickStart(selectedOne)}} /> */}
      <BtnPanel curPage={curPage} setPage={(selectedOne: string) => {onClickStart(selectedOne)}}/>
      <OptionModal isShow={showOptionModal} hideModal={() => setShowOptionModal(false)} />
      {/* <TransferModal isShow={showOptionModal} hideModal={() => setShowOptionModal(false)} /> */}
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
