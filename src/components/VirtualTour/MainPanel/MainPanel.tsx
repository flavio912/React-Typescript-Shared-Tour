import React, { useState, useRef, useEffect } from "react";
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

type Props = {
  tourSession: any;
}

const MainPanel = ({tourSession}: Props) => {
  const [curPage, setCurPage] = useState(CONSTANTS.TOUR_HOME_PAGE);
  const [showOptionModal, setShowOptionModal] = useState(false);
  const [curTour, setTour] = useState(CONSTANTS.HOME_TOURS[0]);
  const [embedUrl, setEmbedUrl] = useState('');
  const [tourToken, setTourToken] = useState('');
  const iframeRef = useRef(null);
  const [tourControl, setTourControl] = useState(null);

  const onClickStart = (selectedOne:string) => {
    setCurPage(selectedOne);
  };

  useEffect(() => {
    if(!tourSession) return;

    let selectedTour = CONSTANTS.HOME_TOURS.filter(tour => tour.name === tourSession.tourName)[0];
    setTour(selectedTour);

    let token = tourSession.tourUrl.split("/").pop();
    setEmbedUrl(`${CONFIG["TOUR_DEVSERVER_URL"]}/tour/${token}?sdk_enable=1`);
    setTourToken(token);

    if(!token || iframeRef.current.id !== `tour-${token}`) return;

    let tourControl = new TourSDK(`#tour-${token}`);
    setTourControl(tourControl);
    tourControl.on('PLAYER_START_AUTO_SPIN', (data) => {
      // callback when the tour auto plays
    });
  
    tourControl.on('PLAYER_STOP_AUTO_SPIN', (data) => {
      // callback when the tour stops auto play
    });
  
    tourControl.on('PLAYER_TRANSITION_TO', (data) => {
      // callback when the tour navigate to somewhere
    });
  
    tourControl.on('PLAYER_TRANSITION_TO_IMMEDIATELY', (data) => {
      // callback when the tour navigate immediately to somewhere
    });
  
  }, [tourSession, tourToken])

  const testTourControl = () => {
    console.log(tourControl);
    tourControl.startAutospin();
  }

  return (
    <div className="right-panel d-flex flex-column">
      <div className="main-header d-flex flex-column">
        <div className="d-flex justify-content-between">
          <h1 className="title">{tourSession? tourSession.tourName: ''}</h1>
          <div className="d-flex flex-column">
            <TourDropDown curTour={curTour} changeTour={(tour: any) => setTour(tour)} />
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
      {/* <button onClick={() => testTourControl()}>test</button> */}
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
