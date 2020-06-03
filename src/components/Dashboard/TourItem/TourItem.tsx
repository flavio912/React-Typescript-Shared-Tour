import React from 'react';
import { Link } from "react-router-dom";

import CardImg from './../../../assets/images/SECRET.svg';
import PlaySvg from '../../../assets/images/play.svg';

type Props = {
  data: {
    id: string,
    status: string,
    broker: string,
    client: string,
    email: string,
    telephone: string,
    name: string,
    date: string
  }
}

const TourItem = ({data}: Props) => {

  return (
    <div className="tour-item d-flex">
      <div className="tour-image">
        <img src={CardImg} />
        <button>
          <Link to="/tour">
            <img src={PlaySvg} />
          </Link>
        </button>
      </div>
      <div className="info">
        <div className="status">
          <label>Status:</label>
          <span className={data.status.toLowerCase()}>{data.status}</span>
        </div>
        <div className="broker">
          <label>Broker:</label>
          {data.broker}
        </div>
        <div className="client">
          <label>Client:</label>
          {data.client}
        </div>
        <div className="email">
          <label>Email:</label>
          {data.email}
        </div>
        <div className="telephone">
          <label>Telephone:</label>
          {data.telephone}
        </div>
        <div className="name">
          <label>Tour:</label>
          {data.name}
        </div>
        <div className="date">
          <label>Date/Time:</label>
          {data.date}
        </div>
      </div>
    </div>
  )
}

export default TourItem;