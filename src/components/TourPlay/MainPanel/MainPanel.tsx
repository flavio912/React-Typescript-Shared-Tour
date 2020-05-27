import React, { useState } from "react";
import TourDropDown from "../../../sharedComponents/TourDropDown";
import styled from 'styled-components';
import * as CONSTANTS from "../../../constants";
import ActionPanel from "./ActionPanel";
import BtnPanel from "./BtnPanel";
import OptionModal from "../../../sharedComponents/OptionModal";
import TransferModal from "../../../sharedComponents/TransferModal";
import { Button } from 'react-bootstrap';
import ArrowSVG from '../../../assets/images/arrow.svg';

const MainPanel = () => {
  const [curPage, setCurPage] = useState(CONSTANTS.TOUR_HOME_PAGE);
  const [showOptionModal, setShowOptionModal] = useState(false);

  const onClickStart = (selectedOne:string) => {
    setCurPage(selectedOne);
  };

  return (
    <div className="right-panel d-flex flex-column">
      <div className="main-header d-flex flex-column">
        <div className="d-flex justify-content-between">
          <h1 className="title">SECRET</h1>
          <div className="d-flex flex-column">
            <TourDropDown />
            {curPage !== CONSTANTS.TOUR_HOME_PAGE && (
              <ArrowBtn onClick={() => {setShowOptionModal(true)}}>
                <img src={ArrowSVG} style={{width: '39px', height: '35px',}}/>
              </ArrowBtn>
            )}
          </div>
        </div>
        <div className="d-flex flex-column">
          <h3 className="description">82.5m (270.6ft)</h3>
          <h3 className="description">
            2013 (refitted 2018), Abeking & Rasmussen, Germany
          </h3>
        </div>
      </div>
      <ActionPanel curPage={curPage} setPage={(selectedOne: string) => {onClickStart(selectedOne)}} />
      <BtnPanel curPage={curPage} setPage={(selectedOne: string) => {onClickStart(selectedOne)}}/>

      {/* <OptionModal isShow={showOptionModal} hideModal={() => setShowOptionModal(false)} /> */}
      <TransferModal isShow={showOptionModal} hideModal={() => setShowOptionModal(false)} />
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
`

export default MainPanel;
