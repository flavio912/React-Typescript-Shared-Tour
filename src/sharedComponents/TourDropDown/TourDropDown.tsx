import React from 'react';
import styled from 'styled-components';
import { Dropdown } from 'react-bootstrap';

const TourDropDown = () => {

  return (
    <Dropdown
      drop={"left"}
    >
      <DropdownToggle variant="success" id="dropdown-basic">
        <Bar /><Bar /><Bar />
      </DropdownToggle>

      <DropdownMenu>
        <h4>Select tour</h4>
        <Dropdown.Item href="#/action-2">ADASTRA</Dropdown.Item>
        <Dropdown.Item href="#/action-3">AQUAMARINA</Dropdown.Item>
        <Dropdown.Item href="#/action-3">ANNA I</Dropdown.Item>
        <Dropdown.Item href="#/action-3">AVANT GARDE 2</Dropdown.Item>
        <Dropdown.Item href="#/action-3">BARBARA</Dropdown.Item>
        <Dropdown.Item href="#/action-3">BASH</Dropdown.Item>
        <Dropdown.Item href="#/action-3">ELYSIAN</Dropdown.Item>
        <Dropdown.Item href="#/action-3">EMINENCE</Dropdown.Item>
        <Dropdown.Item href="#/action-3">FORTUNATE SUN</Dropdown.Item>   
        <Dropdown.Item href="#/action-3">INCEPTION</Dropdown.Item>
        <Dropdown.Item href="#/action-3">MUCHOS MAS</Dropdown.Item>
        <Dropdown.Item href="#/action-3">SECRET</Dropdown.Item>        
        <Dropdown.Item href="#/action-3">TATII</Dropdown.Item>                
      </DropdownMenu>

    </Dropdown>
  )
}

const DropdownToggle = styled(Dropdown.Toggle)`
  background: transparent !important;
  border: none;
  outline: none;
  box-shadow: none !important;
  &:hover {
    background
  }
  &:before {
    display: none !important;
  }
  padding-top: 0;
`
const Bar = styled.div`
  width: 26px;
  height: 2px;
  background: #37BBC8;
  margin-bottom: 8px;
  &:last-child {
    margin-bottom: 0
  }  
`
const DropdownMenu = styled(Dropdown.Menu)`
  border: none;
  padding: 27px 38px 10px;
  position: relative;
  border-top-right-radius: 0;
  
  &:before {
    content: " ";
    position: absolute;
    width: 0;
    height: 0;
    border-top: 0;
    border-bottom: 15px solid transparent;
    border-left: 10px solid white;
    top: 0;
    right: -10px;
  }

  .dropdown-item {
    padding-left: 0;
    padding-right: 0;
    &: hover {
      color: #37BBC8;
    }
  }
`


export default TourDropDown;