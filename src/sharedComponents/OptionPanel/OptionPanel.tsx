import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap';
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
        <label className="custom-checkbox">Chat on
          <input type="checkbox" />
          <span className="checkmark"></span>
        </label>
        <label className="custom-checkbox">Audio off
          <input type="checkbox" />
          <span className="checkmark"></span>
        </label>
        <label className="custom-checkbox">Save transcript
          <input type="checkbox" />
          <span className="checkmark"></span>
        </label>        
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

  .custom-checkbox {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /* Hide the browser's default checkbox */
  .custom-checkbox input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    background-color: #eee;
  }

  /* On mouse-over, add a grey background color */
  .custom-checkbox:hover input ~ .checkmark {
    background-color: #ccc;
  }

  /* When the checkbox is checked, add a blue background */
  .custom-checkbox input:checked ~ .checkmark {
    background-color: #00AFD3;
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  .custom-checkbox input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the checkmark/indicator */
  .custom-checkbox .checkmark:after {
    left: 9px;
    top: 5px;
    width: 7px;
    height: 12px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
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