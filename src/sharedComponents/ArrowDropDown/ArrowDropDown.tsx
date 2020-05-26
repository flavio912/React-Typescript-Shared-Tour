import React from 'react'
import { Dropdown } from 'react-bootstrap';
import styled from 'styled-components';
import ArrowSVG from '../../assets/images/two-arrow.png';

type Props = {
  margin: string,
  drop?: string,
}

const ArrowDropDown = ({margin, drop="down"}: Props) => {
  return (
  <Dropdown style={{margin: margin}}>
    <DropdownToggle variant="success" id="two-arrow-dropdown">
      <img src={ArrowSVG} style={{width: '34px', height: '26px',}}/>
    </DropdownToggle>

    <DropDownMenu>
      <Title>Options</Title>
      <TourP><img src={ArrowSVG} style={{marginRight:'10px'}} />Tour control: <span style={{fontWeight: 700}}>them</span></TourP>
      <Dropdown.Item>Action</Dropdown.Item>
      <Dropdown.Item>Another action</Dropdown.Item>
      <Dropdown.Item>Something else</Dropdown.Item>
    </DropDownMenu>
  </Dropdown>
  )
}

const DropdownToggle = styled(Dropdown.Toggle)`
  background: transparent !important;
  border: 0 !important;
  outline: none !important;
  box-shadow: none !important;
  padding: 0;
  &:after {
    display: none;
  }
`

const DropDownMenu = styled(Dropdown.Menu)`
  top: 10px !important;
  width: 276px;
  border: none;
  padding: 25px;
`

const Title = styled.h4`
  font-size: 29px;
  height: 42px;
`
const TourP = styled.p`
  font-size: 16px;
  display: flex;
  align-items: center;
  margin-bottom: 40px;
`

export default ArrowDropDown;