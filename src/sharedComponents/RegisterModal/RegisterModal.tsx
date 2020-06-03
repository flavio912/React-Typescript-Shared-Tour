import React, { useState, useEffect } from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import bsCustomFileInput from 'bs-custom-file-input';

type Props = {
  isShow: boolean,
  hideModal: Function,
  userType: string,
}

const RegisterModal = ({isShow, hideModal, userType}: Props) => {

  useEffect(() => {
    bsCustomFileInput.init();
  }, []);

  return (
    <Modal
      show={isShow}
      onHide={hideModal}
      centered
      className="register-modal"
    >
      <Modal.Header className="flex-column">
        <h1>Welcome to your Virtual Guide</h1>
        <h2>A shared virtual experience</h2>
      </Modal.Header>
      <Modal.Body>
        <h1>Register as a <span className="user-type">{userType}</span></h1>
        <Form>
          <Form.Group controlId="registerForm.fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" placeholder="Aaron Smith" />
          </Form.Group>
          <Form.Group controlId="registerForm.country">
            <Form.Label>Country</Form.Label>
            <Form.Control type="text" placeholder="United Kingdom" />
          </Form.Group>
          <Form.Group controlId="registerForm.email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Aaron.Smith@email.com" />
          </Form.Group>
          <Form.Group controlId="registerForm.phone">
            <Form.Label>Mobile Phone</Form.Label>
            <Form.Control type="text" placeholder="+44 (0)7985 630956" />
          </Form.Group>
          <Form.Group controlId="registerForm.password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group>
            <div className="custom-file">
              <input type="file" className="custom-file-input" />
              <label className="custom-file-label">Upload image</label>
            </div>
          </Form.Group>
          <Button onClick={() => hideModal()}>
            Register
          </Button>          
          <div className="signin-btn d-flex justify-content-center align-items-center">
            <a onClick={() => hideModal()}>Sign In</a>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default RegisterModal;