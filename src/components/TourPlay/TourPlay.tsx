import React from 'react';
import NavMenu from './../../sharedComponents/NavMenu';
import ChattingPanel from './ChattingPanel';
import MainPanel from './MainPanel';

const TourPlay = () => {
  return (
    <>
      <NavMenu />
      <div className="main-container container">
        <div className="main-page-section">
          <ChattingPanel />
          <MainPanel />
        </div>        
      </div>
    </>
  )
}

export default TourPlay