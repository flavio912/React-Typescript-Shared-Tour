import React, { useState, FormEvent } from 'react';
import {Modal, Button, Form, Alert} from 'react-bootstrap';
import UserAvatarSvg from '../../assets/images/man-1.svg';
import validator from 'validator';
import RequestHelper from '../../utils/Request.Utils';

type Props = {
  isShow: boolean,
  hideModal: Function,
}

const SigninModal = ({isShow, hideModal}: Props) => {
  const [formData, setFormData] = useState({
    email: {value: '', validate: true, errorMsg: ''},
    password: {value: '', validate: true, errorMsg: ''},
  });
  const [returnError, setReturnError] = useState({
    isShow: false,
    msg: ''
  });

  const checkEmailValidate = () => {
    if (formData.email.value.length === 0) {
      setFormData({
        ...formData,
        email: {
          value: formData.email.value,
          validate: false,
          errorMsg: 'Email is required!',
        },
      });
      return false;
    }
    if (validator.isEmail(formData.email.value)) {
      setFormData({
        ...formData,
        email: {
          value: formData.email.value,
          validate: true,
          errorMsg: '',
        },
      });
      return true;
    }
    setFormData({
      ...formData,
      email: {
        value: formData.email.value,
        validate: false,
        errorMsg: 'Not a valid email address!',
      },
    });
    return false;
  };

  const checkPasswordValidate = () => {
    setFormData({
      ...formData,
      password: {
        value: formData.password.value,
        validate: formData.password.value.length !== 0,
        errorMsg:
          formData.password.value.length === 0 ? 'Password required!' : '',
      },
    });
    return formData.password.value.length !== 0;
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (
      checkEmailValidate() && 
      checkPasswordValidate()
    ) {
      RequestHelper
        .post('/users/login', {
          email: formData.email.value,
          password: formData.password.value        
        })
        .then((res) => {
          if(!res.data.success) {
            setReturnError({
              isShow: true,
              msg: res.data.error
            });
          }else {          
            hideModal();
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }

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
        <Form onSubmit={onSubmit} className="d-flex flex-column justify-content-center">
          <img src={UserAvatarSvg} />
          <Form.Group controlId="signinForm.email" className="mt-3 mb-0">
            <Form.Control 
              type="email" 
              placeholder="Email" 
              value={formData.email.value}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  email: {
                    value: e.target.value,
                    validate: true,
                    errorMsg: '',
                  }
                })
              }}
              isInvalid={!formData.email.validate}
            />
            <Form.Control.Feedback type="invalid">
              {formData.email.errorMsg}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="signinForm.password" className="mt-3">
            <Form.Control 
              type="password" 
              placeholder="Password" 
              value={formData.password.value}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  password: {
                    value: e.target.value,
                    validate: true,
                    errorMsg: '',
                  }
                })
              }}
              isInvalid={!formData.password.validate}
            />
            <Form.Control.Feedback type="invalid">
              {formData.password.errorMsg}
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit">
            Sign In
          </Button>
          <a>Forgot password?</a>
          <div className="signin-btn d-flex justify-content-center align-items-center mt-3">
            <a onClick={() => hideModal('register')}>Register</a>
          </div>
        </Form>
      </Modal.Body>

      { returnError.isShow ?
        <Alert variant="danger" dismissible><p>{returnError.msg}</p></Alert> : null}
    </Modal>
  )
}

export default SigninModal;