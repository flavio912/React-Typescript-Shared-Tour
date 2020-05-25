import React from 'react';
import styled from 'styled-components';

import * as CONSTANTS from "../../../constants";
import ImgBack from './../../../assets/images/left-back1.png';

type Props = {
  curPage: string
}

const ActionPanel = ({curPage}: Props) => {

  return (    
    <Container style={{
      backgroundImage: `url('${ImgBack}')`,
      justifyContent: 'space-between'
    }}>
      {curPage === CONSTANTS.START_PAGE && (
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
            <Connecting style={{visibility: 'hidden'}}>Conneting...</Connecting>            
            <h2><span style={{fontWeight: 700}}>SECRET</span> has 87miles<br /> of electric cables...</h2>
            <Connecting>Conneting...</Connecting>            
          </>
        )
      }
    </Container>
  )
}

const Container = styled.div`
  background-size: 100% 100%;
  background-repeat: no;
  background-position: center center;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;

  h2 {  
    text-align: center;
    font-size: 40px;
    font-weight: 200;
  }
`

const Connecting = styled.h2`
  padding-bottom: 90px;
`
export default ActionPanel;