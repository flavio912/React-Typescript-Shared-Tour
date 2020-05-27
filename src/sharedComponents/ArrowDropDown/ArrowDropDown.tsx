import React, {useState} from 'react'
import { Dropdown } from 'react-bootstrap';
import styled from 'styled-components';
import ArrowSVG from '../../assets/images/two-arrow.png';
import CustomRadio from '../CustomRadio';

type Props = {
  margin: string,
  drop?: string,
}

const ArrowDropDown = ({margin, drop="down"}: Props) => {

  const [selectedValue, setValue] = useState('chat on')
  const changeRadios = (valueOne:string) => {
    setValue(valueOne)
  }
  
  return (
  <Dropdown style={{margin: margin}}>
    <DropdownToggle variant="success" id="two-arrow-dropdown">
      <img src={ArrowSVG} style={{width: '34px', height: '26px',}}/>
    </DropdownToggle>

    <DropDownMenu>
      <Title>Options</Title>
      <TourP><img src={ArrowSVG} style={{marginRight:'10px'}} />Tour control: <span style={{fontWeight: 700}}>them</span></TourP>
      <CustomUl>
        <li className="d-flex align-items-center">
          <CustomRadio 
            name="chat-on" 
            value="chat on" 
            label="Chat on" 
            checked={selectedValue === 'chat on'} 
            onChange={(value:string) => {setValue(value)}}
          />
        </li>
        <li className="d-flex align-items-center">
          <CustomRadio 
            name="audio-off" 
            value="audio off" 
            label="Audio off" 
            checked={selectedValue === 'audio off'} 
            onChange={(value:string) => {setValue(value)}}
          />
        </li>
        <li className="d-flex align-items-center">
          <CustomRadio 
            name="save-transcript" 
            value="save transcript" 
            label="Save transcript" 
            checked={selectedValue === 'save transcript'} 
            onChange={(value:string) => {setValue(value)}}
          />
        </li>
      </CustomUl>      
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

const CustomUl = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

export default ArrowDropDown;