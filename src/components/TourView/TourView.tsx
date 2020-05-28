import React from 'react';
import styled from 'styled-components';

import NavMenu from './../../sharedComponents/NavMenu';
import PlayButton from './../../sharedComponents/PlayButton';
import playSvg from './../../assets/images/play.svg';
import ImgBack from './../../assets/images/SECRET.svg';

const TourView = () => {
  return (
    <>
      <NavMenu />
      <Container>
        <h3>SECRET</h3>
        <p>VIRTUAL TOUR</p>
        <PlayButton>
          <img src={playSvg} style={{width: '40px', height: '40px'}}/>
        </PlayButton>
        <p>Powered By THEATRO 360</p>
      </Container>
    </>
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
  height: calc(100vh - 97px);

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

  h3 {
    z-index: 1;
    font-size: 3rem;
  }

  p {
    font-size: 1.2rem;
    z-index: 1;
  }
`

export default TourView