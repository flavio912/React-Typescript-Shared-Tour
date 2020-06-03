import React from "react";
import { Accordion, Card } from "react-bootstrap";
import styled from 'styled-components';

type Props = {
  curMenu: string,
  updateMenu: Function,
}

const SecretDropDown = ({curMenu, updateMenu}: Props) => {
  return (
    <Container>
      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            HASNA
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <ul>
                <li onClick={() => updateMenu('TOP DECK')}>TOP DECK</li>
                <li onClick={() => updateMenu('TOP - Deck Fwd')}>TDK - Deck Fwd</li>
                <li onClick={() => updateMenu('SUN DECK')}>SUN DECK</li>
                <li onClick={() => updateMenu('BRIDGE DECK')}>BRIDGE DECK</li>
                <li onClick={() => updateMenu('MAIN DECK')}>MAIN DECK</li>
                <li onClick={() => updateMenu('LOWER DECK')}>LOWER DECK</li>
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
    opacity: 0.8;
  }

  .card {
    background: transparent !important;

    .card-header {
      padding: 1rem;
      font-size: 1rem;
      
      ::after {
        content: '';
        position: absolute;
        right: 15px;
        top: 18px;
        border: solid #00AFD3;
        border-width: 0 2px 2px 0;
        display: inline-block;
        padding: 6px;
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
      }
    }

    .card-body {
      background-color: rgba(255,255,255,0.1);
      padding: 0;

      ul {
        list-style: none;
        margin: 0;
        font-size: 0.8rem;
        padding: 0;

        li {
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          padding: 0.3rem 1rem;
          cursor: pointer;
        }
      }
    }
  }
`
export default SecretDropDown;
