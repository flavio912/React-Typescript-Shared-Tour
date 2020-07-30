import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';

import CONFIG from '../../config';
import NavMenu from './../../sharedComponents/NavMenu';

declare var TourSDK;

const TourView = () => {
  const { token } = useParams();
  const history = useHistory();
  const embedUrl = `${CONFIG["TOUR_DEVSERVER_URL"]}/tour/${token}?sdk_enable=1&request_shared_tour_event=1`;

  useEffect(() => {
    if(!token) return;

    const tourControl = new TourSDK(`#tour-${token}`, "https://tour.burgess-shared-tour.devserver.london");
    tourControl.on('REQUEST_SHARED_TOUR', () => {
      console.log('User has requested shared tour session');
      history.push(`/request-tour?url=https://tour.burgess-shared-tour.devserver.london/tour/${token}`);
    });
  }, [token]) // eslint-disable-line

  
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