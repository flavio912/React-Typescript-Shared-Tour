import React from 'react';
import TourCard from '../TourCard';

import * as CONSTANTS from "../../../constants";

const TourList = () => {
  const tourList = CONSTANTS.HOME_TOURS;

  return (
    <div className="tour-list">
      <div className="container py-5">
        <div className="row justify-content-center">
          {tourList.map((item) => {
            return(
              <div className="col-md-4">
                <TourCard data={item} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default TourList;