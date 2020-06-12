import React from 'react';
import { Link } from "react-router-dom";
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

  return (
    <div className="tour-item d-flex">
      <div className="tour-image">
        <img src={tourInfo.tourThumbnail} />
        <button>
          <Link to={`/virtual-tour/${tourInfo.ID}`} target="_blank">
            <img src={PlaySvg} />
          </Link>
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
    </div>
  )
}

export default TourItem;