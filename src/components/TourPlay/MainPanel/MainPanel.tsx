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
  const [curTour, setTour] = useState(CONSTANTS.HOME_TOURS[0]);

  const onClickStart = (selectedOne:string) => {
    setCurPage(selectedOne);
  };

  return (
    <div className="right-panel d-flex flex-column">
      <div className="main-header d-flex flex-column">
        <div className="d-flex justify-content-between">
          <h1 className="title">{curTour.name}</h1>
          <div className="d-flex flex-column">
            <TourDropDown curTour={curTour} isDisable changeTour={(tour: any) => setTour(tour)} />
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
      <ActionPanel curPage={curPage} setPage={(selectedOne: string) => {onClickStart(selectedOne)}} />
      <BtnPanel curPage={curPage} setPage={(selectedOne: string) => {onClickStart(selectedOne)}}/>

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
