import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import styled from 'styled-components';
import ArrowSvg from '../../assets/images/arrow.svg';

type Props = {
  isShow: boolean,
  hideModal: Function,
}

const TransferModal = ({isShow, hideModal}: Props) => {
  return (
    <CustomModal
      show={isShow}
      onHide={hideModal}
      centered
    >
      <Modal.Body>
        <Title>Transfer Control?</Title>
        <ControlDiv>
          <ButtonRed variant="outline-primary">No</ButtonRed>
          <img src={ArrowSvg} style={{ width: '59px', height: '47px', marginLeft: '32px', marginRight: '32px'}}/>
          <ButtonBlue variant="outline-primary">Ok</ButtonBlue>
        </ControlDiv>
        <Description>
          Do wish to transfer control of the <br /><br />tour? Please tap the <span>Ok</span> to transfer <br /><br />
          to the other user.
        </Description>
      </Modal.Body>
    </CustomModal>
  )
}

const CustomModal = styled(Modal)`
  width: 417px;
  border-radius: 12px;  
  left: calc(50% - 208px) !important;
  .modal-body {
    padding: 23px 66px;
  }
`

const Title = styled.h4`
  line-height: 42px;
  color: #2E2D2C;
  font-size: 29px;
`
const ControlDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
`

const ButtonRed = styled(Button)`
  width: 82px;
  height: 44px;
  border-radius: 11px;
  color: #FF0050;
  border: 2px solid #FF0050;
  font-weight: 700;
  font-size: 20px;
  background-color: transparent;  
  display: flex;
  align-itmes: center;
  justify-content: center;
  padding: 0;
  &:hover, &:active, &:focus {
    background-color: #FF0050 !important;
    border-color: #FF0050 !important;
    color: white !important;
  }
`

const ButtonBlue = styled(Button)`
  width: 82px;
  height: 44px;
  border-radius: 11px;
  color: #37BBC8;
  border: 2px solid #37BBC8;
  font-weight: 700;
  font-size: 20px;
  background-color: transparent;    
  display: flex;
  align-itmes: center;
  justify-content: center;
  padding: 0;
  &:hover, &:active, &:focus {
    background-color: #37BBC8 !important;
    border-color: #37BBC8 !important;
    color: white !important;
  }
`

const Description = styled.p`
  margin-top: 19px;
  font-size: 16px;
  line-height: 18px;
  span {
    font-weight: 700;
  }
`
export default TransferModal;