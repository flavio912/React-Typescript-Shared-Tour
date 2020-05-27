import React, { useState } from "react";
import TourDropDown from "../../../sharedComponents/TourDropDown";
import styled from 'styled-components';
import * as CONSTANTS from "../../../constants";
import ActionPanel from "./ActionPanel";
import BtnPanel from "./BtnPanel";
import OptionModal from "../../../sharedComponents/OptionModal";
import { Button } from 'react-bootstrap';
import ArrowSVG from '../../../assets/images/two-arrow.png';

const MainPanel = () => {
  const [curPage, setCurPage] = useState(CONSTANTS.WELCOME_PAGE);
  const [showOptionModal, setShowOptionModal] = useState(false);

  const onClickStart = (selectedOne:string) => {
    setCurPage(CONSTANTS.CONNECTING_PAGE);
  };

  return (
    <div className="right-panel">
      <div className="d-flex justify-content-between">
        <h1 className="title">SECRET</h1>
        <div className="d-flex flex-column">
          <TourDropDown />
          <ArrowBtn onClick={() => {setShowOptionModal(true)}}>
            <img src={ArrowSVG} style={{width: '34px', height: '26px',}}/>
          </ArrowBtn>
        </div>
      </div>
      <h3 className="description">82.5m (270.6ft)</h3>
      <h3 className="description">
        2013 (refitted 2018), Abeking & Rasmussen, Germany
      </h3>
      <ActionPanel curPage={curPage} />
      <BtnPanel curPage={curPage} setPage={(selectedOne: string) => {onClickStart(selectedOne)}}/>

      <OptionModal isShow={showOptionModal} hideModal={() => setShowOptionModal(false)} />
    </div>
  );
};

const ArrowBtn = styled(Button)`
  margin: 23px 0 0 0;
  background: transparent !important;
  border: 0 !important;
  outline: none !important;
  box-shadow: none !important;
  padding: 0;
  cursor: pointer;
  &:after {
    display: none;
  }
`

export default MainPanel;
