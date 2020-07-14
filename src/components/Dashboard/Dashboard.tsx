import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Dropdown, Alert } from 'react-bootstrap';
import styled from 'styled-components';

import NavMenu from './../../sharedComponents/NavMenu';
import RegisterModal from '../../sharedComponents/RegisterModal';
import SigninModal from '../../sharedComponents/SigninModal';
import ThankyouModal from '../../sharedComponents/ThankyouModal';
import ForgotPasswordModal from '../../sharedComponents/ForgotPasswordModal';
import ResetPasswordModal from '../../sharedComponents/ResetPasswordModal';
import CustomLoading from '../../sharedComponents/CustomLoading';
import SidePanel from './SidePanel';
import TourItem from './TourItem';
import OptionPanel from '../../sharedComponents/OptionPanel';
import RequestHelper from '../../utils/Request.Utils';

const Dashboard = () => {
  const [curTab, setTab] = useState('Pending');
  const [showOptionPanel, setShowOptionPanel] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailAlert, setShowFailAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tourList, setTourList] = useState([]);

  const { userToken } = useSelector((state: any) => ({
    userToken: state.user.token
  }))

  useEffect(() => {
    if(!userToken) return;

    setIsLoading(true);
    RequestHelper
      .get('/tour-session/list?status='+curTab, null)
      .then((res) => {
        if(!res.data.success) {
          setShowFailAlert(true);
          setTourList([]);
          window.setTimeout(() => {setShowFailAlert(false)}, 2000);
        }else {
          let tourArray = res.data.data;
          tourArray.sort((a: any, b: any)=> {
            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
          })
          setTourList(tourArray);
        }
        setIsLoading(false);
      })
  }, [curTab, userToken])

  const handleChange = (selectedTab: string) => {
    setTab(selectedTab);
  }

  return (
    <>
      <NavMenu />
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
                {isLoading ? (
                  <CustomLoading />
                ) :(
                  tourList && tourList.length > 0 ?
                    (tourList.map((item, nIndex) => {
                      return (
                        <div className="col-md-6 mb-3 p-0 float-left" key={nIndex}>
                          <TourItem tourInfo={item} />
                        </div>
                      );
                    }))
                    : (<div className="no-result">You have no current guided tour requests.</div>)
                )}
              </div>
            </div>
          </MainPanel>
          { showOptionPanel ? 
            <OptionPanel isShow={showOptionPanel} hidePanel={() => setShowOptionPanel(false)} customStyle={{position: 'absolute', right: '2rem'}} />
          : null }
        </div>
      </div>
      
      <RegisterModal role="broker" />
      <SigninModal role="broker" />
      <ThankyouModal type="register" />
      <ForgotPasswordModal />
      <ResetPasswordModal />
      
      <Alert variant="success" show={showSuccessAlert}>Tour Request sent successfully!</Alert>
      <Alert variant="danger" show={showFailAlert}>Error! Permision Denied! You must login as a broker!</Alert>
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