import React from "react";
import { Accordion, Card } from "react-bootstrap";
import styled from 'styled-components';

const SecretDropDown = () => {

  return (
    <Container>
      <h3>SECRET</h3>
      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            SUN DECK
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <ul>
                <li>SDK - Aft Deck Seating</li>
                <li>SDK - Aft Deck Stern</li>
                <li>SDK - Deck Stairs [stbd]</li>
                <li>SDK - Fore Deck Jacuzzi</li>
                <li>SDK - Mid Deck</li>
              </ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            BRIDGE DECK
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <ul>
                <li>SDK - Aft Deck Seating</li>
                <li>SDK - Aft Deck Stern</li>
              </ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="2">
            UPPER DECK
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              <ul>
                <li>SDK - Deck Stairs [stbd]</li>
                <li>SDK - Fore Deck Jacuzzi</li>
                <li>SDK - Mid Deck</li>
              </ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="3">
            MAIN DECK
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="3">
            <Card.Body>
              <ul>
                <li>SDK - Aft Deck Seating</li>
              </ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="4">
            LOWER DECK
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="4">
            <Card.Body>
              <ul>
                <li>SDK - Mid Deck</li>
              </ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 240px;

  ::before {
    content: '';
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background-color: #000;
    opacity: 0.3;
  }

  h3 {
    font-size: 1.3rem !important;
    z-index: 1;
    padding: 0.5rem 1rem;
    margin: 0;

    ::after {
      content: '';
      position: absolute;
      right: 15px;
      top: 10px;
      border: solid #00AFD3;
      border-width: 0 2px 2px 0;
      display: inline-block;
      padding: 6px;
      transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
    }
  }

  .card {
    background: transparent !important;

    .card-header {
      padding: 0.3rem 1rem;
      font-size: 0.8rem;
      border-top: 1px solid #707070;
    }

    .card-body {
      background-color: rgba(255,255,255,0.5);
      padding: 0 1rem;

      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        font-size: 0.8rem;

        li {
          padding: 0.3rem 0;
        }
      }
    }
  }
`
export default SecretDropDown;
