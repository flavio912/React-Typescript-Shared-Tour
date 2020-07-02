import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import ReactCodeInput from 'react-code-input';

import { enterCodeDialogAction } from '../../store/dialog/actions';
import { DialogNames } from '../../store/dialog/types';

const props = {
  inputStyle: {
    // fontFamily: 'monospace',
    MozAppearance: 'textfield',
    width: '20%',
    borderRadius: '0',
    fontSize: '1.5rem',
  },
}

type Props = {
  returnCode: Function
}

const EnterCodeModal = ({returnCode}: Props) => {
  const dispatch = useDispatch();
  const { dialog } = useSelector((state: any) => ({
    dialog: state.dialog
  }))
  const [code, setCode]= useState("");

  return (
    <Modal
      show={dialog.isOpened && dialog.name === DialogNames.ENTER_CODE_DIALOG}
      onHide={() => {dispatch(enterCodeDialogAction(false))}}
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
            <ReactCodeInput {...props} value={code} onChange={(e) => setCode(e)} />            
          </Form.Group>
          <p>A code has been sent to your mailbox when you request this tour session. Please enter it above.</p>
          <Button onClick={() => returnCode(code)}>
            Enter
          </Button>
          {/* <a>Resend code</a> */}
          <div className="cancel-btn d-flex justify-content-center align-items-center mt-3">
            <a onClick={() => {dispatch(enterCodeDialogAction(false))}}>Cancel</a>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default EnterCodeModal;