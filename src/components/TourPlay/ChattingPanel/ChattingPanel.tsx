import React from "react";
import { Button } from "react-bootstrap";
import PhotoSvg from '../../../assets/images/photo.svg';
import MicSvg from '../../../assets/images/mic.svg';
import VolumnOn from '../../../assets/images/volumn-on.svg';
const ChattingPanel = () => {
  return (
    <div className="left-panel">
      <div className="img-div"></div>
      <div className="control-div">        
        <div className="d-flex flex-column">
          <h5 className="name mb-0">Tim Vicker</h5>          
          <p className="mb-0">Sales Broker</p>                  
          <p className="mb-0">Location: Monaco</p>
          <p className="mb-0">Speaks: English</p>  
        </div>                  
        <div className="d-flex flex-column justify-content-between">
          <img className="ml-auto" src={VolumnOn} onClick={() => {console.log("Click Volumn")}}/>
          <img className="ml-auto" src={MicSvg} onClick={() => {console.log("Click Mic")}}/>
          <img className="ml-auto" src={PhotoSvg} onClick={() => {console.log("Click Camera")}}/>
        </div>
      </div>
      <div className="chatting-info">
        <div className="chatting-history">
          <div className="chating-text-box mb-2">
            <h5>Tim Vickers</h5>
            <p className="mb-2">
              Ad aut consequatur blanditiis iure molestiae consequuntur
              consequatur cum. Velit non sed voluptas in ut incidunt impedit.
              Incidunt reiciendis fugiat iste occaecati hic dicta quia.
              Consequuntur dicta autem molestiae quis id illum.
            </p>
          </div>
          <div className="chating-text-box mb-2">
            <h5>You</h5>
            <p className="mb-2">
              Ad aut consequatur blanditiis iure molestiae consequuntur
              consequatur cum. Velit non sed voluptas in ut incidunt impedit.
              Incidunt reiciendis fugiat iste occaecati hic dicta quia.
              Consequuntur dicta autem molestiae quis id illum.
            </p>
          </div>
          <div className="chating-text-box mb-2">
            <h5>You</h5>
            <p className="mb-2">
              Ad aut consequatur blanditiis iure molestiae consequuntur
              consequatur cum. Velit non sed voluptas in ut incidunt impedit.
              Incidunt reiciendis fugiat iste occaecati hic dicta quia.
              Consequuntur dicta autem molestiae quis id illum.
            </p>
          </div>
        </div>
        <textarea className="last-chat mt-1" placeholder="Type a message"></textarea>
      </div>
      <div className="btn-container">
        <Button className="btn-send btn-bugress-primary">Send</Button>
      </div>
    </div>
  );
};

export default ChattingPanel;
