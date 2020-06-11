import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import styled from 'styled-components';

import NavMenu from '../../sharedComponents/NavMenu';
const qs = require('qs');

const TourRequest = ({ location }: any) => {
  const [curTourUrl, setTourUrl] = useState('');

  useEffect(() => {
    const params = qs.parse(location.search);
    setTourUrl(params['?url']);
  }, [location.search])

  return (
    <>
      <NavMenu />
      <CustomContainer>
        <iframe src={curTourUrl} width="100%" height="100%" style={{border: 'none'}} />
      </CustomContainer>
    </>
  )
}

const CustomContainer = styled.div`
  height: calc(100vh - 97px);

  @media screen and (max-width: 991px) {
    height: calc(100vh - 60px);
  }
`

export default withRouter(TourRequest);