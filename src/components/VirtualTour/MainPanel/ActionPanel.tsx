import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

import * as CONSTANTS from "../../../constants";
import ImgBack from './../../../assets/images/SECRET.svg';
import playSvg from './../../../assets/images/play.svg';
import SelectTourDropDown from '../../../sharedComponents/SelectTourDropDown';
import PlayButton from '../../../sharedComponents/PlayButton';

type Props = {
  curPage: string,
  setPage: Function
}

const ActionPanel = ({curPage, setPage}: Props) => {
  if(curPage === CONSTANTS.CONNECTING_PAGE) {
    setTimeout(() => {
      setPage(CONSTANTS.CONNECTED_PAGE)
    }, 2000);  
  }

  return (    
    <Container>
      {curPage === CONSTANTS.TOUR_HOME_PAGE && (
        <>
          <div style={{visibility: "hidden"}}></div>              
          <h2>
            Tap <span style={{ fontWeight: 600 }}>‘Start’</span> to link up with
            your
            <br /> BURGESS sales broker
          </h2>
          <div style={{visibility: "hidden"}}></div>              
        </>
      )}
      {
        curPage === CONSTANTS.CONNECTING_PAGE && (
          <>
            <Connecting style={{visibility: 'hidden'}}>Connecting...</Connecting>
            <h2><span style={{fontWeight: 700}}>SECRET</span> has 87miles<br /> of electric cables...</h2>
            <Connecting>Connecting...</Connecting>            
          </>
        )
      }
      {
        curPage === CONSTANTS.CONNECTED_PAGE && (
          <>
            <h2 style={{fontWeight: 700}}>Welcome.</h2>
            <br />
            <h2 style={{fontWeight: 700}}>You are connected to <br />TIM VICKERS</h2>
            <br />
            <h2>AUDIO ON</h2>
          </>
        )
      }
      {
        curPage === CONSTANTS.TOUR_START_PAGE && (
          <>
            <h3>SECRET</h3>
            <p>VIRTUAL TOUR</p>
            <PlayButton>
              <Link to="/tour/view" target={"_blank"}>
                <img src={playSvg} style={{width: '40px', height: '40px'}}/>
              </Link>
            </PlayButton>
            <p>Powered By THEATRO 360</p>
          </>
        )
      }
      {
        (curPage === CONSTANTS.TOUR_PLAY_PAGE || 
          curPage === CONSTANTS.TOUR_PAUSE_PAGE || 
          curPage === CONSTANTS.TOUR_STOP_PAGE ) && (
          <SelectTourDropDown></SelectTourDropDown>
        )
      }

      {
        curPage === CONSTANTS.TOUR_PAUSE_PAGE && (          
          <PauseScreen>
            <div className="pause-btn"></div>
          </PauseScreen>
        )
      }

      {
        curPage === CONSTANTS.TOUR_STOP_PAGE && (          
          <PauseScreen>
            <h2>Are you sure you want to stop?</h2>
            <div className="pause-btn"></div>
            <p>This will disconnect your guided tour session with your <br /> BURGESS sales broker.</p>
            <p>You will be sent a link to the virtual tour and your <br />recorded session.</p>
          </PauseScreen>
        )
      }
    </Container>
  )
} 

const Container = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
  background-color: #2E2D2C;

  ::before {
    content: "";
    background-image: url('${ImgBack}');
    background-size: cover;
    background-position: center;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    opacity: 0.6;
  }

  h2 {  
    text-align: center;
    font-weight: 200;
    z-index: 1;
  }

  h3 {
    z-index: 1;
    font-size: 3rem;
  }

  p {
    font-size: 1.2rem;
    z-index: 1;
  }
`

const Connecting = styled.h2`
  padding-bottom: 90px;
`

const PauseScreen = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items:center;
  flex-direction: column;
  background-color: rgba(0,0,0, 0.4);
  z-index: 10;

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
export default ActionPanel;