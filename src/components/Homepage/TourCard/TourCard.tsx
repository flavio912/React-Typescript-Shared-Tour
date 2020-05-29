import React from 'react';
import styled from 'styled-components';
import CardImg from './../../../assets/images/SECRET.svg';

type Props = {
  data: {
    name: string,
    type: string,
    info: {
      length: string,
      year: number,
      content: string
    },
    imgUrl: string
  }
}

const TourCard = ({data}: Props) => {

  return (
    <div className="tour-card">
      <img src={CardImg} style={{width: '100%'}} />
      <h1>{data.name}</h1>
      <p>{data.type}</p>
      <p>{data.info.length}, {data.info.year}, {data.info.content}</p>
      <a>Take the tour ></a>
    </div>
  )
}

export default TourCard;