import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import { Button } from 'react-bootstrap';
import styled from 'styled-components';

import { 
  setTourControllerAction,
  setEventTypeAction
} from '../../../store/virtualTour/actions';
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
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [curTour, setTour] = useState(null);
  const [embedUrl, setEmbedUrl] = useState('');
  const [tourToken, setTourToken] = useState('');
  const iframeRef = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const { virtualTourState, userState } = useSelector((state: any) => ({
    userState: state.user,
    virtualTourState: state.virtualTour
  })); 

  useEffect(() => {
    if(!virtualTourState.tourSession || !virtualTourState.socket || !virtualTourState.tourToken || !localStorage.controller) return;

    const socket = virtualTourState.socket;
    const selectedTour = CONSTANTS.HOME_TOURS.filter(tour => tour.name === virtualTourState.tourSession.tourName)[0];
    setTour(selectedTour);
    setTourToken(virtualTourState.tourToken);
    setEmbedUrl(`${CONFIG["TOUR_DEVSERVER_URL"]}/tour/${virtualTourState.tourToken}?sdk_enable=1`);

    socket.on("SWITCH_TOUR", data => {
      console.log("SWITCH_TOUR");
      const token = data.url.split("/").pop();
      const tour = CONSTANTS.HOME_TOURS.filter(tour => tour.token === token)[0];

      setTourToken(token);
      setEmbedUrl(`${data.url}?sdk_enable=1`);
      setTour(tour);
      dispatch(setEventTypeAction(CONSTANTS.VIRTUAL_TOUR_CONTROL_EVENT.INIT));
    })
  }, [virtualTourState.tourSession, virtualTourState.tourToken, virtualTourState.socket]) // eslint-disable-line

  useEffect(() => {
    initTourSession(virtualTourState.socket, tourToken);
  }, [tourToken, virtualTourState.socket, curTour]) // eslint-disable-line

  const handleEvent = (eventType) => {
    switch (eventType) {
      case CONSTANTS.VIRTUAL_TOUR_CONTROL_EVENT.INIT: {   
        virtualTourState.socket.emit("TOUR_CONTROL", {
          event: "THUMBNAIL_PLAY_CLICK",
          data: null
        })
        break;
      }
      case CONSTANTS.VIRTUAL_TOUR_CONTROL_EVENT.GOTO: {
        const win = window.open(`${CONFIG['BASE_URL']}/tour/view/${tourToken}` , '_blank');
        win.focus();
        dispatch(setEventTypeAction(CONSTANTS.VIRTUAL_TOUR_CONTROL_EVENT.GOTO));
        break;
      }
      case CONSTANTS.VIRTUAL_TOUR_CONTROL_EVENT.STOP: {
        virtualTourState.socket.disconnect();

        // if(userState.user.role === CONSTANTS.UserRoles.broker)
        //   history.push("/dashboard");
        // else
        //   history.push("/");
        break;
      }
      default:
        dispatch(setEventTypeAction(eventType));
        break;
    }
  };

  const initTourSession = (socket, token) => {
    if(!token || iframeRef.current.id !== `tour-${token}`) return;

    const tourControl = new TourSDK(`#tour-${token}`, "https://tour.burgess-shared-tour.devserver.london");
    tourControl.on('PLAYER_START_AUTO_SPIN', (data) => {
      // callback when the tour auto plays
      console.log('tour auto plays');
      if(userState.user.role === localStorage.controller){
        socket.emit("TOUR_CONTROL", {
          event: "PLAYER_START_AUTO_SPIN",
          data,
        });
      }
    });
  
    tourControl.on('PLAYER_STOP_AUTO_SPIN', (data) => {
      // callback when the tour stops auto play
      console.log('tour stops auto play');
      if(userState.user.role === localStorage.controller){
        socket.emit("TOUR_CONTROL", {
          event: "PLAYER_STOP_AUTO_SPIN",
          data,
        });
      }
    });
  
    tourControl.on('PLAYER_TRANSITION_TO', (data) => {
      console.log('tour player transition to');
      // callback when the tour navigate to somewhere
      if(userState.user.role === localStorage.controller){
        socket.emit("TOUR_CONTROL", {
          event: "PLAYER_TRANSITION_TO",
          data,
        });
      }
    });
 
    tourControl.on('PLAYER_TRANSITION_TO_IMMEDIATELY', (data) => {
      console.log('tour player transition to immediately');
      // callback when the tour navigate immediately to somewhere
      if(userState.user.role === localStorage.controller){
        socket.emit("TOUR_CONTROL", {
          event: 'PLAYER_TRANSITION_TO_IMMEDIATELY',
          data,
        });
      }
    });

    tourControl.on('THUMBNAIL_PLAY_CLICK', (data) => {
      console.log('thumbnail play click');
      // callback when the middle play icon is clicked
      if(userState.user.role !== localStorage.controller) {
        tourControl.lockControl();
      }

      socket.emit("TOUR_CONTROL", {
        event: 'THUMBNAIL_PLAY_CLICK',
        data: null,
      });
    });

    tourControl.on('SET_ACTIVE_HOTSPOT', (data) => {
      console.log('set active hotspot');
      console.log('SET_ACTIVE_HOTSPOT', data);
      // if(userState.user.role === localStorage.controller){
      //   socket.emit("TOUR_CONTROL", {
      //     event: 'SET_ACTIVE_HOTSPOT',
      //     data,
      //   });
      // }
    });
    
    // in client code, replicate the tour action when receiving socket event
    socket.on("TOUR_CONTROL", (data) => {
      console.log(data.event);      
      switch (data.event) {
        case "THUMBNAIL_PLAY_CLICK":{
          dispatch(setEventTypeAction(CONSTANTS.VIRTUAL_TOUR_CONTROL_EVENT.START));
          tourControl.thumbnailPlayClick();
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
        case "SET_ACTIVE_HOTSPOT":
          tourControl.setActiveHotspot(data.data);
          break;
        default:
          break;
      }        
    });

    socket.on("SWITCH_CONTROL_TO_CLIENT", data => {
      console.log("SWITCH_CONTROL_TO_CLIENT");
      dispatch(setTourControllerAction(CONSTANTS.UserRoles.client));
      localStorage.setItem("controller", CONSTANTS.UserRoles.client);

      if(userState.user.role === CONSTANTS.UserRoles.client)
        tourControl.unlockControl();
      else
        tourControl.lockControl();
    });

    socket.on("SWITCH_CONTROL_TO_BROKER", data => {
      console.log("SWITCH_CONTROL_TO_BROKER");
      dispatch(setTourControllerAction(CONSTANTS.UserRoles.broker));
      localStorage.setItem("controller", CONSTANTS.UserRoles.broker);

      if(userState.user.role === CONSTANTS.UserRoles.broker)
        tourControl.unlockControl();
      else
        tourControl.lockControl();
    });
  }

  const switchTour = (tour) => {
    setTourToken(tour.token);
    const embedUrl = `${CONFIG["TOUR_DEVSERVER_URL"]}/tour/${tour.token}`;
    virtualTourState.socket.emit("SWITCH_TOUR", {
      url: embedUrl
    })
  }

  const handleTransferControl = (isOk: boolean) => {    
    if(isOk) {
      if(localStorage.controller === CONSTANTS.UserRoles.broker)
        virtualTourState.socket.emit("SWITCH_CONTROL_TO_CLIENT");
      else
        virtualTourState.socket.emit("SWITCH_CONTROL_TO_BROKER");
    }
    setShowTransferModal(false);
  }

  return (
    <div className="right-panel d-flex flex-column">
      <div className="main-header d-flex flex-column">
        <div className="d-flex justify-content-between">
          <h1 className="title">{curTour? curTour.name: ''}</h1>
          <div className="d-flex flex-column">
            <TourDropDown 
              curTour={curTour}
              isDisable={userState.user.role === virtualTourState.controller? false: true}
              changeTour={(tour: any) => {switchTour(tour)}} 
            />
            {virtualTourState.eventType !== CONSTANTS.VIRTUAL_TOUR_CONTROL_EVENT.INIT && (
              <ArrowBtn 
                className={`${userState.user.role === virtualTourState.controller ? '': 'btn-disable'}`}
                onClick={() => {setShowTransferModal(true)}}
              >
                <img src={ArrowSVG} style={{width: '39px', height: '35px'}}/>
              </ArrowBtn>
            )}
          </div>
        </div>
        <div className="d-flex flex-column">
          <h3 className="description">{curTour?.info.length}</h3>
          <h3 className="description">
            {curTour?.info.year} {curTour?.info.content}
          </h3>
        </div>
      </div>
      <div style={{position: 'relative', flex: '1'}}>
        <iframe 
          title="virtual-tour"
          id={`tour-${tourToken}`} 
          ref={iframeRef} 
          src={embedUrl} 
          width="100%" 
          height="100%" 
          style={{border: 'none'}}
        />
        {virtualTourState.eventType === CONSTANTS.VIRTUAL_TOUR_CONTROL_EVENT.PAUSE && (
          <PauseScreen>
            <h2>Are you sure you want to stop?</h2>
            <div className="pause-btn"></div>
            <p>This will disconnect your guided tour session with your <br /> BURGESS sales broker.</p>
            <p>You will be sent a link to the virtual tour and your <br />recorded session.</p>
          </PauseScreen>
        )}
      </div>
      {/* <ActionPanel curPage={curPage} setPage={(selectedOne: string) => {onClickStart(selectedOne)}} /> */}
      <BtnPanel controller={virtualTourState.controller} handleEvent={(eventType: string) => {handleEvent(eventType)}}/>
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
const PauseScreen = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items:center;
  flex-direction: column;
  background-color: rgba(0,0,0, 0.8);
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  color: white;

  .pause-btn {
    box-sizing: border-box;
    height: 34px;
    border-color: transparent transparent transparent #FFF;
    transition: 100ms all ease;
    cursor: pointer;
    border-style: double;
    border-width: 0px 0 0px 30px;
  }

  h2 {
    font-weight: 700;
    margin-bottom: 3rem;
  }

  p {
    text-align: center;
    font-size: 1rem;
    margin-bottom: 0;
    margin-top: 1.5rem;
  }
`
export default MainPanel;
