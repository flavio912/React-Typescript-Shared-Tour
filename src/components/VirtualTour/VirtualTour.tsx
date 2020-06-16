import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import NavMenu from './../../sharedComponents/NavMenu';
import ChattingPanel from './ChattingPanel';
import MainPanel from './MainPanel';

import RegisterModal from '../../sharedComponents/RegisterModal';
import SigninModal from '../../sharedComponents/SigninModal';
import EnterCodeModal from '../../sharedComponents/EnterCodeModal';
import ThankyouModal from '../../sharedComponents/ThankyouModal';
import ForgotPasswordModal from '../../sharedComponents/ForgotPasswordModal';
import ResetPasswordModal from '../../sharedComponents/ResetPasswordModal';
import RequestHelper from '../../utils/Request.Utils';

const VirtualTour = () => {
  let { id } = useParams();
  const [tourSession, setTourSession] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await RequestHelper.get(`/tour-session/${id}`, {});
      if(!response.data.success) console.log(response.data.error);
      setTourSession(response.data.data);
    }
    fetchData();
  }, [id])

  return (
    <>
      <NavMenu />
      <div className="main-container container">
        <div className="main-page-section">
          <ChattingPanel tourSession={tourSession} />
          <MainPanel  tourSession={tourSession} />
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