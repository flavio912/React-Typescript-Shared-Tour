import React, {useState} from 'react'
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import ArrowSVG from '../../assets/images/arrow.svg';
import CustomRadio from '../CustomRadio';

type Props = {
  isShow: boolean,
  hidePanel: Function,
  customStyle: object
}

const OptionModal = ({isShow, hidePanel, customStyle}: Props) => {

  const [selectedValue, setValue] = useState('chat on')
  const changeRadios = (valueOne:string) => {
    setValue(valueOne)
  }
  
  return (
    <CustomPanel style={customStyle}>
      <Title>Options</Title>
      <TourP><img src={ArrowSVG} style={{marginRight:'10px', width: '40px'}} />Tour control: <span style={{fontWeight: 700, marginLeft: '0.5rem'}}>them</span></TourP>
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

      <SubmitButton variant="outline-primary" onClick={() => {hidePanel(true)}}>Submit</SubmitButton>
  </CustomPanel>
  )
}

const CustomPanel = styled.div`
  height: 100%;
  background: white;
  z-index: 30;
  width: 250px;
  padding: 1.5rem;
  border-left: 1px solid #00AFD3;
`

const Title = styled.h4`
  
`
const TourP = styled.p`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
`

const CustomUl = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const SubmitButton = styled(Button)`
  border: 2px solid #00AFD3;
  border-radius: 11px;
  color: #00AFD3;
  width: 100%;
  margin-top: 40px;
  font-weight: 700;
  &:hover, &:focus, &:active {
    color: white !important;
    background: #00AFD3 !important;
    border-color: #00AFD3 !important;
  }
`

export default OptionModal;