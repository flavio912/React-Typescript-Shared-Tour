import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Alert, Spinner } from 'react-bootstrap';
import Moment from 'react-moment';
import styled from 'styled-components';

import * as CONSTANT from '../../../constants';
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
  const [alert, setAlert] = useState({isShow: false, status: '', msg: ''});
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { userInfo } = useSelector((state: any) => ({
    userInfo: state.user.user
  }))

  const confirmRequest = () => {
    if(tourInfo.status === CONSTANT.TOUR_STATUS.PENDING) {
      setIsLoading(true);

      if(userInfo.ID === tourInfo.broker.ID){
        history.push(`/virtual-tour/${tourInfo.ID}`);
      }else {
        RequestHelper
        .post('/tour-session/confirm-request', {id: tourInfo.ID})
        .then((res) => {
          if(!res.data.success) {
            setAlert({isShow: true, status: 'danger', msg: `Broker is currently reviewing ${tourInfo.tourName} - please try another tour`});
            window.setTimeout(() => {
              setAlert({...alert, isShow: false});
            }, 3000);
          }else {
            const tourId = res.data.data.ID;
            history.push(`/virtual-tour/${tourId}`);
          }
          setIsLoading(false);
        })
        .catch(error => console.log(error));  
      }      
    } else {
      history.push(`/virtual-tour/${tourInfo.ID}`);
    }
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
          <button onClick={() => confirmRequest()}>
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
            <Moment format="YYYY-MM-DD HH:mm">{tourInfo.updatedAt}</Moment>
          </div>
        </div>

        <Alert variant="danger" show={alert.isShow && alert.status=== 'danger'}>{alert.msg}</Alert>
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