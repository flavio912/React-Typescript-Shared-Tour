import React from 'react';
import { Link } from "react-router-dom";

type Props = {
  data: {
    name: string,
    type: string,
    info: {
      length: string,
      year: number,
      content: string
    },
    token: string,
    imgUrl: string
  }
}

const TourCard = ({data}: Props) => {
  return (
    <div className="tour-card">
      <img src={data.imgUrl} style={{width: '100%'}} />
      <h1>{data.name}</h1>
      <p>{data.type}</p>
      <p>{data.info.length}, {data.info.year}, {data.info.content}</p>
      <a>
        <Link to={`/tour/view/${data.token}`}>
          Take the tour >
        </Link>
      </a>
    </div>
  )
}

export default TourCard;