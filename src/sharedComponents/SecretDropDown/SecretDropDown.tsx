import React from "react";
import { Accordion, Button } from "react-bootstrap";
import styled from 'styled-components';

const SecretDropDown = () => {

  return (
    <Container>
      <div className="d-flex justify-content-between title">
        SECRET
        <svg version="1.1" x="0px" y="0px" viewBox="0 0 407.437 407.437">
          <polygon points="386.258,91.567 203.718,273.512 21.179,91.567 0,112.815 203.718,315.87 407.437,112.815 " fill="#37BBC8"/>
        </svg>
      </div>      
      <Accordion defaultActiveKey="0">
        <Accordion.Toggle as={Button} variant="link" eventKey="0">
          SUN DECK
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <ul>
            <li>SDK - Aft Deck Seating</li>
            <li>SDK - Aft Deck Stern</li>
            <li>SDK - Deck Stairs [stbd]</li>
            <li>SDK - Fore Deck Jacuzzi</li>
            <li>SDK - Mid Deck</li>
          </ul>
        </Accordion.Collapse>
        <Accordion.Toggle as={Button} variant="link" eventKey="1">
          BRIDGE DECK
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <ul>
            <li>SDK - Aft Deck Seating</li>
            <li>SDK - Aft Deck Stern</li>
            <li>SDK - Deck Stairs [stbd]</li>
            <li>SDK - Fore Deck Jacuzzi</li>
            <li>SDK - Mid Deck</li>
          </ul>
        </Accordion.Collapse>
        <Accordion.Toggle as={Button} variant="link" eventKey="2">
          UPPER DECK
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="2">
          <ul>
            <li>SDK - Aft Deck Seating</li>
            <li>SDK - Aft Deck Stern</li>
            <li>SDK - Deck Stairs [stbd]</li>
            <li>SDK - Fore Deck Jacuzzi</li>
            <li>SDK - Mid Deck</li>
          </ul>
        </Accordion.Collapse>
        <Accordion.Toggle as={Button} variant="link" eventKey="3">
          MAIN DECK
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="3">
          <ul>
            <li>SDK - Aft Deck Seating</li>
            <li>SDK - Aft Deck Stern</li>
            <li>SDK - Deck Stairs [stbd]</li>
            <li>SDK - Fore Deck Jacuzzi</li>
            <li>SDK - Mid Deck</li>
          </ul>
        </Accordion.Collapse>
        <Accordion.Toggle as={Button} variant="link" eventKey="4">
          LOWER DECK
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="4">
          <ul>
            <li>SDK - Aft Deck Seating</li>
            <li>SDK - Aft Deck Stern</li>
            <li>SDK - Deck Stairs [stbd]</li>
            <li>SDK - Fore Deck Jacuzzi</li>
            <li>SDK - Mid Deck</li>
          </ul>
        </Accordion.Collapse>
      </Accordion>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  .title {
    width: 18px;
    cursor: pointer;
  }
`
export default SecretDropDown;
