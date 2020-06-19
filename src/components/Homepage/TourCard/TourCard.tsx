import React from 'react';
import { useHistory } from "react-router-dom";
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
  const history = useHistory();
  return (
    <div className="tour-card">
      <img src={data.imgUrl} style={{width: '100%'}} onClick={() => {history.push(`/tour/request?url=https://burgess.theatro360.com/tour/${data.token}`)}} />
      <h1>{data.name}</h1>
      <p>{data.type}</p>
      <p>{data.info.length}, {data.info.year}, {data.info.content}</p>
      <a>
        <Link to={`/tour/request?url=https://burgess.theatro360.com/tour/${data.token}`}>
          Take the tour >
        </Link>
      </a>
    </div>
  )
}

export default TourCard;