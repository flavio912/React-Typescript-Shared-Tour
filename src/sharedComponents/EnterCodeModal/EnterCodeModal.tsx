import React from 'react';
import {Modal, Button, Form} from 'react-bootstrap';

type Props = {
  isShow: boolean,
  hideModal: Function,
}

const EnterCodeModal = ({isShow, hideModal}: Props) => {
  return (
    <Modal
      show={isShow}
      onHide={hideModal}
      centered
      className="enter-code-modal"
    >
      <Modal.Header className="flex-column">
        <h1>Welcome to your Virtual Guide</h1>
        <h2>A shared virtual experience</h2>
      </Modal.Header>
      <Modal.Body>
        <h1>Enter Code</h1>
        <Form className="d-flex flex-column justify-content-center">
          <Form.Group controlId="enterCodeForm.code" className="mt-3">
            <Form.Control type="text" className="code-number" />
            <Form.Control type="text" className="code-number" />
            <Form.Control type="text" className="code-number" />
            <Form.Control type="text" className="code-number" />
          </Form.Group>
          <p>A code has been sent to your registered devices. <br/> Please enter it above.</p>
          <Button onClick={() => hideModal('next')}>
            Enter
          </Button>
          <a>Resend code</a>
          <div className="cancel-btn d-flex justify-content-center align-items-center mt-3">
            <a>Cancel</a>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default EnterCodeModal;