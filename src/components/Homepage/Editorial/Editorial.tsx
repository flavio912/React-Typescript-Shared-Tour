import React from 'react';
// import EditorialPanel from '../EditorialPanel';
import CardImg from './../../../assets/images/SECRET.svg';

const Editorial = () => {
  return (
    <div className="editorial">
      <div className="container d-flex justify-content-center">
        <div className="col-md-10">
          <h1 className="title">Editorial</h1>
          <div className="pt-3 row">
            <div className="top col-md-6">
              <div className="editorial-panel col-md-12 p-5">
                <img src={CardImg} />
                <div className="panel-info d-flex flex-column justify-content-center align-items-center">
                  <button className="mt-5">News</button>
                  <h1>SPORTADVENTURE 45 is for sale</h1>
                  <p>Burgess is excited to bring to the sales market the 45m Italian designed and built SPORTADVENTURE 45, with an asking price of EUR 18,000,000</p>
                  <a>Read article ></a>
                </div>
              </div>
            </div>
            <div className="bottom col-md-6">
              <div className="editorial-panel col-md-12 p-5 d-flex flex-column justify-content-between align-items-center">
                <div className="panel-info d-flex flex-column align-items-center">
                  <button>News</button>
                  <h1>Five years in Asia!</h1>
                  <p>Burgess's Asia team is celebrating its first five years and 12 superyacht transactions</p>
                  <a>Read article ></a>
                </div>
                <img src={CardImg} />
              </div>
            </div>
            <div className="left col-md-12">
              <div className="editorial-panel row m-0 col-md-12 p-5">
                <div className="col-md-6">
                  <img src={CardImg} />
                </div>
                <div className="panel-info col-md-6 d-flex flex-column align-items-center">
                  <button>Yachts</button>
                  <h1>LUMINOSITY - a broker's view.</h1>
                  <p>Lead broker Dominic Millman talks to Burgess about LUMINOSITY. the latest addition to our Central Agency sales fleet</p>
                  <a>Read article ></a>
                </div>
              </div>              
            </div>
          </div>
          <div className="pt-5 d-flex flex-column align-items-center">
            <button className="more-btn py-1 px-4">More Editorial</button>
          </div>
        </div>
      </div>      
    </div>
  )
}

export default Editorial;