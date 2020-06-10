import React from 'react';
import TourCard from '../TourCard';

import * as CONSTANTS from "../../../constants";

const TourList = () => {
  const tourList = CONSTANTS.HOME_TOURS;

  return (
    <div className="tour-list">
      <div className="container py-5">
        <div className="row justify-content-center">
          {
            tourList && tourList.length > 0 && (
              tourList.map((item, nIndex) => {
                return(
                  <div className="col-md-4" key={nIndex}>
                    <TourCard data={item} />
                  </div>
                );
              })  
            )
          }
        </div>
      </div>
    </div>
  )
}

export default TourList;