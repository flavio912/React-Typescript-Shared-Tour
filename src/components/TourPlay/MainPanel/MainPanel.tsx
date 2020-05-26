import React, { useState } from "react";
import TourDropDown from "../../../sharedComponents/TourDropDown";
import styled from 'styled-components';
import * as CONSTANTS from "../../../constants";
import ActionPanel from "./ActionPanel";
import BtnPanel from "./BtnPanel";
import ArrowDropDown from "../../../sharedComponents/ArrowDropDown";

const MainPanel = () => {
  const [curPage, setCurPage] = useState(CONSTANTS.START_PAGE);

  const onClickStart = (selectedOne:string) => {
    setCurPage(CONSTANTS.CONNECTING_PAGE);
  };

  return (
    <div className="right-panel">
      <div className="d-flex justify-content-between">
        <h1 className="title">SECRET</h1>
        <div className="d-flex flex-column">
          <TourDropDown />
          <ArrowDropDown margin={'23px 0 0 0'}/>
        </div>
      </div>
      <h3 className="description">82.5m (270.6ft)</h3>
      <h3 className="description">
        2013 (refitted 2018), Abeking & Rasmussen, Germany
      </h3>
      <ActionPanel curPage={curPage} />
      <BtnPanel curPage={curPage} setPage={(selectedOne: string) => {onClickStart(selectedOne)}}/>
    </div>
  );
};

export default MainPanel;
