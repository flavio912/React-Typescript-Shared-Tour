import React, {useState} from 'react'
import { Modal, Button } from 'react-bootstrap';
import styled from 'styled-components';
import ArrowSVG from '../../assets/images/arrow.svg';
import CustomRadio from '../CustomRadio';

type Props = {
  isShow: boolean,
  hideModal: Function,
}

const OptionModal = ({isShow, hideModal}: Props) => {

  const [selectedValue, setValue] = useState('chat on')
  const changeRadios = (valueOne:string) => {
    setValue(valueOne)
  }
  
  return (
    <CustomModal
      show={isShow}
      onHide={hideModal}
      centered
    >
      <Modal.Body>
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

      <SubmitButton variant="outline-primary">Submit</SubmitButton>
      </Modal.Body>
  </CustomModal>
  )
}

const CustomModal = styled(Modal)`
  display: block !important;
  max-width: 276px;
  border: none;  
  left: calc(50% - 138px) !important;
  
  .modal-body {
    padding: 25px;
  }
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