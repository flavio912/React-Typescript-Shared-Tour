import React from "react";
import { Button, Accordion, Card } from "react-bootstrap";

const MainPanel = () => {
  return (
    <div className="right-panel">
      <div className="d-flex justify-content-between">
        <h1 className="title">SECRET</h1>
        <div className="btn-group dropleft bug-dropdown">
          <div className="hamberge-icon" data-toggle="dropdown"></div>
          <div className="dropdown-menu">
            <h4>Select tour</h4>
            <ul>
              <li>ADASTRA</li>
              <li>ADASTRA</li>
              <li>AQUAMARINA</li>
              <li>ANNA I</li>
              <li>AVANT GARDE 2</li>
              <li>BARBARA</li>
              <li>BASH</li>
              <li>ELYSIAN</li>
              <li>EMINENCE</li>
              <li>FORTUNATE SUN</li>
              <li>INCEPTION</li>
              <li>MUCHOS MAS</li>
              <li>SECRET</li>
              <li>TATII</li>
            </ul>
          </div>
        </div>
      </div>
      <h3 className="description">82.5m (270.6ft)</h3>
      <h3 className="description">
        2013 (refitted 2018), Abeking & Rasmussen, Germany
      </h3>
      <div className="tap-start-div">
        <Accordion defaultActiveKey="0">
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            SUN DECK
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <div>
              <div>SDK - Aft Deck Seating</div>
              <div>SDK - Aft Deck Stern</div>
              <div>SDK - Deck Stairs [stbd]</div>
              <div>SDK - Fore Deck Jacuzzi</div>
              <div>SDK - Mid Deck</div> 
            </div>
          </Accordion.Collapse>
        </Accordion>

        <h2>
          Tap <span style={{ fontWeight: 600 }}>‘Start’</span> to link up with
          your
          <br /> BURGESS sales broker
        </h2>
      </div>
      <div className="btn-container">
        <Button
          variant="outline-primary"
          className="btn-start btn-bugress-outline"
        >
          Start
        </Button>
      </div>
    </div>
  );
};

export default MainPanel;
