import React from 'react';
import NavMenu from './../../sharedComponents/NavMenu';
import ChattingPanel from './ChattingPanel';
import MainPanel from './MainPanel';

import RegisterModal from '../../sharedComponents/RegisterModal';
import SigninModal from '../../sharedComponents/SigninModal';
import EnterCodeModal from '../../sharedComponents/EnterCodeModal';
import ThankyouModal from '../../sharedComponents/ThankyouModal';
import ForgotPasswordModal from '../../sharedComponents/ForgotPasswordModal';
import ResetPasswordModal from '../../sharedComponents/ResetPasswordModal';

const VirtualTour = () => {
  return (
    <>
      <NavMenu />
      <div className="main-container container">
        <div className="main-page-section">
          <ChattingPanel />
          <MainPanel />
        </div>        
      </div>
      <RegisterModal role="client" />
      <SigninModal role="all" />
      <EnterCodeModal />
      <ThankyouModal />
      <ForgotPasswordModal />
      <ResetPasswordModal />
    </>
  )
}

export default VirtualTour