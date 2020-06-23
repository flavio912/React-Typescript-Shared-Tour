import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import CONFIG from '../../config';
import NavMenu from './../../sharedComponents/NavMenu';

const TourView = () => {
  const { token } = useParams();
  const embedUrl = `${CONFIG["TOUR_DEVSERVER_URL"]}/tour/${token}?sdk_enable=1`;

  return (
    <>
      <NavMenu />
      <Container>
        <iframe id={`tour-${token}`} src={embedUrl} width="100%" height="100%" style={{border: 'none'}} />
      </Container>
    </>
  )
}

const Container = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  height: calc(100vh - 97px);
`

export default TourView