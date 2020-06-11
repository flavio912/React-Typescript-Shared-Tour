import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

import RegisterModal from '../../sharedComponents/RegisterModal';
import NavMenu from '../../sharedComponents/NavMenu';
import PlayButton from '../../sharedComponents/PlayButton';
import playSvg from './../../assets/images/play.svg';
import ImgBack from './../../assets/images/SECRET.svg';
import GreenOptionSvg from './../../assets/images/360-degree-green.svg';
import OrangeOptionSvg from './../../assets/images/360-degree-orange.svg';

const TourStart = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return (
    <>
      <NavMenu />
      <Container>
        <h3>HASNA</h3>
        <p>VIRTUAL TOUR</p>
        <PlayButton>
          <Link to="/tour/inside">
            <img src={playSvg} style={{width: '40px', height: '40px'}}/>
          </Link>
        </PlayButton>
        <p>Powered By THEATRO 360</p>
      </Container>
      <Option onClick={() => {setShowRegisterModal(true)}}></Option>
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

const Option = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  left: 0;
  bottom: 0;
  background-image: url('${GreenOptionSvg}');
  cursor: pointer;
  
  :hover {
    background-image: url('${OrangeOptionSvg}');
  }
`
export default TourStart