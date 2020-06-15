import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Alert, Spinner } from 'react-bootstrap';
import styled from 'styled-components';

import RequestHelper from '../../../utils/Request.Utils';
import PlaySvg from '../../../assets/images/play.svg';

type Props = {
  tourInfo: {
    ID: number,
    broker: {
      ID: number,
      avatar: string,
      country: string,
      email: string,
      name: string,
      phone: string,
      role: string,
      createdAt: string,
      updatedAt: string
    },
    brokerId: number,
    client: {
      ID: number,
      avatar: string,
      country: string,
      email: string,
      name: string,
      phone: string,
      role: string,
      createdAt: string,
      updatedAt: string
    },
    clientId: number,
    scheduleTime: string,
    socketCode: string,
    status: string,
    tourName: string,
    tourThumbnail: string,
    tourUrl: string,
    createdAt: string,
    updatedAt: string
  } 
}

const TourItem = ({tourInfo}: Props) => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailAlert, setShowFailAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const confirmRequest = (id: number) => {
    setIsLoading(true);
    RequestHelper
      .post('/tour-session/confirm-request', {id: id})
      .then((res) => {
        if(!res.data.success) {
          setShowFailAlert(true);
          window.setTimeout(() => {setShowFailAlert(false)}, 2000);
        }else {
          const tourId = res.data.data.ID;
          history.push(`/virtual-tour/${tourId}`);
        }
        setIsLoading(false);
      })
      .catch(error => console.log(error));
  }

  return (
    <>
      {isLoading? (
        <CustomSpinner>
          <Spinner animation="border" variant="info" />
        </CustomSpinner>
      ): null}
      <div className="tour-item d-flex">
        <div className="tour-image">
          <img src={tourInfo.tourThumbnail} />
          <button onClick={() => confirmRequest(tourInfo.ID)}>
            <img src={PlaySvg} />
          </button>
        </div>
        <div className="info">
          <div className="status">
            <label>Status:</label>
            <span className={tourInfo.status.toLowerCase()}>{tourInfo.status}</span>
          </div>
          <div className="broker">
            <label>Broker:</label>
            {tourInfo.broker.name}
          </div>
          <div className="client">
            <label>Client:</label>
            {tourInfo.client.name}
          </div>
          <div className="email">
            <label>Email:</label>
            {tourInfo.client.email}
          </div>
          <div className="telephone">
            <label>Telephone:</label>
            {tourInfo.client.phone}
          </div>
          <div className="name">
            <label>Tour:</label>
            {tourInfo.tourName}
          </div>
          <div className="date">
            <label>Date/Time:</label>
            {tourInfo.updatedAt}
          </div>
        </div>

        <Alert variant="success" show={showSuccessAlert}>Success! Confirm Request.</Alert>
        <Alert variant="danger" show={showFailAlert}>Error! Confirm Request.</Alert>
      </div>
    </>    
  )
}

const CustomSpinner = styled.div`
  width: 100%;
  height: 150px;
  background: rgba(255,255,255, 0.4);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 10px #ddd;

  @media (max-width: 1199px) {
    height: 120px;
  }

  @media (max-width: 991px) {
    width: 95%;
    height: 295px;
  }
`

export default TourItem;