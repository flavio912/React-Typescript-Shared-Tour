import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';

import NavMenu from './../../sharedComponents/NavMenu';
import TourList from './TourList';
import Editorial from './Editorial';
import RegisterModal from '../../sharedComponents/RegisterModal';
import SigninModal from '../../sharedComponents/SigninModal';
import EnterCodeModal from '../../sharedComponents/EnterCodeModal';
import ThankyouModal from '../../sharedComponents/ThankyouModal';

import HeaderBg from '../../assets/images/home-header.jpg';
import DegreeSvg from '../../assets/images/360-icon.svg';
import SharedDegreeSvg from '../../assets/images/shared-360.svg';
import DownArrowSvg from '../../assets/images/down-arrow.svg';
import RightArrowSvg from '../../assets/images/right-arrow.svg';
import VectorSvg from '../../assets/images/vectory.svg';
import FacebookSvg from '../../assets/images/facebook.svg';
import TwitterSvg from '../../assets/images/twitter.svg';
import InstagramSvg from '../../assets/images/instagram.svg';
import LinkedinSvg from '../../assets/images/linkedin.svg';
import YoutubeSvg from '../../assets/images/youtube.svg';

const Homepage = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showSigninModal, setShowSigninModal] = useState(false);
  const [showEnterCodeModal, setShowEnterCodeModal] = useState(false);
  const [showThankyouModal, setShowThankyouModal] = useState(false);

  const history = useHistory();
  const handleLogin = (param: string) => {
    setShowSigninModal(false);
    if(param === 'register')
      setShowRegisterModal(true);
    else
      history.push('/dashboard');
  }

  return (
    <>
      <NavMenu />
      <Container className="d-flex flex-column">
        <div className="header">
          <div className="header-content d-flex flex-column justify-content-between">
            <h1>Virtual yacht tours</h1>
            <div className="d-flex justify-content-center">
              <img src={DegreeSvg} style={{width: '80px', height: '80px'}} />
            </div>
            <div className="d-flex justify-content-between">
              <div className="view-tours d-flex align-items-center">
                <h4 className="mb-0 mr-2">View tours</h4>
                <img src={DownArrowSvg} style={{width: '40px', height: '40px'}} />
              </div>
              <div className="virtual-guide d-flex align-items-center">
                <h4 className="mb-0 mr-2">Virtual guide</h4>                
                <RegisterButton className="register-button" onClick={() => {setShowRegisterModal(true)}}>
                  <img src={SharedDegreeSvg} />
                </RegisterButton>
              </div>
            </div>
          </div>
        </div>
        <div className="main-content">
          <TourList />
          <Editorial />
          <SignupSection>
            <div className="d-flex flex-column justify-content-center align-items-center py-5">
              <h1>Sign up to our newsletter</h1>
              <div className="email-input col-md-6 d-flex mt-3">
                <input type="email" className="mr-2" placeholder="Enter your email address" />
                <SubmitButton>
                  <img src={RightArrowSvg} style={{width: '30px', height: '30px'}} />
                </SubmitButton>
              </div>
            </div>
          </SignupSection>
          <CountrySection>
            <div className="container py-5 d-flex flex-column justify-content-center align-items-center">
              <img src={VectorSvg} style={{width: '50px', height: '50px'}} />
              <div className="col-md-12 mt-5">
                <div className="row seven-cols">
                  <div className="col-md-1">
                    <h4>London</h4>
                    <p>+44 20 7766 4300</p>
                  </div>
                  <div className="col-md-1">
                    <h4>Monaco</h4>
                    <p>+377 97 97 81 21</p>
                  </div>
                  <div className="col-md-1">
                    <h4>New York</h4>
                    <p>+1 212 233 0410</p>
                  </div>
                  <div className="col-md-1">
                    <h4>Miami</h4>
                    <p>+1 305 672 0150</p>
                  </div>
                  <div className="col-md-1">
                    <h4>Dubai</h4>
                    <p>+9714 425 5874</p>
                  </div>
                  <div className="col-md-1">
                    <h4>Hong Kong</h4>
                    <p>+852 6496 2094</p>
                  </div>
                  <div className="col-md-1">
                    <h4>Beverly Hills</h4>
                    <p>+1 310 424 5112</p>
                  </div>
                </div>
                <div className="row seven-cols">
                  <div className="col-md-1">
                    <h4>Moscow</h4>
                    <p>+7 499 220 2402</p>
                  </div>
                  <div className="col-md-1">
                    <h4>Palma</h4>
                    <p>+34 971 495 413</p>
                  </div>
                  <div className="col-md-1">
                    <h4>Athens</h4>
                    <p>+30 210 967 1661</p>
                  </div>
                  <div className="col-md-1">
                    <h4>Singapore</h4>
                    <p>+65 9665 8990</p>
                  </div>
                  <div className="col-md-1">
                    <h4>Phuket</h4>
                    <p>+66 7623 9739</p>
                  </div>
                  <div className="col-md-1">
                    <h4>Tokyo</h4>
                    <p>+81 46 738 8612</p>
                  </div>
                  <div className="col-md-1">
                    <h4>Sydney</h4>
                    <p>+61 499 945 557</p>
                  </div>
                </div>
              </div>
            </div>
          </CountrySection>
        </div>
        <div className="footer p-5 d-flex justify-content-between align-items-center">
          <div className="footer-links">
            <a>Terms of use</a>
            <a>Privacy policy</a>
            <a>Careers</a>
            <a>Burgess app</a>
            <a>Sitemap</a>
            <span>&#169; 2020</span>
          </div>
          <div className="social-links">
            <a><img src={FacebookSvg} style={{width: '25px', height: '25px'}} /></a>
            <a><img src={TwitterSvg} style={{width: '25px', height: '25px'}} /></a>
            <a><img src={InstagramSvg} style={{width: '25px', height: '25px'}} /></a>
            <a><img src={LinkedinSvg} style={{width: '25px', height: '25px'}} /></a>
            <a><img src={YoutubeSvg} style={{width: '25px', height: '25px'}} /></a>
          </div>
        </div>
      </Container>

      <RegisterModal isShow={showRegisterModal} hideModal={() => {setShowRegisterModal(false); setShowSigninModal(true)}} userType="client" />
      <SigninModal isShow={showSigninModal} hideModal={(val: string) => handleLogin(val)} />
      <EnterCodeModal isShow={showEnterCodeModal} hideModal={() => setShowEnterCodeModal(false)} />
      <ThankyouModal isShow={showThankyouModal} hideModal={() => setShowThankyouModal(false)} />
    </>
  )
}

const Container = styled.div`
  width: 100%;
  flex: 1 0 auto;

  .header {
    background-image: url('${HeaderBg}');
    background-size: cover;
    background-position: center;
    height: 600px;
    padding: 4rem;
  }
`

const RegisterButton = styled.button`
  border: none;
  background: transparent;
  outline: none !important;
`

const SignupSection = styled.div`
  background-color: rgb(24,29,39);
  color: white;

  h1 {
    font-size: 1.5rem;
  }

  input {
    background: transparent;
    border: none;
    border-bottom: 1px solid white;
    color: white;
    flex: 1;
    outline: none;
    font-size: 0.8rem;
  }

  .email-input {
    flex: 1 0 auto;
  }
`

const SubmitButton = styled.button`
  background: transparent;
  border: none;
  outline: none !important;
  box-shadow: none;
`

const CountrySection = styled.div`
  background-color: white;

  h4 {
    font-size: 0.8rem;
    text-align: center;
    font-weight: bold;
  }

  p {
    font-size: 0.7rem;
    text-align: center;
  }
`
export default Homepage