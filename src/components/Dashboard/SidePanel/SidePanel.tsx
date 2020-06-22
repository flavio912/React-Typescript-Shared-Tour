import React, { useState } from 'react';
import styled from 'styled-components';

import PendingSvg from '../../../assets/images/pending.svg';
import PendingActiveSvg from '../../../assets/images/pending-active.svg';
import ConnectedSvg from '../../../assets/images/connected.svg';
import ConnectedActiveSvg from '../../../assets/images/connected-active.svg';
import AvailableSvg from '../../../assets/images/available.svg';
import AvailableActiveSvg from '../../../assets/images/available-active.svg';
import UnavailableSvg from '../../../assets/images/unavailable.svg';
import UnavailableActiveSvg from '../../../assets/images/unavailable-active.svg';
import HistorySvg from '../../../assets/images/history.svg';
import HistoryActiveSvg from '../../../assets/images/history-active.svg';

type Props = {
  curTab: string,
  setTab: Function
}

const SidePanel = ({ curTab, setTab }: Props) => {
  return (
    <div className="side-panel">
      <div className="tabs">
        <TabItem className={"pending " + (curTab === 'Pending'? 'active': '')} onClick={() => setTab('Pending')}>
          <span>Pending</span>
        </TabItem>
        <TabItem className={"connected " + (curTab === 'Connected'? 'active': '')} onClick={() => setTab('Connected')}>
          <span>Connected</span>
        </TabItem>
        {/* <TabItem className={"available " + (curTab === 'available'? 'active': '')} onClick={() => setTab('available')}>
          <span>Available</span>
        </TabItem>
        <TabItem className={"unavailable " + (curTab === 'unavailable'? 'active': '')} onClick={() => setTab('unavailable')}>
          <span>Unavailable</span>
        </TabItem> */}
        <TabItem className={"history " + (curTab === 'Completed'? 'active': '')} onClick={() => setTab('Completed')}>
          <span>History</span>
        </TabItem>
      </div>
    </div>
  )
}

const TabItem = styled.div`
  height: 80px;
  background-repeat: no-repeat;
  background-position: center calc(50% - 3px);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 600;
  color: rgba(29, 53, 94, 0.55);
  cursor: pointer;
  padding: 0.5rem 0;

  &.active {
    background-color: rgba(0, 175, 211, 0.21);
  }

  &.pending {
    background-image: url('${PendingSvg}');

    :hover, &.active {
      background-image: url('${PendingActiveSvg}');
      color: rgb(29, 53, 94);
    }  
  }

  &.connected {
    background-image: url('${ConnectedSvg}');

    :hover, &.active {
      background-image: url('${ConnectedActiveSvg}');
      color: rgb(29, 53, 94);
    }  
  }

  &.available {
    background-image: url('${AvailableSvg}');

    :hover, &.active {
      background-image: url('${AvailableActiveSvg}');
      color: rgb(29, 53, 94);
    }  
  }

  &.unavailable {
    background-image: url('${UnavailableSvg}');

    :hover, &.active {
      background-image: url('${UnavailableActiveSvg}');
      color: rgb(29, 53, 94);
    }  
  }

  &.history {
    background-image: url('${HistorySvg}');

    :hover, &.active {
      background-image: url('${HistoryActiveSvg}');
      color: rgb(29, 53, 94);
    }  
  }

  @media (max-width: 991px) {
    height: 70px;
    font-size: 0.5rem;
    background-position: center calc(50% - 5px);
  }
`
export default SidePanel;