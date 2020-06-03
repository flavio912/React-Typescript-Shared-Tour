import React from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import styled from 'styled-components';
import UserAvatarSvg from '../../assets/images/man-1.svg';

type Props = {
  isShow: boolean,
  hideModal: Function,
}

const SigninModal = ({isShow, hideModal}: Props) => {
  return (
    <Modal
      show={isShow}
      onHide={hideModal}
      centered
      className="signin-modal"
    >
      <Modal.Header className="flex-column">
        <h1>Welcome to your Virtual Guide</h1>
        <h2>A shared virtual experience</h2>
      </Modal.Header>
      <Modal.Body>
        <h1>Sign In</h1>
        <Form className="d-flex flex-column justify-content-center">
          <img src={UserAvatarSvg} />
          <Form.Group controlId="signinForm.email" className="mt-3 mb-0">
            <Form.Control type="email" placeholder="Email" />
          </Form.Group>
          <Form.Group controlId="signinForm.password" className="mt-3">
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button onClick={() => hideModal()}>
            Sign In
          </Button>
          <a>Forgot password?</a>
          <div className="signin-btn d-flex justify-content-center align-items-center mt-3">
            <a onClick={() => hideModal('register')}>Register</a>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default SigninModal;