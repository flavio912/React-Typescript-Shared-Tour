import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

import NavMenu from '../../sharedComponents/NavMenu';
import TourMenuDropDown from '../../sharedComponents/TourMenuDropDown';
import EnterCodeModal from '../../sharedComponents/EnterCodeModal';
import ChooseTourModal from '../../sharedComponents/ChooseTourModal';
import ImgBack from './../../assets/images/hasna.jpg';
import ArrowSvg from '../../assets/images/arrow-white.svg';
import PlayBtnSvg from '../../assets/images/play-white.svg';
import ShareBtnSvg  from '../../assets/images/share.svg';

const TourInside = () => {
  const [curMenu, setMenu] = useState('');
  const [showEnterCodeModal, setShowEnterCodeModal] = useState(false);
  const [showChooseTourModal, setShowChooseTourModal] = useState(false);

  const handleEnterCode = (val: string) => {
    setShowEnterCodeModal(false);
    if(val === 'next') setShowChooseTourModal(true);
  }

  return (
    <>
      <NavMenu />
      <Container>
        <TourMenuDropDown curMenu={curMenu} updateMenu={(menu: string) => setMenu(menu)}></TourMenuDropDown>
        <span className="current-menu">{curMenu}</span>
        <ControllBar>
          <div className="icons d-flex justify-content-between align-items-center">
            <div>
              <img src={ArrowSvg} onClick={() => setShowEnterCodeModal(true)} />
            </div>
            <img src={PlayBtnSvg} style={{width: '20px', height: '20px'}} />
            <div>
              <img src={ShareBtnSvg} style={{width: '20px', height: '20px'}} />
            </div>
          </div>
        </ControllBar>
      </Container>
      <EnterCodeModal />
      <ChooseTourModal isShow={showChooseTourModal} hideModal={() => setShowChooseTourModal(false)} />
    </>
  )
}

const Container = styled.div`
  flex: 1 1 auto;
  color: white;
  position: relative;
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
  }

  .current-menu {
    position: absolute;
    left: 260px;
    top: 10px;
    text-shadow: 2px 1px 10px rgba(150, 150, 150, 1);
  }
`

const ControllBar = styled.div`
  position: fixed;
  bottom: 0;
  height: 50px;
  width: 100%;
  
  ::before {
    content: "";
    background-color: rgba(0,0,0,0.5);
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .icons {
    position: relative;
    z-index: 10;
    height: 100%;
    padding: 0 5rem;

    img {
      cursor: pointer;
    }
  }
  
`
export default TourInside