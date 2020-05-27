import React from 'react';
import styled from 'styled-components';
import { Dropdown } from 'react-bootstrap';

const TourDropDown = () => {

  return (
    <Dropdown
      drop={"left"}
    >
      <DropdownToggle variant="success" id="dropdown-basic" className="p-0">
        <Bar /><Bar /><Bar />
      </DropdownToggle>

      <DropdownMenu>
        <Title className="mb-3">Select tour</Title>
        <DropdownItem>ADASTRA</DropdownItem>
        <DropdownItem>AQUAMARINA</DropdownItem>
        <DropdownItem>ANNA I</DropdownItem>
        <DropdownItem>AVANT GARDE 2</DropdownItem>
        <DropdownItem>BARBARA</DropdownItem>
        <DropdownItem>BASH</DropdownItem>
        <DropdownItem>ELYSIAN</DropdownItem>
        <DropdownItem>EMINENCE</DropdownItem>
        <DropdownItem>FORTUNATE SUN</DropdownItem>   
        <DropdownItem>INCEPTION</DropdownItem>
        <DropdownItem>MUCHOS MAS</DropdownItem>
        <DropdownItem>SECRET</DropdownItem>        
        <DropdownItem>TATII</DropdownItem>                
      </DropdownMenu>

    </Dropdown>
  )
}
const Title = styled.h4`  
  line-height: 42px;
  font-size: 29px;
  font-weight: 400;  
  margin-bottom: 26px;
`
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
  margin-bottom: 6px;
  &:last-child {
    margin-bottom: 0
  }  
`
const DropdownMenu = styled(Dropdown.Menu)`
  border: none;
  padding: 27px 0 10px 38px;
  position: relative;
  border-top-right-radius: 0;
  padding-bottom: 1em;
  right: 15px !important;
  width: 295px;

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
    background-color: transaprent !important;
    &: hover {
      color: #37BBC8;      
    }
  }
`

const DropdownItem = styled(Dropdown.Item)`
  font-size: 20px;
  padding: 0;
  line-height: 26px;
  margin-bottom: 12px;

  &:active {
    background: none;
  }
`;

export default TourDropDown;