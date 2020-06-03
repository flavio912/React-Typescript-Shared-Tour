import React from 'react';
import { Modal } from 'react-bootstrap';

type Props = {
  isShow: boolean,
  hideModal: Function,
}

const ThankyouModal = ({isShow, hideModal}: Props) => {
  return (
    <Modal
      show={isShow}
      onHide={hideModal}
      centered
      className="thankyou-modal"
    >
      <Modal.Body>
        <h1>Thank you!</h1>
        <p>your registration has been sent and you will receive an email when it's been approved</p>
      </Modal.Body>
    </Modal>
  )
}

export default ThankyouModal;