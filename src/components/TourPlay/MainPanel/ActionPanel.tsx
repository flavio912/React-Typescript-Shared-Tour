import React from 'react';
import styled from 'styled-components';

import * as CONSTANTS from "../../../constants";
import ImgBack from './../../../assets/images/SECRET.svg';

type Props = {
  curPage: string,
  setPage: Function
}

const ActionPanel = ({curPage, setPage}: Props) => {
  if(curPage === CONSTANTS.CONNECTING_PAGE) {
    setTimeout(() => {
      setPage(CONSTANTS.CONNECTED_PAGE)
      //   curPage = CONSTANTS.CONNECTED_PAGE
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
            <br />
            <p>VIRTUAL TOUR</p>
            <p>Powered By THEATRO 360</p>
          </>
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
`

const Connecting = styled.h2`
  padding-bottom: 90px;
`
export default ActionPanel;