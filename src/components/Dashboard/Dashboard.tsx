import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import styled from 'styled-components';

import NavMenu from './../../sharedComponents/NavMenu';
import SidePanel from './SidePanel';
import TourItem from './TourItem';
import OptionPanel from '../../sharedComponents/OptionPanel';
import * as CONSTANTS from "../../constants";

const Dashboard = () => {
  const [curTab, setTab] = useState('pending');
  const [showOptionPanel, setShowOptionPanel] = useState(false);
  const tourList = CONSTANTS.TOURS.filter((item) => item.status.toLowerCase() === curTab);

  const handleChange = (selectedTab: string) => {
    setTab(selectedTab);
  }

  return (
    <>
      <NavMenu page="dashboard" />
      <div className="dashboard main-container container">
        <div className="main-page-section">
          <SidePanel curTab={curTab} setTab={(selectedTab: string) => {handleChange(selectedTab)}} />
          <MainPanel>
            <div className="content-wrapper">
              <div className="header d-flex justify-content-between align-items-center py-2 px-4">
                <h1 className="m-0">Dashboard</h1>
                <DropdownToggle variant="success" id="dropdown-basic" className="p-0" onClick={() => {setShowOptionPanel(!showOptionPanel)}}>
                  <Bar /><Bar /><Bar />
                </DropdownToggle>
              </div>
              <div className="content p-4">
                {tourList.map((item, nIndex) => {
                  return(
                    <div className="col-md-6 mb-3 p-0 float-left" key={nIndex}>
                      <TourItem data={item} />
                    </div>
                  );
                })}
              </div>
            </div>
          </MainPanel>
          { showOptionPanel ? 
            <OptionPanel isShow={showOptionPanel} hidePanel={() => setShowOptionPanel(false)} customStyle={{position: 'absolute', right: '2rem'}} />
          : null }
        </div>
      </div>
    </>
  )
}

const MainPanel = styled.div`
  padding-right: 2rem;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  position: relative;

  .content-wrapper {
    background: white;
    flex: 1;
  }
`

const DropdownToggle = styled(Dropdown.Toggle)`
  background: transparent !important;
  border: none;
  outline: none;
  box-shadow: none !important;
  line-height: 0;

  &:hover {
    background
  }
  &:before {
    display: none !important;
  }
  padding-top: 0;
`
const Bar = styled.div`
  width: 26px;
  height: 2px;
  background: #2E2D2C;
  margin-bottom: 6px;
  &:last-child {
    margin-bottom: 0
  }  
`
export default Dashboard